"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center mx-auto">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background/80 backdrop-blur-lg rounded-full shadow-md border border-border px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-semibold text-primary">LMS</span>
                <span className="ml-2 text-lg font-medium">College</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/features"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Features
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-full"
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild className="rounded-full">
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-full"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-24 left-0 right-0 mx-auto max-w-xs animate-fade-in">
          <div className="bg-background/90 backdrop-blur-lg rounded-xl shadow-md border border-border mx-4">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/features"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-border">
              <div className="flex items-center px-5 space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full"
                  asChild
                >
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button size="sm" className="w-full rounded-full" asChild>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
