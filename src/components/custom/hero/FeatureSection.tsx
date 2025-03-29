import FeatureCard from "./FeatureCard";
import {
  Calendar,
  Clock,
  FileCheck,
  Users,
  Bell,
  BarChart3,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Calendar,
      title: "Easy Leave Applications",
      description:
        "Intuitive interface for students and staff to apply for different types of leaves with just a few clicks.",
    },
    {
      icon: FileCheck,
      title: "Smart Approval Workflow",
      description:
        "Configurable approval chains with automatic notifications to speed up the approval process.",
    },
    {
      icon: Users,
      title: "Role-Based Access Control",
      description:
        "Different permissions for students, faculty, department heads, and administrators.",
    },
    {
      icon: Clock,
      title: "Leave Balance Tracking",
      description:
        "Real-time tracking of available leave balances for different leave types and academic periods.",
    },
    {
      icon: Bell,
      title: "Automated Notifications",
      description:
        "Stay informed with email and in-app notifications about application status changes.",
    },
    {
      icon: BarChart3,
      title: "Comprehensive Reporting",
      description:
        "Generate detailed reports on leave trends, department statistics, and individual records.",
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Powerful Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our leave management system comes packed with features designed
            specifically for educational institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
