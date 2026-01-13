import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, Server } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              E
            </div>
            <span className="font-bold text-lg">Emerald</span>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Your privacy is our fundamental priority. Here&rsquo;s how we protect your data.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last Updated: January 1, 2025
          </p>
        </div>

        <div className="space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-xl font-semibold text-emerald-700 dark:text-emerald-400">
              <Lock className="w-5 h-5" />
              <h2>1. Data Minimization & Local Storage</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Emerald is designed with a &quot;Local First&quot; architecture. Whenever possible, your sensitive health data (including cycle tracking, symptoms, and journal entries) is stored directly on your device using encrypted local storage. We do not monetize, sell, or aggregate your personal health data for advertising purposes.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-xl font-semibold text-emerald-700 dark:text-emerald-400">
              <Eye className="w-5 h-5" />
              <h2>2. Information We Collect</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              We collect only the minimum information necessary to provide our services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Account Information:</strong> Name, email address, and encrypted password for authentication.</li>
              <li><strong>Health Metrics:</strong> Data you explicitly log, such as cycle dates, mood, and symptoms.</li>
              <li><strong>Usage Data:</strong> Anonymous, aggregated telemetry to help us improve app performance (e.g., crash reports).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-xl font-semibold text-emerald-700 dark:text-emerald-400">
              <Server className="w-5 h-5" />
              <h2>3. Data Security</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              All data transmitted between your device and our servers (for backup or sync features) is encrypted using industry-standard TLS 1.3 protocols. Data at rest is encrypted using AES-256 encryption. We employ strict access controls, ensuring that no unauthorized personnel can access your personal information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Third-Party Services</h2>
            <p className="leading-relaxed text-muted-foreground">
              We do not share your identifiable data with third parties for marketing. We may use trusted infrastructure providers (like secure cloud hosting) solely to operate the service. These providers are bound by strict data processing agreements to protect your privacy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Your Rights</h2>
            <p className="leading-relaxed text-muted-foreground">
              You maintain full ownership of your data. You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Export your data in a portable format.</li>
              <li>Delete your account and all associated data permanently.</li>
              <li>Opt-out of any optional data collection features.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. Contact Us</h2>
            <p className="leading-relaxed text-muted-foreground">
              If you have any questions about our privacy practices or data protection, please contact our Data Protection Officer at privacy@emerald-app.com.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            By using Emerald, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>
      </main>
    </div>
  );
}
