"use client";

interface StatProps {
  value: string;
  label: string;
}

const Stat = ({ value, label }: StatProps) => (
  <div className="text-center p-4 bg-background/60 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm">
    <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);

const StatsSection = () => {
  return (
    <div className="bg-muted/30 py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Our Impact in Numbers
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          <Stat value="98%" label="User Satisfaction" />
          <Stat value="50+" label="Colleges Using LMS" />
          <Stat value="10k+" label="Leave Requests/Month" />
          <Stat value="99.9%" label="System Uptime" />
        </div>

        <div className="mt-12"></div>
      </div>
    </div>
  );
};

export default StatsSection;
