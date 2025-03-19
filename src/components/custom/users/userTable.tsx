"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Loader, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserEditDialog from "./userEditDialog";
import axiosInstance from "@/lib/customAxiosInstence";
import { getCookie } from "@/global/getCookie";
import { toast } from "sonner";
import Filter from "./userFilter";
import AddUser from "./AddUser";
import CustomPagination from "../shared/Pagination";
import { AllUsersProps } from "../../../..";

const TableHeadings = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "department", label: "Department" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
];

const UserTable = ({ AllUsers }: { AllUsers: AllUsersProps }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const col = searchParams.get("col") || "name";
  const sort = searchParams.get("sort") || "asc";

  const { data, pagination } = AllUsers;
  const [deletingUser, setDeletingUser] = React.useState<string | null>(null);

  const handleSort = (columnKey: string) => {
    const newSort = col === columnKey && sort === "asc" ? "desc" : "asc";

    const params = new URLSearchParams(searchParams.toString());
    params.set("col", columnKey);
    params.set("sort", newSort);

    router.push(`?${params.toString()}`);
  };

  // Delete user function
  const deleteHandler = async (id: string) => {
    setDeletingUser(id);
    try {
      const token = await getCookie("token");
      const response = await axiosInstance.delete(`/user/${id}`, {
        headers: { token },
      });
      toast.success(response.data.message);
      router.refresh();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    } finally {
      setDeletingUser(null);
    }
  };

  return (
    <div className="w-full flex flex-col p-2">
      <div className="flex justify-between items-center mb-4 p-2">
        <AddUser />
        <Filter />
      </div>

      {/* User Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {TableHeadings.map(({ key, label }) => (
              <TableHead key={key} onClick={() => handleSort(key)}>
                <div className="flex gap-1 cursor-pointer">
                  {label}
                  {col === key && (
                    <ArrowUpDown
                      size={16}
                      className={`transition-transform ${
                        sort === "asc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell className="flex justify-center gap-2">
                <UserEditDialog user={user} />
                <Button
                  disabled={deletingUser === user.id}
                  onClick={() => deleteHandler(user.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded flex items-center gap-1"
                >
                  {deletingUser === user.id ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <CustomPagination pagination={pagination} />
    </div>
  );
};

export default UserTable;
