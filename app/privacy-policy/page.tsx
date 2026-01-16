import { Navbar, Footer } from "@/components/layout";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-32">
        <div className="bg-white dark:bg-slate-800 shadow rounded-2xl p-8 space-y-6 dark:shadow-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-primary font-bold mb-1">
                Privacy Policy
              </p>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                Your privacy matters to Yummy
              </h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last updated: December 29, 2025
            </p>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            Yummy ("we", "our", or "us") operates the Yummy mobile application
            and related services. This Privacy Policy explains how we collect,
            use, disclose, and protect your information when you use our
            application and services. By using Yummy, you agree to the
            collection and use of information in accordance with this policy.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Information We Collect</h2>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 dark:text-white">1.1 Personal Information</h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>User role (Admin, Staff, Kitchen, etc.)</li>
                <li>Restaurant details (name, address, branch)</li>
                <li>Login credentials (securely stored)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 dark:text-white">1.2 Usage &amp; Device Information</h3>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>Device model</li>
                <li>Operating system version</li>
                <li>App version</li>
                <li>IP address</li>
                <li>Device identifiers</li>
                <li>Log data and crash reports</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900 dark:text-white">1.3 Location Information (Optional)</h3>
              <p className="text-slate-600 dark:text-slate-300">If enabled by the user:</p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
                <li>
                  Approximate or precise location for attendance or business
                  verification purposes
                </li>
                <li>
                  Location access is optional and used only when required for
                  specific features.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
              <li>Provide and manage restaurant operations</li>
              <li>Authenticate users securely</li>
              <li>Manage staff, payroll, and orders</li>
              <li>Send notifications and alerts</li>
              <li>Improve app performance and reliability</li>
              <li>Prevent fraud and unauthorized access</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Data Sharing &amp; Disclosure</h2>
            <p className="text-slate-600 dark:text-slate-300">
              We do not sell or rent your personal data.
            </p>
            <p className="text-slate-600 dark:text-slate-300">We may share data only:</p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
              <li>
                With trusted service providers (e.g., hosting, analytics)
              </li>
              <li>When required by law</li>
              <li>To protect our legal rights and platform security</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Data Security</h2>
            <p className="text-slate-600 dark:text-slate-300">
              We take reasonable measures to protect your data including:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
              <li>Encrypted data transmission (HTTPS)</li>
              <li>Secure backend APIs</li>
              <li>Role-based access control</li>
              <li>Restricted database access</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Data Retention</h2>
            <p className="text-slate-600 dark:text-slate-300">
              We retain data only as long as necessary:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
              <li>To provide our services</li>
              <li>To comply with legal obligations</li>
              <li>To resolve disputes</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-300">
              You may request deletion of your data at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. User Rights</h2>
            <p className="text-slate-600 dark:text-slate-300">You have the right to:</p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
              <li>Access your personal data</li>
              <li>Update or correct information</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-300">
              To request changes, contact us at:{" "}
              <a
                className="text-primary font-semibold"
                href="mailto:support@yummyever.com"
              >
                support@yummyever.com
              </a>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Children’s Privacy</h2>
            <p className="text-slate-600 dark:text-slate-300">
              Yummy is not intended for children under 13. We do not knowingly
              collect personal data from children.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">8. Third-Party Services</h2>
            <p className="text-slate-600 dark:text-slate-300">
              We may use third-party services such as:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
              <li>Google Firebase (Analytics, Notifications)</li>
              <li>Cloud hosting providers</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-300">
              These services have their own privacy policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">9. Changes to This Policy</h2>
            <p className="text-slate-600 dark:text-slate-300">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">10. Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-300">If you have questions or concerns:</p>
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
