import { z } from "zod";

// ─── Lead Form Schema ───────────────────────────────────────

/**
 * Zod schema for lead capture form validation.
 * Used on both client (react-hook-form) and server (Server Action).
 *
 * @example
 * // Client-side with react-hook-form:
 * const form = useForm<LeadFormValues>({
 *   resolver: zodResolver(leadFormSchema),
 * });
 *
 * // Server-side validation:
 * const result = leadFormSchema.safeParse(rawData);
 */
export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Tên phải có ít nhất 2 ký tự." })
    .max(100, { message: "Tên không được quá 100 ký tự." }),

  email: z
    .string()
    .email({ message: "Email không hợp lệ." }),

  phone: z
    .string()
    .regex(/^(\+?84|0)\d{9,10}$/, {
      message: "Số điện thoại không hợp lệ. Ví dụ: 0912345678 hoặc +84912345678",
    })
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .max(1000, { message: "Tin nhắn không được quá 1000 ký tự." })
    .optional()
    .or(z.literal("")),
});

// ─── Types ──────────────────────────────────────────────────

export type LeadFormValues = z.infer<typeof leadFormSchema>;
