import { WelcomeText } from "@/components/common/WelcomeText";

import { ViewWrapper } from "@/views/_shared/ViewWrapper";

// ─────────────────────────────────────────────────────────────
// HOME VIEW
// ─────────────────────────────────────────────────────────────
// This is where you compose your Home page UI.
// Import section components and arrange them here.
//
// The corresponding route file (app/[lang]/page.tsx) only
// imports this view — keeping routing and UI concerns separated.
// ─────────────────────────────────────────────────────────────

export function HomeView() {
  return (
    <ViewWrapper>
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-24 md:pt-32">
        <WelcomeText />
      </section>

      {/* Add your sections here */}
      {/* <FeaturesSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <CTASection /> */}
      {/* <FooterSection /> */}
    </ViewWrapper>
  );
}
