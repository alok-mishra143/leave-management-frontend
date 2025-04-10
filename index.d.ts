import { Deparment, Gender, LeaveStatus, LeaveType } from "@/global/constent";

interface userCookieInterface {
  id: string;
  role: string;
  image: string;
  name: string;
  email: string;
  roleId: string;
  iat: number;
  exp: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  department: Deparment.ADMIN | Deparment.CSE | Deparment.EEE;
  gender: Gender.FEMALE | Gender.MALE;
  phone: string;
  image: string;
  roleId: string;
  address: string;
}

type UserSettingsProps = Omit<User, "status" | "role"> & {
  role: {
    id: string;
    name: string;
  };
};
interface AllUsersProps {
  message: string;
  data: User[];
  pagination: pagination;
}

interface pagination {
  total: number;
  limit: number;
  page: number;
}

interface leaveRequestapplyProps {
  id: string;
  user: {
    name: string;
    email: string;
  };
  requestedTo: {
    name: string;
    email: string;
  };
  approvedBy: {
    name: string;
    email: string;
  } | null;

  status: LeaveStatus.PENDING | LeaveStatus.APPROVED | LeaveStatus.REJECTED;
  reason: string;
  startDate: string;
  endDate: string;
  leaveType: LeaveType.FULL_DAY | LeaveType.HALF_DAY;
}

interface leaveRequestsProps {
  pagination: pagination;
  data: leaveRequestapplyProps[];
}

export interface LeaveSchema {
  id: string;
  requestedTo: { name: string; id: string };
  approvedBy?: { name: string } | null;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  leaveType: LeaveType;
  reason: string;
  createdAt: string;
}

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}
interface BlogsProps {
  data: BlogCardProps[];
  pagination: pagination;
}
