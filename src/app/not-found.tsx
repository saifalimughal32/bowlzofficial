import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-5 pt-24 pb-16 text-center">
      <h1 className="mb-3 text-4xl font-bold text-ink md:text-5xl">404</h1>
      <p className="mb-8 max-w-md text-muted">This page could not be found.</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-pill btn-pill-brand">
          Back to Home
        </Link>
        <Link href="/shop" className="btn-pill btn-pill-outline">
          Shop All
        </Link>
      </div>
    </div>
  );
}
