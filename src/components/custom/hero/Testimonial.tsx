import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

const TestimonialCard = ({
  quote,
  author,
  role,
  image,
}: TestimonialCardProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <svg
            width="45"
            height="36"
            className="text-primary/20"
            viewBox="0 0 45 36"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 36H0V22.5C0 16.5 1.5 11.625 4.5 7.875C7.5 4.125 11.625 1.5 16.875 0L20.25 6.75C17.25 7.5 14.625 9 12.375 11.25C10.125 13.5 9 15.75 9 18H13.5C15.1875 18 16.6875 18.5625 18 19.6875C19.3125 20.8125 19.9688 22.125 19.9688 23.625C19.9688 25.125 19.3125 26.4375 18 27.5625C16.6875 28.6875 15.1875 29.25 13.5 29.25V36ZM38.25 36H24.75V22.5C24.75 16.5 26.25 11.625 29.25 7.875C32.25 4.125 36.375 1.5 41.625 0L45 6.75C42 7.5 39.375 9 37.125 11.25C34.875 13.5 33.75 15.75 33.75 18H38.25C39.9375 18 41.4375 18.5625 42.75 19.6875C44.0625 20.8125 44.7188 22.125 44.7188 23.625C44.7188 25.125 44.0625 26.4375 42.75 27.5625C41.4375 28.6875 39.9375 29.25 38.25 29.25V36Z" />
          </svg>
        </div>
        <p className="text-foreground flex-grow mb-4">{quote}</p>
        <div className="flex items-center mt-auto">
          {image ? (
            <Image
              src={image}
              alt={author}
              className="h-10 w-10 rounded-full mr-3"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
              <span className="text-sm font-medium">{author.charAt(0)}</span>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-foreground">{author}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
