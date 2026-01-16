import { Navbar, Footer } from "@/components/layout";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-32">
        <div className="bg-white dark:bg-slate-800 shadow rounded-2xl p-8 space-y-6 dark:shadow-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-primary font-bold mb-1">
                Terms &amp; Conditions
              </p>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                Terms for using the Yummy platform
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last updated: December 29, 2025
            </p>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            Welcome to Yummy! By accessing or using the Yummy mobile application
            or website, you agree to be bound by these Terms and Conditions.
          </p>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
            <p className="text-slate-600 dark:text-slate-300">
              By using this application, you agree to comply with these terms.
              If you do not agree, please do not use the app.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Use of the Application</h2>
            <p className="text-slate-600 dark:text-slate-300">You agree to:</p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
              <li>Use the app only for lawful purposes</li>
              <li>Provide accurate information</li>
              <li>Maintain confidentiality of login credentials</li>
              <li>Not misuse or attempt to disrupt the system</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Account Responsibility</h2>
            <p className="text-slate-600 dark:text-slate-300">You are responsible for:</p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
              <li>All activity under your account</li>
              <li>Keeping login credentials secure</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-300">
              We are not responsible for unauthorized access caused by user
              negligence.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Service Availability</h2>
            <p className="text-slate-600 dark:text-slate-300">
              We aim to provide uninterrupted service but do not guarantee
              continuous availability or error-free operation. Service may be
              temporarily suspended for maintenance or upgrades.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Intellectual Property</h2>
            <p className="text-slate-600 dark:text-slate-300">
              All content including logos, design, source code, text, and
              graphics belongs to Yummy and may not be copied or reused without
              permission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Termination</h2>
            <p className="text-slate-600 dark:text-slate-300">
              We reserve the right to suspend or terminate accounts that violate
              these terms, abuse the platform, or engage in illegal activity.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Limitation of Liability</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Yummy shall not be liable for business losses, data loss, or
              indirect or incidental damages. Use of the app is at your own
              risk.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">8. Changes to Terms</h2>
            <p className="text-slate-600 dark:text-slate-300">
              We may update these terms at any time. Continued use of the app
              means acceptance of updated terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">9. Governing Law</h2>
            <p className="text-slate-600 dark:text-slate-300">
              These terms shall be governed by the laws of Nepal.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">10. Contact Information</h2>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
              <li>
                Email:{" "}
                <a
                  className="text-primary font-semibold"
                  href="mailto:everpeak.np@gmail.com"
                >
                  everpeak.np@gmail.com
                </a>
              </li>
              <li>
                Website:{" "}
                <a
                  className="text-primary font-semibold"
                  href="https://yummyever.com"
                >
                  https://yummyever.com
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
