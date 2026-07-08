import { ViewWrapper } from "@/views/_shared/ViewWrapper";

interface BlogViewProps {
  slug: string;
}

export function BlogView({ slug }: BlogViewProps) {
  return (
    <ViewWrapper>
      <section className="container flex flex-col items-center justify-center gap-6 pb-8 pt-24 md:pt-32">
        <h1 className="text-4xl font-bold tracking-tight text-center sm:text-6xl">
          {slug}
        </h1>
        <p className="text-lg text-muted-foreground text-center">
          Generated view component
        </p>
      </section>
    </ViewWrapper>
  );
}
