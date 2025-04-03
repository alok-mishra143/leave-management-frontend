"use client";

import React from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";

interface LeaveData {
  userId: string;
  department: string;
  role: string;
  name: string;
  usedLeaves: number;
  totalLeaves: number;
}

const GenerateReport = ({ leaveData }: { leaveData: LeaveData[] }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Leave Report", 14, 10);

    autoTable(doc, {
      head: [["Name", "Department", "Role", "Used Leaves", "Total Leaves"]],
      body: leaveData.map((leave) => [
        leave.name,
        leave.department,
        leave.role,
        leave.usedLeaves,
        leave.totalLeaves,
      ]),
      startY: 20,
    });

    doc.save("leave_report.pdf");
  };

  return (
    <div className="flex justify-center mt-4">
      <Button onClick={() => generatePDF()}>Generate Report</Button>
    </div>
  );
};

export default GenerateReport;
