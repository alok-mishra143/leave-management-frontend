import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "lucide-react";
import { format } from "date-fns";
import { BlogCardProps } from "../../../..";

const blog = {
  id: "1",
  title: "Sample Blog Title",
  content:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  author: "John Doe",
  createdAt: "2023-10-01",
  updatedAt: "2023-10-02",
};

const BlogCard: React.FC<BlogCardProps> = ({ title, content, author }) => {
  return (
    <Card className="w-md h-[15rem] bg-neutral-900 text-white rounded-3xl overflow-hidden border border-gray-800 shadow-lg transition-all duration-300 transform group-hover:shadow-2xl group-hover:-translate-y-1 hover:border-green-500 group block cursor-pointer">
      <CardHeader className="p-5">
        <CardTitle className="text-xl font-semibold text-white group-hover:text-gray-300 transition-colors duration-200">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-4">
        <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
          {content}
        </p>
      </CardContent>
      <CardFooter className="px-5 py-4 border-t border-gray-800 flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{author}</span>
        </div>
        <span className="text-gray-500 text-xs">
          {format(new Date(blog.createdAt), "MMMM d, yyyy")}
        </span>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
