import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="container-px py-16">
      <SectionHeading kicker="Get in touch" title="Contact us" subtitle="Questions, partnerships or support — we’d love to hear from you." />

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          {[
            { icon: FiMail, label: "Email", value: "support@goticket.app" },
            { icon: FiPhone, label: "Phone", value: "+880 1700-000000" },
            { icon: FiMapPin, label: "Office", value: "Dhaka, Bangladesh" },
          ].map((c) => (
            <div key={c.label} className="card flex items-center gap-4 p-5">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/15 text-brand-500">
                <c.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-400">{c.label}</p>
                <p className="font-semibold">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="card p-6 lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
