import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * クラス名の配列を結合し、Tailwind CSSのクラスをマージします。
 * @param inputs - 結合するクラス名の配列
 * @returns マージされたクラス名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 任意の値をJSON形式に変換し、再度パースします。
 * @param value - 変換する値
 * @returns パースされた値
 */
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

/**
 * ファイルオブジェクトをURLに変換します。
 * @param file - 変換するファイルオブジェクト
 * @returns 生成されたURL
 */
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

/**
 * 日付文字列をフォーマットし、日付と時間を返します。
 * @param dateString - フォーマットする日付文字列またはDateオブジェクト
 * @returns フォーマットされた日付と時間のオブジェクト
 */
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // 曜日の省略名（例：'Mon'）
    month: "short", // 月の省略名（例：'Oct'）
    day: "numeric", // 日（例：'25'）
    year: "numeric", // 年（例：'2023'）
    hour: "numeric", // 時（例：'8'）
    minute: "numeric", // 分（例：'30'）
    hour12: true, // 12時間制（true）または24時間制（false）
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // 曜日の省略名（例：'Mon'）
    year: "numeric", // 年（例：'2023'）
    month: "2-digit", // 月の2桁表示（例：'10'）
    day: "2-digit", // 日の2桁表示（例：'25'）
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // 月の省略名（例：'Oct'）
    year: "numeric", // 年（例：'2023'）
    day: "numeric", // 日（例：'25'）
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // 時（例：'8'）
    minute: "numeric", // 分（例：'30'）
    hour12: true, // 12時間制（true）または24時間制（false）
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

/**
 * パスキーを暗号化します。
 * @param passkey - 暗号化するパスキー
 * @returns 暗号化されたパスキー
 */
export function encryptKey(passkey: string) {
  return btoa(passkey);
}

/**
 * 暗号化されたパスキーを復号化します。
 * @param passkey - 復号化するパスキー
 * @returns 復号化されたパスキー
 */
export function decryptKey(passkey: string) {
  return atob(passkey);
}
