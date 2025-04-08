import React from "react";
import { BlogsProps } from "../../../..";
import BlogCard from "./BlogCard";
import CustomPagination from "../shared/Pagination";

const BlogPage: React.FC<BlogsProps> = ({ data, pagination }) => {
  return (
    <div className="w-full h-full flex flex-col">
      {/* Blog Cards */}
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {data.map((blog, index) => (
          <BlogCard
            key={index}
            author={blog.author}
            content={blog.content}
            createdAt={blog.createdAt}
            title={blog.title}
            id={blog.id}
          />
        ))}
      </div>

      {/* Pagination at the bottom */}
      <div className="border-t border-gray-800 mt-auto">
        <CustomPagination pagination={pagination} />
      </div>
    </div>
  );
};

export default BlogPage;
