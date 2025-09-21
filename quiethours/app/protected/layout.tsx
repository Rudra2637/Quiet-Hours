import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight hover:text-primary transition-colors"
          >
            Quiet Hours App
          </Link>
          <div className="flex items-center gap-4">
            
            {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 w-full flex justify-center">
        <div className="w-full max-w-5xl p-6">{children}</div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-foreground/10 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground px-6 gap-4">
          <p>
            Powered by{" Quiet Hours"}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              rel="noreferrer"
              className="font-semibold hover:text-primary transition-colors"
            >
              
            </a>
          </p>
          <ThemeSwitcher />
        </div>
      </footer>
    </main>
  );
}
