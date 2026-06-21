import Logo from "./Logo";
import { FiCheckCircle } from "react-icons/fi";

export default function AuthAside() {
  return (
    <div className="relative hidden overflow-hidden bg-ink-950 lg:block">
      <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-950 to-black" />
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(40rem 40rem at 20% 20%, rgba(245,158,11,0.18), transparent 60%), radial-gradient(36rem 36rem at 90% 80%, rgba(56,89,138,0.25), transparent 60%)" }} />
      <div className="relative flex h-full flex-col justify-between p-12 text-white">
        <Logo />
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight text-white">Every journey<br />begins with a ticket.</h2>
          <p className="mt-4 max-w-sm text-ink-300">Bus, train, launch and flights — discover and book in one beautifully simple place.</p>
          <ul className="mt-8 space-y-3 text-sm text-ink-200">
            {["Verified vendors & secure Stripe checkout", "Real-time seat availability", "Manage every booking from one dashboard"].map((f) => (
              <li key={f} className="flex items-center gap-2"><FiCheckCircle className="h-5 w-5 text-brand-400" /> {f}</li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-ink-400">© {new Date().getFullYear()} GoTicket</p>
      </div>
    </div>
  );
}