export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 bg-gradient-to-r from-foreground to-foreground/20 rounded-full animate-spin"></div>
          <div className="absolute inset-1 bg-background rounded-full"></div>
        </div>
        <p className="text-foreground/60 font-medium">Loading...</p>
      </div>
    </div>
  );
}
