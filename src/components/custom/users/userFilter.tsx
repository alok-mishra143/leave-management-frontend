/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@/global/constent";
import { useRouter, useSearchParams } from "next/navigation";

const filterOptions = [
  { value: "All", label: "All" },
  { value: Role.ADMIN, label: "Admin" },
  { value: Role.STAFF, label: "Staff" },
  { value: Role.STUDENT, label: "Student" },
];

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialRole = searchParams.get("roleID") || "";
  const initialSearch = searchParams.get("search") || "";

  const [selectedValue, setSelectedValue] = useState(initialRole);
  const [searchValue, setSearchValue] = useState(initialSearch);

  const updateParams = (role: string, search: string) => {
    const params = new URLSearchParams();
    if (role) params.set("roleID", role);
    if (search) params.set("search", search);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateParams(selectedValue, searchValue);
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedValue, searchValue]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
      <div className="relative w-full sm:w-64">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={18}
        />
        <Input
          className="pl-10 w-full border border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition rounded-md"
          placeholder="Search..."
          aria-label="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <Select value={selectedValue} onValueChange={setSelectedValue}>
        <SelectTrigger className="w-full sm:w-52 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition">
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {filterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
