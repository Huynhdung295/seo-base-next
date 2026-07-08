export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Accessible loading spinner */}
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </main>
  );
}
