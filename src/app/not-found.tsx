"use client";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-black"
    >
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-7xl font-bold text-primary mb-4 ">404</h1>
        <p className="text-xl text-gray-300 mb-6">
          Oops! This page doesn&apos;t exist
        </p>
        <p className="text-gray-400 mb-8">
          The page you are looking for might have been moved, deleted, or never
          existed.
        </p>
        <Button asChild>
          <Link href="/" className="flex items-center justify-center">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default NotFound;
