import { Navbar, Footer } from "@/components/layout";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-black font-display mb-8">Contact Us</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Have questions about Yummy POS? We&apos;d love to hear from you. Get in
            touch using the information below.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <h3 className="text-xl font-bold mb-4">Email</h3>
              <a
                href="mailto:support@yummypos.com"
                className="text-primary hover:underline"
              >
                support@yummypos.com
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <h3 className="text-xl font-bold mb-4">Phone</h3>
              <p className="text-slate-600 dark:text-slate-400">
                +977 980-0000000
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="text-primary hover:underline flex items-center gap-2"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
