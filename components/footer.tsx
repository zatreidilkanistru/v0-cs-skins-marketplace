import Link from "next/link"
import { Twitter, MessageCircle, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">SV</span>
              </div>
              <span className="text-xl font-bold text-foreground">SkinVault</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              The most trusted CS skins marketplace. Trade with confidence using our secure escrow system.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Link href="/" className="rounded-lg bg-secondary p-2 text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="/" className="rounded-lg bg-secondary p-2 text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground">
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link href="/" className="rounded-lg bg-secondary p-2 text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Marketplace</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  All Skins
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Knives
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Gloves
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Rifles
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Pistols
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Price Guide
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Trading Tips
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  API Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 SkinVault. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Not affiliated with Valve Corporation.
          </p>
        </div>
      </div>
    </footer>
  )
}
