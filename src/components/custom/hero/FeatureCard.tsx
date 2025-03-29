import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border transition-all duration-200 hover:shadow-md">
      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-5">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
