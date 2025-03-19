"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
}

const CustomPagination: React.FC<{ pagination: PaginationProps }> = ({
  pagination,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract initial values from URL (or fallback to props)
  const currentPage = Number(searchParams.get("page")) || pagination.page || 1;
  const currentLimit =
    Number(searchParams.get("limit")) || pagination.limit || 10;
  const totalPages = Math.ceil(pagination.total / currentLimit);

  // Update the URL when values change
  const updateURL = (newPage: number, newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-between items-center  ">
      {/* Rows per page dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Rows per page:</span>
        <Select
          onValueChange={(value) => updateURL(1, Number(value))} // Reset page to 1 on limit change
          defaultValue={currentLimit.toString()}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder={currentLimit.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="30">30</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Pagination Controls */}
      <div>
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              {currentPage !== 1 && (
                <PaginationPrevious
                  onClick={() => updateURL(currentPage - 1, currentLimit)}
                />
              )}
            </PaginationItem>

            {/* Dynamically Generated Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (num) =>
                  num === 1 ||
                  num === totalPages ||
                  (num >= currentPage - 1 && num <= currentPage + 1)
              )
              .map((num, index, arr) => (
                <React.Fragment key={num}>
                  {index > 0 && num - arr[index - 1] > 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      isActive={num === currentPage}
                      onClick={() => updateURL(num, currentLimit)}
                    >
                      {num}
                    </PaginationLink>
                  </PaginationItem>
                </React.Fragment>
              ))}

            {/* Next Button */}
            <PaginationItem>
              {currentPage !== totalPages && (
                <PaginationNext
                  onClick={() => updateURL(currentPage + 1, currentLimit)}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default CustomPagination;
