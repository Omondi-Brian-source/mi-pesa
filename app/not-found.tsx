import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Page not found
        </h2>
        <p className="text-foreground/60 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 px-6 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
