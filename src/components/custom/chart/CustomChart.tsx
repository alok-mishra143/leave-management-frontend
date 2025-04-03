/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GenerateReport from "./GenerateReport";

interface LeaveData {
  userId: string;
  department: string;
  role: string;
  name: string;
  usedLeaves: number;
  totalLeaves: number;
}

const chartConfig: ChartConfig = {
  usedLeaves: {
    label: "Used Leaves",
    color: "var(--chart-1)",
  },
  totalLeaves: {
    label: "Total Leaves",
    color: "var(--chart-2)",
  },
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2 bg-gray-900 text-white shadow-md rounded-md text-sm border border-gray-700">
        <p className="font-bold">{data.name}</p>
        <p className="opacity-80">Department: {data.department}</p>
        <p className="opacity-80">Role: {data.role}</p>
        <p className="text-chart-1">Used Leaves: {data.usedLeaves}</p>
        <p className="text-chart-2">Total Leaves: {data.totalLeaves}</p>
      </div>
    );
  }
  return null;
};

export function LeaveChartComponent({ leaveData }: { leaveData: LeaveData[] }) {
  const [selectedDepartment, setSelectedDepartment] =
    React.useState<string>("ALL");
  const [selectedRole, setSelectedRole] = React.useState<string>("ALL");

  const filteredData = leaveData.filter(
    (data) =>
      (selectedDepartment === "ALL" ||
        data.department === selectedDepartment) &&
      (selectedRole === "ALL" || data.role === selectedRole)
  );

  return (
    <>
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Leave Chart</CardTitle>
            <CardDescription>
              Used vs. Total Leaves by Department & Role
            </CardDescription>
          </div>
          <div className="flex gap-4">
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger
                className="w-[160px] rounded-lg"
                aria-label="Select a department"
              >
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="ALL" className="rounded-lg">
                  All Departments
                </SelectItem>
                <SelectItem value="CSE" className="rounded-lg">
                  CSE
                </SelectItem>
                <SelectItem value="EEE" className="rounded-lg">
                  EEE
                </SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger
                className="w-[160px] rounded-lg"
                aria-label="Select a role"
              >
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="ALL" className="rounded-lg">
                  All Roles
                </SelectItem>
                <SelectItem value="STUDENT" className="rounded-lg">
                  Student
                </SelectItem>
                <SelectItem value="STAFF" className="rounded-lg">
                  Staff
                </SelectItem>
                <SelectItem value="HOD" className="rounded-lg">
                  HOD
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                dataKey="usedLeaves"
                type="natural"
                fill="var(--chart-1)"
                stroke="var(--chart-1)"
              />

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <GenerateReport leaveData={filteredData} />
    </>
  );
}
