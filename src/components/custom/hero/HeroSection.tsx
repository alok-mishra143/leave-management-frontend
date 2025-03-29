"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden h-screen flex items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 z-0">
        <div className="grid-background opacity-10 dark:opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Simplify Leave Management for Your College
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              A modern, efficient system to handle student and staff leave
              applications, approvals, and tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="rounded-full animate-pulse hover:animate-none"
              >
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-full hover:scale-105 transition-transform duration-300"
              >
                <Link href="/#" className="flex items-center">
                  Request Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 shadow-xl border border-border transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="bg-card rounded-md p-4 shadow-sm border border-border">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-foreground font-medium">
                      Leave Application
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Medical Leave
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-amber-500/20 text-amber-600 text-xs font-medium rounded-full ">
                      Pending
                    </span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-600 text-xs font-medium rounded-full ">
                      Approve
                    </span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-500 text-xs font-medium rounded-full ">
                      Rejected
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-muted h-4 rounded w-3/4"></div>
                  <div className="bg-muted h-4 rounded w-full"></div>
                  <div className="bg-muted h-4 rounded w-5/6"></div>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-end space-x-2">
                  <div className="bg-secondary h-8 w-20 rounded"></div>
                  <div className="bg-primary h-8 w-20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
