"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "../CustomFormField";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

// PatientFormコンポーネントの定義
const PatientForm = () => {
  // 1. フォームを定義
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. 送信ハンドラーを定義
  function onSubmit(values: z.infer<typeof formSchema>) {
    // フォームの値を使用
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">こんにちは 👋</h1>
          <p className="text-dark-700">予約を始めましょう。</p>
        </section>
        <CustomFormField control={form.control} />
      </form>
    </Form>
  );
};

export default PatientForm;
