import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointments } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  console.log(appointmentId);
  const appointment = await getAppointments(appointmentId);
  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            あなたの<span className="text-green-500">予約リクエスト</span>は
            正常に送信されました！
          </h2>
          <p>確認のため、すぐにご連絡いたします。</p>
        </section>

        <section className="request-details">
          <p>予約リクエストの詳細</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              height={100}
              width={100}
              alt="doctor"
              className="size-6"
            />
            <p className="whitespace-nowrap">{doctor?.name}</p>
          </div>

          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            新しい予約を作成
          </Link>
        </Button>
        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default Success;
