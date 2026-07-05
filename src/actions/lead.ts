"use server";

import { leadFormSchema, type LeadFormValues } from "@/lib/validations/lead";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// ─── Types ──────────────────────────────────────────────────

interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// ─── Server Action ──────────────────────────────────────────

/**
 * Server Action to handle lead form submission.
 * Validates input with Zod, then pushes data to Supabase.
 *
 * @example
 * // In a Client Component:
 * import { submitLead } from "@/actions/lead";
 *
 * const result = await submitLead({
 *   name: "John Doe",
 *   email: "john@example.com",
 *   phone: "0912345678",
 * });
 *
 * if (result.success) {
 *   // Show success message
 * } else {
 *   // Handle errors
 * }
 */
export async function submitLead(data: LeadFormValues): Promise<ActionResult> {
  // ─── Validate on Backend ────────────────────────────────
  const validationResult = leadFormSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: "Dữ liệu không hợp lệ.",
      errors: validationResult.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const validData = validationResult.data;

  try {
    // ─── Push to Database ───────────────────────────────
    const supabase = createServerSupabaseClient();

    const { error } = await supabase.from("leads").insert({
      name: validData.name,
      email: validData.email,
      phone: validData.phone || null,
      message: validData.message || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("[submitLead] Supabase error:", error);
      return {
        success: false,
        message: "Đã xảy ra lỗi khi gửi thông tin. Vui lòng thử lại.",
      };
    }

    return {
      success: true,
      message: "Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.",
    };
  } catch (error) {
    console.error("[submitLead] Unexpected error:", error);
    return {
      success: false,
      message: "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.",
    };
  }
}
