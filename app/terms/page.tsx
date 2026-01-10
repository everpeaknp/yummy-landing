import { Navbar, Footer } from "@/components/layout";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 max-w-4xl mx-auto px-6 animate-pop-in">
        <h1 className="text-4xl font-black font-display mb-8">
          Terms and Conditions
        </h1>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
          <p className="text-lg mb-6">Last updated: January 2026</p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using Yummy POS, you accept and agree to be bound
            by the terms and provisions of this agreement.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            2. Use License
          </h2>
          <p>
            Permission is granted to temporarily use Yummy POS for personal,
            non-commercial transitory viewing only. This is the grant of a
            license, not a transfer of title.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            3. Disclaimer
          </h2>
          <p>
            The materials on Yummy POS are provided on an &apos;as is&apos; basis. Yummy
            Inc. makes no warranties, expressed or implied, and hereby disclaims
            and negates all other warranties.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
            4. Limitations
          </h2>
          <p>
            In no event shall Yummy Inc. or its suppliers be liable for any
            damages arising out of the use or inability to use the materials on
            Yummy POS.
          </p>

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
