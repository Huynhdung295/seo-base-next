import { ViewWrapper } from "@/views/_shared/ViewWrapper";

// ─────────────────────────────────────────────────────────────
// CONTACT US VIEW
// ─────────────────────────────────────────────────────────────

export function ContactUsView() {
  return (
    <ViewWrapper>
      <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-24 md:pt-32">
        <h1 className="text-4xl font-bold tracking-tight text-center sm:text-6xl">
          Contact Us
        </h1>
        <p className="max-w-[600px] text-center text-lg text-muted-foreground">
          Have questions or need support? Drop us a message, and our team will get back to you shortly.
        </p>

        {/* 
          // IDEA: This is where you would drop in your Plugin
          // Example:
          // <CTASection 
          //   fields={["name", "email", "message"]} 
          //   supabaseTable="contacts" 
          // /> 
        */}
        <div className="mt-12 w-full max-w-md p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
          <p className="text-center text-sm text-muted-foreground italic">
            [ Contact form (Plugin CTA) will be placed here ]
          </p>
        </div>
      </section>
    </ViewWrapper>
  );
}
