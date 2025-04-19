import { getCookie } from "@/global/getCookie";

// lib/custom-fetch.ts
interface CustomFetchProps {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: object;
}

export async function customFetch<T>({
  url,
  method = "GET",
  body,
}: CustomFetchProps): Promise<T> {
  const token = await getCookie("token");
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      token: token || "",
    },
    ...(body && { body: JSON.stringify(body) }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
  return res.json();
}
