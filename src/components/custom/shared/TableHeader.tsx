"use client";
import { TableHead, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface TableHeaderProps {
  key: string;
  label: string;
}

const CustomTableHeader = ({
  TableHeadings,
}: {
  TableHeadings: TableHeaderProps[];
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const col = searchParams.get("col") || "createdAt";
  const sort = searchParams.get("sort") || "asc";

  const handleSort = (columnKey: string) => {
    const newSort = col === columnKey && sort === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("col", columnKey);
    params.set("sort", newSort);
    router.push(`?${params.toString()}`);
  };

  return (
    <TableRow>
      {TableHeadings.map(({ key, label }) => (
        <TableHead key={key} onClick={() => handleSort(key)}>
          <div className="flex gap-1 items-center cursor-pointer">
            {label}
            <ArrowUpDown
              size={16}
              className={`transition-transform ${
                col === key
                  ? sort === "asc"
                    ? "rotate-180"
                    : ""
                  : "opacity-30"
              }`}
            />
          </div>
        </TableHead>
      ))}
      <TableHead>Action</TableHead>
    </TableRow>
  );
};

export default CustomTableHeader;
