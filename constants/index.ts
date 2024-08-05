export const GenderOptions = [
  { label: "男性", value: "male" },
  { label: "女性", value: "gemale" },
  { label: "その他", value: "other" },
];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "出生証明書",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "出生証明書",
  "運転免許証",
  "健康保険証/保険証書",
  "軍人身分証明書",
  "国民身分証明書",
  "パスポート",
  "外国人登録証（グリーンカード）",
  "社会保障番号",
  "州発行の身分証明書",
  "学生証",
  "投票者登録証",
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "ジョン・グリーン",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "レイラ・キャメロン",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "デイビッド・リビングストン",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "エヴァン・ピーター",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "ジェーン・パウエル",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "アレックス・ラミレス",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "ジャスミン・リー",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "アリアナ・クルーズ",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "ハーディク・シャルマ",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
