import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors">
      {/* Navbar */}
      <nav className="w-full flex justify-center border-b border-foreground/10 h-16 backdrop-blur-sm">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href={"/"} className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              Quiet Hours
            </Link>
          </div>
          {!hasEnvVars ? null : <AuthButton />}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 w-full flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
          Find Your <span className="text-indigo-600">Focus</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
          Quiet Hours helps you block out distractions, schedule focused study sessions,
          and get timely reminders before you start.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10 text-center">
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Plan Your Time</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Create study or focus blocks that fit into your day, and stick to them.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Stay on Track</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get email reminders 10 minutes before each session starts, so you never miss your focus time.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Build consistency by monitoring how many hours you dedicate to deep work.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-foreground/10 py-8 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 gap-4">
        <p>© {new Date().getFullYear()} Quiet Hours — Find your focus</p>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}
