import { Deparment, Gender } from "@/global/constent";
import z from "zod";

// 🔹 Reusable Field Validations
const nameSchema = z
  .string()
  .min(3, { message: "Name must be at least 3 characters" });
const emailSchema = z.string().email({ message: "Invalid email" });
const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" });
const departmentSchema = z.enum([
  Deparment.CSE,
  Deparment.EEE,
  Deparment.ADMIN,
]);
const genderSchema = z.enum([Gender.FEMALE, Gender.MALE]);
const addressSchema = z
  .string()
  .min(3, { message: "Address must be at least 3 characters" });
const phoneSchema = z
  .string()
  .length(10, { message: "Phone number must be exactly 10 digits" })
  .regex(/^\d+$/, { message: "Phone number must contain only digits" });

const RoleIdSchema = z.string();

// 🔹 Login Validation
export const loginValidation = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 🔹 Base Schema for User Signup & Update (Students, Admins, etc.)
const userBaseSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  department: departmentSchema,
  gender: genderSchema,
  address: addressSchema,
  phone: phoneSchema,
});

// 🔹 Signup Validation for Students
export const signupValidationStudent = userBaseSchema;

// 🔹 Admin Update Validation (If additional fields are needed, extend it)
export const adminUpdateValidation = z.object({
  ...userBaseSchema.shape,
  password: passwordSchema.optional(),

  roleId: RoleIdSchema,
});

export const adminAddUser = z.object({
  ...userBaseSchema.shape,
  roleId: RoleIdSchema,
  password: passwordSchema,
});
