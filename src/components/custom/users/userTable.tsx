"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserEditDialog from "./userEditDialog";
import axiosInstance from "@/lib/customAxiosInstence";
import { getCookie } from "@/global/getCookie";
import { toast } from "sonner";
import Filter from "./userFilter";
import AddUser from "./AddUser";
import CustomPagination from "../shared/Pagination";
import { AllUsersProps } from "../../../..";
import { CustomToolTip } from "./CustomToolTip";
import CustomTableHeader from "../shared/TableHeader";

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

  const { data, pagination } = AllUsers;
  const [deletingUser, setDeletingUser] = React.useState<string | null>(null);

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
          <CustomTableHeader TableHeadings={TableHeadings} />
        </TableHeader>
        <TableBody>
          {data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <CustomToolTip full={user.address} />
              </TableCell>
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
