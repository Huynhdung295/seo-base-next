"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { submitLead } from "@/actions/lead";
import {
  leadFormSchema,
  type LeadFormValues,
} from "@/lib/validations/lead";

// ─── Component ──────────────────────────────────────────────

/**
 * Lead capture form using react-hook-form + Zod validation.
 * Submits data via Server Action.
 *
 * This is a functional base component — style it to match your design.
 *
 * @example
 * <LeadCaptureForm />
 */
export function LeadCaptureForm() {
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data: LeadFormValues) {
    setSubmitResult(null);

    const result = await submitLead(data);
    setSubmitResult(result);

    if (result.success) {
      reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full max-w-md flex-col gap-4"
      noValidate
    >
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-name" className="text-sm font-medium">
          Họ và tên <span className="text-destructive">*</span>
        </label>
        <input
          id="lead-name"
          type="text"
          placeholder="Nguyễn Văn A"
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-email" className="text-sm font-medium">
          Email <span className="text-destructive">*</span>
        </label>
        <input
          id="lead-email"
          type="email"
          placeholder="email@example.com"
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-phone" className="text-sm font-medium">
          Số điện thoại
        </label>
        <input
          id="lead-phone"
          type="tel"
          placeholder="0912345678"
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-message" className="text-sm font-medium">
          Lời nhắn
        </label>
        <textarea
          id="lead-message"
          placeholder="Nội dung tin nhắn..."
          rows={4}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("message")}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
      </button>

      {/* Result Message */}
      {submitResult && (
        <p
          className={`text-center text-sm ${
            submitResult.success
              ? "text-green-600 dark:text-green-400"
              : "text-destructive"
          }`}
        >
          {submitResult.message}
        </p>
      )}
    </form>
  );
}
