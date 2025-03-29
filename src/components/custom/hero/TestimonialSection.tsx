import TestimonialCard from "./Testimonial";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "This system has revolutionized how we handle student leave applications. The approval process that used to take days now takes minutes.",
      author: "Dr. Sarah Johnson",
      role: "Dean of Students, Westlake University",
    },
    {
      quote:
        "The analytics and reporting features have given us valuable insights into attendance patterns across different departments.",
      author: "Prof. Michael Chen",
      role: "Department Head, Eastern College",
    },
    {
      quote:
        "As a student representative, I've received great feedback about how easy it is to apply for and track leave requests through this system.",
      author: "Emma Rodriguez",
      role: "Student Council President",
    },
  ];

  return (
    <div className="bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            What People Are Saying
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading educational institutions across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
