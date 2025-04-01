/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { getCookie } from "@/global/getCookie";
import { applyLeaveValidation } from "@/lib/validations/applyLeaveValidation";
import { Pen, Loader2 } from "lucide-react"; // Import spinner icon

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Deparment, LeaveType } from "@/global/constent";
import { useRouter } from "next/navigation";
import { LeaveSchema } from "../../../..";
import { Input } from "@/components/ui/input";

interface Teacher {
  id: string;
  name: string;
}

const EditLeave = ({ myLeave }: { myLeave: LeaveSchema }) => {
  const router = useRouter();
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof applyLeaveValidation>>({
    resolver: zodResolver(applyLeaveValidation),
    defaultValues: {
      startDate: myLeave.startDate.split("T")[0],
      endDate: myLeave.endDate.split("T")[0],
      leaveType: myLeave.leaveType,
      reason: myLeave.reason,
      requestedTo: myLeave.requestedTo.id,
    },
  });

  useEffect(() => {
    form.reset({
      startDate: myLeave.startDate.split("T")[0],
      endDate: myLeave.endDate.split("T")[0],
      leaveType: myLeave.leaveType,
      reason: myLeave.reason,
      requestedTo: myLeave.requestedTo.id,
    });
  }, [myLeave, form]);

  const getAllTeachers = async () => {
    setLoadingTeachers(true);
    try {
      const token = await getCookie("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/staff`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const gotTeachers = await res.json();
      setAllTeachers(gotTeachers.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoadingTeachers(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof applyLeaveValidation>) => {
    setLoadingSubmit(true);
    try {
      console.log("update request submitted:", data);

      const token = await getCookie("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/edit-leave/${myLeave.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );
      const response = await res.json();
      console.log("update request submitted:", response);

      // Reset form and close modal
      form.reset();
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error submitting leave request:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" onClick={getAllTeachers}>
            <Pen />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[505px]">
          <DialogHeader>
            <DialogTitle>Edit Leave Request</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Reason Field */}
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter reason" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Start & End Date Fields */}
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <input
                            type="date"
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-full border rounded px-2 py-1"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <input
                            type="date"
                            {...field}
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="w-full border rounded px-2 py-1"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Requested To Field with Loading */}
                <FormField
                  control={form.control}
                  name="requestedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Request To</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue
                              placeholder={
                                loadingTeachers
                                  ? "Loading..."
                                  : myLeave.requestedTo.name
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {loadingTeachers ? (
                            <div className="p-4 flex justify-center">
                              <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
                            </div>
                          ) : (
                            <SelectGroup>
                              {allTeachers.map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.id}>
                                  {teacher.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Leave Type Field */}
                <FormField
                  control={form.control}
                  name="leaveType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leave Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Leave Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={LeaveType.HALF_DAY}>
                              HALF DAY
                            </SelectItem>
                            <SelectItem value={LeaveType.FULL_DAY}>
                              FULL DAY
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit & Cancel Buttons */}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loadingSubmit}>
                    {loadingSubmit ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      "Submit Leave Request"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditLeave;
