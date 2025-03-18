"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserEditDialog from "./userEditDialog";
import axiosInstance from "@/lib/customAxiosInstence";
import { getCookie } from "@/global/getCookie";
import { useRouter } from "next/navigation";
import { Response } from "../../../..";
import { toast } from "sonner";
import Filter from "./userFilter";
import AddUser from "./AddUser";
import CustomPagination from "../shared/Pagination";

const TableHeadings = [
  "Name",
  "Email",
  "Role",
  "Department",
  "Phone",
  "Address",
];

const UserTable = ({ AllUsers }: { AllUsers: Response }) => {
  const router = useRouter();
  const { data, pagination } = AllUsers;
  console.log(pagination, "....");
  console.log(AllUsers, "....");
  const [deletingUser, setDeletingUser] = React.useState<string | null>(null);

  const deleteHandler = async (id: string) => {
    setDeletingUser(id);
    try {
      const token = await getCookie("token");
      const response = await axiosInstance.delete(`/user/${id}`, {
        headers: {
          token: token,
        },
      });
      toast.success(response.data.message);
      console.log(response);
      router.refresh();
    } catch (error) {
      toast.error("Error deleting user");
      console.log(error);
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

      <Table>
        <TableHeader>
          <TableRow>
            {TableHeadings.map((heading, index) => (
              <TableHead key={index}>{heading}</TableHead>
            ))}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell className="flex justify-center">
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
      <CustomPagination pagination={pagination} />
    </div>
  );
};

export default UserTable;
