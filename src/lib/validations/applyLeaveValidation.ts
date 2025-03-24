import { LeaveType } from "@/global/constent";
import z from "zod";

export const applyLeaveValidation = z
  .object({
    reason: z.string().min(5, "Reason must be at least 5 characters long"),
    startDate: z
      .string()
      .nonempty("Start date is required.")
      .transform((date) => new Date(date).toISOString()),
    endDate: z
      .string()
      .nonempty("End date is required.")
      .transform((date) => new Date(date).toISOString()),

    leaveType: z.nativeEnum(LeaveType, {
      errorMap: () => ({ message: "Invalid leave type selected." }),
    }),
    requestedTo: z.string().min(1, "Requested To field is required."),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: "Start date must be less than end date.",
    path: ["endDate"],
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: "Start date must be less than end date.",
    path: ["startDate"],
  });
