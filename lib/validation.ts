import { z } from "zod";

// ユーザーフォームバリデーション
export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "名前は2文字以上でなければなりません")
    .max(50, "名前は50文字以下でなければなりません"),
  email: z.string().email("無効なメールアドレスです"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "無効な電話番号です"),
});

// 患者フォームバリデーション
export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "名前は2文字以上でなければなりません")
    .max(50, "名前は50文字以下でなければなりません"),
  email: z.string().email("無効なメールアドレスです"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "無効な電話番号です"),
  birthDate: z.coerce.date(),
  gender: z.enum(["male", "female", "other"]), // 男性、女性、その他
  address: z
    .string()
    .min(5, "住所は5文字以上でなければなりません")
    .max(500, "住所は500文字以下でなければなりません"),
  occupation: z
    .string()
    .min(2, "職業は2文字以上でなければなりません")
    .max(500, "職業は500文字以下でなければなりません"),
  emergencyContactName: z
    .string()
    .min(2, "緊急連絡先の名前は2文字以上でなければなりません")
    .max(50, "緊急連絡先の名前は50文字以下でなければなりません"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "無効な電話番号です"
    ),
  primaryPhysician: z.string().min(2, "少なくとも1人の医師を選択してください"),
  insuranceProvider: z
    .string()
    .min(2, "保険会社名は2文字以上でなければなりません")
    .max(50, "保険会社名は50文字以下でなければなりません"),
  insurancePolicyNumber: z
    .string()
    .min(2, "保険証番号は2文字以上でなければなりません")
    .max(50, "保険証番号は50文字以下でなければなりません"),
  allergies: z.string().optional(), // アレルギー（任意）
  currentMedication: z.string().optional(), // 現在服用中の薬（任意）
  familyMedicalHistory: z.string().optional(), // 家族の病歴（任意）
  pastMedicalHistory: z.string().optional(), // 過去の病歴（任意）
  identificationType: z.string().optional(), // 身分証明書の種別（任意）
  identificationNumber: z.string().optional(), // 身分証明書番号（任意）
  identificationDocument: z.custom<File[]>().optional(), // 身分証明書ドキュメント（任意）
  treatmentConsent: z // 治療同意
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "続行するには治療に同意する必要があります",
    }),
  disclosureConsent: z // 情報開示同意
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "続行するには情報開示に同意する必要があります",
    }),
  privacyConsent: z // プライバシー同意
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "続行するにはプライバシーに同意する必要があります",
    }),
});

// 予約作成スキーマ
export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "少なくとも1人の医師を選択してください"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "理由は2文字以上でなければなりません")
    .max(500, "理由は500文字以下でなければなりません"),
  note: z.string().optional(), // メモ（任意）
  cancellationReason: z.string().optional(), // キャンセル理由（任意）
});

// 予約スケジュールスキーマ
export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "少なくとも1人の医師を選択してください"),
  schedule: z.coerce.date(),
  reason: z.string().optional(), // 理由（任意）
  note: z.string().optional(), // メモ（任意）
  cancellationReason: z.string().optional(), // キャンセル理由（任意）
});

// 予約キャンセルスキーマ
export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "少なくとも1人の医師を選択してください"),
  schedule: z.coerce.date(),
  reason: z.string().optional(), // 理由（任意）
  note: z.string().optional(), // メモ（任意）
  cancellationReason: z
    .string()
    .min(2, "理由は2文字以上でなければなりません")
    .max(500, "理由は500文字以下でなければなりません"),
});

// 予約タイプに応じたスキーマを取得する関数
export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
