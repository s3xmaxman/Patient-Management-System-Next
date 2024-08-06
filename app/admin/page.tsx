import StatCard from "@/components/StatCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Admin = () => {
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
            count={5}
            label="予定されたアポイントメント"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="pending"
            count={5}
            label="保留中のアポイントメント"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={5}
            label="キャンセルされたアポイントメント"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
      </main>
    </div>
  );
};

export default Admin;
