"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../appwrite.config";
import { parseStringify, formatDateTime } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

/**
 * 新しいアポイントメントを作成する非同期関数
 *
 * @param {CreateAppointmentParams} appointment - 作成するアポイントメントの詳細
 * @returns {Promise<any>} - 作成されたアポイントメントのデータ
 * @throws {Error} - アポイントメントの作成中にエラーが発生した場合
 */
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

/**
 * 指定されたアポイントメントIDに基づいてアポイントメントを取得する非同期関数
 *
 * @param {string} appointmentId - 取得するアポイントメントのID
 * @returns {Promise<any>} - 取得したアポイントメントのデータ
 * @throws {Error} - アポイントメントの取得中にエラーが発生した場合
 */
export const getAppointments = async (appointmentId: string) => {
  try {
    const appointments = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointments);
  } catch (error) {
    console.log(error);
  }
};

/**
 * 最近のアポイントメントを取得する非同期関数
 *
 * @returns {Promise<any>} - 取得したアポイントメントのデータとカウント
 * @throws {Error} - アポイントメントの取得中にエラーが発生した場合
 */
export const getRecentAppointments = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCount = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount += 1;
        }
        return acc;
      },
      initialCount
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};

/**
 * アポイントメントの更新を行う非同期関数。
 *
 * @param {UpdateAppointmentParams} appointmentId - アポイントメントID
 * @param {UpdateAppointmentParams} userId - ユーザーID
 * @param {UpdateAppointmentParams} appointment - アポイントメントの更新内容
 * @param {UpdateAppointmentParams} type - アポイントメントのタイプ（scheduleまたはcancel）
 * @return {Promise<any>} 更新されたアポイントメントのデータ
 */
export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updateAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updateAppointment) {
      throw new Error("Failed to update appointment");
    }

    const smsMessage = `CarePulseからのご挨拶です。${
      type === "schedule"
        ? `あなたのアポイントメントは、${
            formatDateTime(appointment.schedule!).dateTime
          }にDr. ${appointment.primaryPhysician}との確認が取れました。`
        : `残念ながら、あなたのアポイントメントは${
            formatDateTime(appointment.schedule!).dateTime
          }にキャンセルされました。理由: ${appointment.cancellationReason}`
    }`;
    await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updateAppointment);
  } catch (error) {
    console.log(error);
  }
};

/**
 * SMS通知を送信する非同期関数
 *
 * @param {string} userId - SMSを受信するユーザーのID
 * @param {string} content - 送信するメッセージの内容
 * @returns {Promise<any>} - 送信されたメッセージのデータ
 * @throws {Error} - SMSの送信中にエラーが発生した場合
 */
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );

    return parseStringify(message);
  } catch (error) {
    console.log(error);
  }
};
