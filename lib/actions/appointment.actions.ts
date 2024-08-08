"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";
import { Smooch_Sans } from "next/font/google";

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

    // TODO: SMS notification

    revalidatePath("/admin");
    return parseStringify(updateAppointment);
  } catch (error) {
    console.log(error);
  }
};
