import { Deparment, Gender } from "@/global/constent";

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
interface Response {
  message: string;
  data: User[];
  pagination: pagination;
}

interface pagination {
  total: number;
  limit: number;
  page: number;
}
