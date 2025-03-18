import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="flex gap-6 p-6 ">
        <Link href="/login">
          <Button className="px-6 py-3 text-lg " variant={"outline"}>
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="px-6 py-3 text-lg ">Signup</Button>
        </Link>
      </div>
    </div>
  );
}
