import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// 📦 VIEW WRAPPER
// ─────────────────────────────────────────────────────────────
// Common wrapper for all views. Provides consistent:
// - Max width constraints
// - Padding & spacing
// - Semantic HTML structure
//
// @example
// export function AboutView() {
//   return (
//     <ViewWrapper>
//       <h1>About Us</h1>
//       <p>Our story...</p>
//     </ViewWrapper>
//   );
// }
// ─────────────────────────────────────────────────────────────

interface ViewWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Use <main> or <div> as the wrapper element */
  as?: "main" | "div";
}

export function ViewWrapper({
  children,
  className,
  as: Tag = "main",
}: ViewWrapperProps) {
  return (
    <Tag
      className={cn(
        "flex min-h-screen flex-col",
        className
      )}
    >
      {children}
    </Tag>
  );
}
