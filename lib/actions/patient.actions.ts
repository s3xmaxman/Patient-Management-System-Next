"use server";
import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

/**
 * ユーザーを作成する非同期関数
 *
 * @param user - ユーザー情報を含むオブジェクト (CreateUserParams)
 * @returns 新しく作成されたユーザーの情報または既存のユーザー情報
 * @throws エラーが発生した場合、詳細なエラーメッセージを出力
 */
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    console.log({ newUser });

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
  }
};

/**
 * 指定されたユーザーIDのユーザー情報を取得する非同期関数
 *
 * @param userId - ユーザーID (string)
 * @returns ユーザー情報 (object) または undefined
 * @throws エラーが発生した場合、エラー内容をコンソールに出力
 */
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

/**
 * 患者の登録を行う非同期関数
 *
 * @param {RegisterUserParams} - 患者の情報を含むオブジェクト
 * @param {Object} param.identificationDocument - 患者の身分証明書に関する情報 (ファイル)
 * @param {Object} param.patient - 患者のその他の情報 (名前、住所など)
 *
 * @returns {Promise<string>} - 登録された患者情報のJSON文字列
 * @throws エラーが発生した場合、詳細なエラーメッセージを出力
 */
export const registerPatient = async ({
  identificationDocument, // 患者の身分証明書に関する情報 (ファイル)
  ...patient // 患者のその他の情報 (名前、住所など)
}: RegisterUserParams) => {
  try {
    let file;

    // 身分証明書が提供されている場合
    if (identificationDocument) {
      // 身分証明書ファイルをInputFileオブジェクトに変換
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob, // blobFile (バイナリデータ) を取得
        identificationDocument?.get("fileName") as string // fileName (ファイル名) を取得
      );

      // ストレージにファイルをアップロード
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // データベースに患者情報を登録
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null, // アップロードされたファイルのID
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}` // ファイルへのアクセスURL
          : null,
        ...patient, // その他の患者情報
      }
    );

    // 登録された患者情報を文字列化して返す (JSON)
    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};
