import { ID } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";

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
      { ...appointment }
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};
