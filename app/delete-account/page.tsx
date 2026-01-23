import { Navbar, Footer } from "@/components/layout";

export default function DeleteAccountPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-32">
        <div className="bg-white dark:bg-slate-800 shadow rounded-2xl p-8 space-y-6 dark:shadow-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-primary font-bold mb-1">
                Account Deletion
              </p>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                Delete Your Account
              </h1>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            This page explains how to permanently delete your account for the
            Yummy mobile app, as required by Google Play.
          </p>

          {/* Important Warning */}
          <div className="bg-primary/10 rounded-xl p-5 flex gap-4 items-start">
            <div className="p-2 rounded-full bg-primary/20 text-primary shrink-0">
              <span className="material-symbols-outlined">warning</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Important
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Deleting your account is permanent and cannot be undone.
              </p>
            </div>
          </div>

          {/* How to request deletion */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              How to request deletion
            </h2>
            <ol className="list-decimal list-inside text-slate-600 dark:text-slate-300 space-y-2">
              <li>Open the Yummy app and log in.</li>
              <li>
                Go to <span className="font-semibold">Settings → Delete Account</span>.
              </li>
              <li>Confirm deletion.</li>
            </ol>
          </section>

          {/* If you cannot access the app */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              If you cannot access the app
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              You can request account deletion by emailing our support team at{" "}
              <a
                className="text-primary font-semibold"
                href="mailto:support@yummyever.com"
              >
                support@yummyever.com
              </a>
              .
            </p>
          </section>

          {/* What data will be deleted */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              What data will be deleted
            </h2>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
              <li>Profile information</li>
              <li>Authentication data</li>
              <li>Device tokens / notifications</li>
              <li>App preferences</li>
              <li>Restaurant or staff-related data</li>
            </ul>
          </section>

          {/* Data retention */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Data retention
            </h2>
            <p className="text-slate-600 dark:text-slate-300">
              Some data may be retained for up to 30 days to comply with legal,
              security, or accounting requirements. After this period, it will
              be permanently removed.
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-300">
              Need help? Email{" "}
              <a
                className="text-primary font-semibold"
                href="mailto:support@yummyever.com"
              >
                support@yummyever.com
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
