"use server";
import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

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
