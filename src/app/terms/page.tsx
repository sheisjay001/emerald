import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function TermsOfService() {
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
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Please read these terms carefully before using Emerald.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last Updated: January 1, 2025
          </p>
        </div>

        <div className="space-y-12">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-xl font-semibold text-emerald-700 dark:text-emerald-400">
              <CheckCircle className="w-5 h-5" />
              <h2>1. Acceptance of Terms</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              By accessing or using the Emerald application ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-xl font-semibold text-emerald-700 dark:text-emerald-400">
              <AlertCircle className="w-5 h-5" />
              <h2>2. Medical Disclaimer</h2>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <p className="leading-relaxed text-yellow-800 dark:text-yellow-200 font-medium">
                Emerald is NOT a medical device and does not provide medical advice.
              </p>
              <p className="leading-relaxed text-yellow-700 dark:text-yellow-300 mt-2 text-sm">
                The content, insights, and tracking features provided by Emerald are for informational and educational purposes only. They are not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">3. User Accounts</h2>
            <p className="leading-relaxed text-muted-foreground">
              When you create an account with us, you must provide information that is accurate, complete, and current. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account. You are responsible for safeguarding the password that you use to access the Service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">4. Community Guidelines</h2>
            <p className="leading-relaxed text-muted-foreground">
              Our community is a safe space. We have a zero-tolerance policy for harassment, hate speech, bullying, or any form of abuse. Users found violating these community standards will be permanently banned from the platform.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">5. Intellectual Property</h2>
            <p className="leading-relaxed text-muted-foreground">
              The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Emerald and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">6. Termination</h2>
            <p className="leading-relaxed text-muted-foreground">
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">7. Changes to Terms</h2>
            <p className="leading-relaxed text-muted-foreground">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            Questions? Contact us at support@emerald-app.com
          </p>
        </div>
      </main>
    </div>
  );
}
