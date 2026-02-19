import { LegalPageContent } from "@/components/legal";

function FallbackCookiesContent() {
  return (
    <>
      <p className="text-slate-600 dark:text-slate-300">
        This Cookie Policy explains what cookies are and how Yummy uses them on our 
        website and application. We use cookies to enhance your experience and provide 
        a personalized service.
      </p>

      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          1. What Are Cookies?
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Cookies are small text files stored on your device when you visit a website. 
          They help us remember your preferences, understand how you use our platform, 
          and improve your experience.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          2. Types of Cookies We Use
        </h2>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            2.1 Essential Cookies
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Required for the website to function properly. These cannot be disabled.
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
            <li>Session management</li>
            <li>Authentication and security</li>
            <li>Load balancing</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            2.2 Functional Cookies
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Remember your preferences and settings.
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
            <li>Language preferences</li>
            <li>Theme settings (light/dark mode)</li>
            <li>Remember login state</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            2.3 Analytics Cookies
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Help us understand how visitors interact with our website.
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
            <li>Page views and navigation patterns</li>
            <li>Time spent on pages</li>
            <li>Error tracking and performance monitoring</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            2.4 Marketing Cookies
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Used to deliver relevant advertisements and track campaign effectiveness.
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
            <li>Ad targeting</li>
            <li>Campaign performance tracking</li>
            <li>Cross-site identification (optional)</li>
          </ul>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          3. Third-Party Cookies
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          We may use cookies from third-party services:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
          <li>Google Analytics - for website traffic analysis</li>
          <li>Firebase - for app performance monitoring</li>
          <li>Social media plugins - for sharing features</li>
        </ul>
        <p className="text-slate-600 dark:text-slate-300">
          These third parties have their own cookie policies.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          4. Managing Cookies
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          You can control cookies through your browser settings:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
          <li>Block all cookies</li>
          <li>Delete existing cookies</li>
          <li>Allow cookies from specific sites only</li>
          <li>Set preferences for different types of cookies</li>
        </ul>
        <p className="text-slate-600 dark:text-slate-300">
          Note: Disabling cookies may affect website functionality.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          5. Cookie Retention
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Different cookies are stored for different periods:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
          <li>Session cookies - deleted when you close your browser</li>
          <li>Persistent cookies - stored for up to 1 year</li>
          <li>Analytics cookies - typically stored for 26 months</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          6. Updates to This Policy
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          We may update this Cookie Policy from time to time. Changes will be posted 
          on this page with an updated revision date.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          7. Contact Us
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          If you have questions about our use of cookies:
        </p>
        <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1">
          <li>
            Email:{" "}
            <a className="text-primary font-semibold" href="mailto:everpeak.np@gmail.com">
              everpeak.np@gmail.com
            </a>
          </li>
          <li>
            Website:{" "}
            <a className="text-primary font-semibold" href="https://yummyever.com">
              https://yummyever.com
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}

export default function CookiesPage() {
  return (
    <LegalPageContent
      pageType="cookies"
      fallbackTitle="Cookie Policy"
      fallbackSubtitle="How Yummy uses cookies"
      fallbackLastUpdated="December 29, 2025"
      fallbackContent={<FallbackCookiesContent />}
    />
  );
}
