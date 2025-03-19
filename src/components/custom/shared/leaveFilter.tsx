/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";

export function LeaveRequestFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "ALL";

  const [search, setSearch] = useState<string>(currentSearch);
  const [status, setStatus] = useState<string>(currentStatus);

  const updateURL = (search: string, status: string) => {
    const params = new URLSearchParams(searchParams.toString());

    search ? params.set("search", search) : params.delete("search");
    status !== "ALL" ? params.set("status", status) : params.delete("status");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const debouncedUpdateURL = useCallback(debounce(updateURL, 300), []);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or description..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            debouncedUpdateURL(e.target.value, status);
          }}
          className="pl-10"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              updateURL(search, status);
            }
          }}
        />
      </div>

      {/* Status Filter Dropdown */}
      <Select
        value={status}
        onValueChange={(newStatus: string) => {
          setStatus(newStatus);
          updateURL(search, newStatus);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Statuses</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="APPROVED">Approved</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
