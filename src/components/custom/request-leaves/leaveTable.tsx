"use client";

import React from "react";
import { leaveRequestsProps } from "../../../..";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import LeaveBadge from "./leaveBadge";
import { LeaveRequestFilters } from "../shared/leaveFilter";
import UpdateLeave from "./updateLeave";
import { LeaveType } from "@/global/constent";
import CustomPagination from "../shared/Pagination";
import CustomTableHeader from "../shared/TableHeader";
import { Separator } from "@/components/ui/separator";

const TableHeadings = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "leaveType", label: "Leave Type" },
  { key: "reason", label: "Reason" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { key: "status", label: "Status" },
  { key: "requestedTo", label: "Requested To" },
  { key: "approvedBy", label: "Approved By" },
];

const LeaveTable = ({ Leaves }: { Leaves: leaveRequestsProps }) => {
  const { data, pagination } = Leaves;

  return (
    <div className="flex flex-col gap-5">
      <LeaveRequestFilters />
      <Separator />
      <Table>
        <TableHeader>
          <CustomTableHeader TableHeadings={TableHeadings} />
        </TableHeader>

        <TableBody>
          {data.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.user.name}</TableCell>
              <TableCell>{leave.user.email}</TableCell>
              <TableCell>{leave.leaveType as LeaveType}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>
                {new Date(leave.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(leave.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <LeaveBadge status={leave.status} />
              </TableCell>
              <TableCell>{leave.requestedTo.name}</TableCell>
              <TableCell>{leave.approvedBy?.name || "N/A"}</TableCell>
              <TableCell>
                <UpdateLeave leaveData={leave} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination pagination={pagination} />
    </div>
  );
};

export default LeaveTable;
