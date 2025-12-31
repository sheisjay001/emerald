import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">Emerald</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="#" className="border-primary text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link href="#features" className="border-transparent text-muted-foreground hover:border-border hover:text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Features
              </Link>
              <Link href="#goals" className="border-transparent text-muted-foreground hover:border-border hover:text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Goals
              </Link>
              <Link href="#contact" className="border-transparent text-muted-foreground hover:border-border hover:text-foreground inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                Contact
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-background pt-16 pb-32 space-y-24">
          <div className="relative">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  <div className="mt-6">
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                      Next-Gen Women’s Health & Wellness App
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                      A privacy-first, AI-powered web application designed to support women by offering personalized menstrual tracking, mental health integration, real-time medical insights, and protection from online harassment.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="#"
                        className="inline-flex px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                      >
                        Join the Waitlist
                      </Link>
                      <Link
                        href="#features"
                        className="ml-4 inline-flex px-8 py-3 border border-border text-base font-medium rounded-md text-foreground bg-card hover:bg-muted transition-colors"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <div className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-9xl font-bold opacity-80">
                    {/* Placeholder for Hero Image */}
                    <span className="opacity-20 select-none">UI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Goals */}
        <div id="goals" className="bg-secondary py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Project Goal</h2>
              <p className="mt-1 text-4xl font-extrabold text-foreground sm:text-5xl sm:tracking-tight lg:text-6xl">
                Empowering Women
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-muted-foreground">
                To build a women-focused digital space that goes beyond cycle tracking.
              </p>
            </div>
            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
               {[
                 { title: "Intelligent Insights", desc: "Menstrual health insights powered by AI." },
                 { title: "Mental Wellness", desc: "Mental and emotional wellness support integration." },
                 { title: "Privacy First", desc: "Complete data privacy and control for users." },
                 { title: "Community Safety", desc: "Community-driven safety from online threats." },
               ].map((goal, index) => (
                 <div key={index} className="bg-card rounded-lg shadow-lg p-6 border border-border">
                   <h3 className="text-lg font-medium text-foreground">{goal.title}</h3>
                   <p className="mt-2 text-muted-foreground">{goal.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div id="features" className="py-16 sm:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-foreground">Key Features</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to manage your health and safety in one place.
              </p>
            </div>
            <div className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
              {[
                {
                  title: "Smart Menstrual & Health Tracker",
                  desc: "Tracks periods, ovulation, symptoms, energy levels. Learns from user data to adjust predictions and sends custom insights."
                },
                {
                  title: "AI-Powered Health Alert System",
                  desc: "Detects patterns suggesting PCOS, Endometriosis, irregular cycles, or anemia risks and prompts to seek medical support."
                },
                {
                  title: "Mood & Mental Health Support",
                  desc: "Tracks mood across the cycle. Offers mindfulness exercises, self-care checklists, and nutrition tips."
                },
                {
                  title: "Encrypted, Privacy-First",
                  desc: "No third-party sharing. Local-only storage with optional encrypted sync. Full user control over data."
                },
                {
                  title: "Education Layer",
                  desc: "Explains why symptoms occur during phases. Gives context-driven learning based on your current cycle phase."
                },
                {
                  title: "Community & Harassment Protection",
                  desc: "Women-only safe network with AI moderation to report and auto-flag abusive behavior. (Future Feature)"
                }
              ].map((feature, index) => (
                <div key={index} className="relative bg-card p-6 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                  <dt>
                    <p className="text-lg leading-6 font-medium text-foreground">{feature.title}</p>
                  </dt>
                  <dd className="mt-2 text-base text-muted-foreground">
                    {feature.desc}
                  </dd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Twitter</span>
              {/* Icon placeholder */}
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-muted-foreground">
              &copy; 2024 Emerald. Made with love, for women — by a woman in cybersecurity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
