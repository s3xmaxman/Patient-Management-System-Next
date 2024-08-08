import { DataTable } from "@/components/table/DataTable";
import StatCard from "@/components/StatCard";
import columns from "@/components/table/columns";
import { getRecentAppointments } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Admin = async () => {
  const appointments = await getRecentAppointments();
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link className="cursor-pointer" href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">管理者ページ</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">ようこそ 👋</h1>
          <p className="text-dark-700">
            新しいアポイントメントの管理で一日を始めましょう
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="予定されたアポイントメント"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="保留中のアポイントメント"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="キャンセルされたアポイントメント"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin;
