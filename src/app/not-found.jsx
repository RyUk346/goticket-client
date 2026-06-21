import Link from "next/link";
import { FiCompass } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-4 text-center">
      <div className="animate-fade-up">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-brand-500/15 text-brand-500">
          <FiCompass className="h-10 w-10" />
        </div>
        <p className="font-display text-7xl font-extrabold text-brand-500">404</p>
        <h1 className="mt-2 text-2xl">This route doesn’t exist</h1>
        <p className="section-sub mx-auto">The page you’re looking for may have departed. Let’s get you back on track.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/tickets" className="btn-outline">Browse Tickets</Link>
        </div>
      </div>
    </main>
  );
}