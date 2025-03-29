import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Ready to transform your college&lsquo;s leave management?
          </h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Join over 50 educational institutions that have simplified their
            administrative processes with our leave management system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/signup">Get Started for Free</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-background/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="#">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
