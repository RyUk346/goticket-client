import Link from "next/link";
import Logo from "./Logo";
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaCcStripe, FaCcVisa, FaCcMastercard } from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-ink-200 bg-ink-50/60 dark:border-white/10 dark:bg-ink-950/60">
      <div className="container-px grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink-500 dark:text-ink-300">Book bus, train, launch &amp; flight tickets easily — one platform for every journey across the country.</p>
          <div className="mt-5 flex gap-2">
            {[FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 text-ink-500 transition hover:border-brand-400 hover:text-brand-500 dark:border-ink-700 dark:text-ink-300">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-900 dark:text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/" className="link-muted">Home</Link></li>
            <li><Link href="/tickets" className="link-muted">All Tickets</Link></li>
            <li><Link href="/contact" className="link-muted">Contact Us</Link></li>
            <li><Link href="/about" className="link-muted">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-900 dark:text-white">Contact Info</h4>
          <ul className="mt-4 space-y-3 text-sm text-ink-500 dark:text-ink-300">
            <li className="flex items-center gap-2"><FiMail className="h-4 w-4 text-brand-500" /> support@goticket.app</li>
            <li className="flex items-center gap-2"><FiPhone className="h-4 w-4 text-brand-500" /> +880 1700-000000</li>
            <li className="flex items-center gap-2"><FiMapPin className="h-4 w-4 text-brand-500" /> Dhaka, Bangladesh</li>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="link-muted">Facebook Page →</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-ink-900 dark:text-white">We Accept</h4>
          <p className="mt-4 text-sm text-ink-500 dark:text-ink-300">Secure payments powered by Stripe.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <PayIcon icon={FaCcStripe} label="Stripe" />
            <PayIcon icon={FaCcVisa} label="Visa" />
            <PayIcon icon={FaCcMastercard} label="Mastercard" />
          </div>
        </div>
      </div>
      <div className="border-t border-ink-200 dark:border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-2 py-5 text-sm text-ink-500 sm:flex-row dark:text-ink-400">
          <p>© {year} GoTicket. All rights reserved.</p>
          <p className="flex gap-4">
            <Link href="/about" className="link-muted">Privacy</Link>
            <Link href="/about" className="link-muted">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function PayIcon({ icon: Icon, label }) {
  return (
    <span className="grid h-10 w-14 place-items-center rounded-lg border border-ink-200 bg-white text-2xl text-ink-600 dark:border-white/10 dark:bg-white/5 dark:text-ink-200" title={label}>
      <Icon />
    </span>
  );
}