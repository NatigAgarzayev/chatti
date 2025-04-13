import { redirect } from "next/navigation";
import { auth } from '@clerk/nextjs/server';

export default async function Index() {

  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    redirect("/sign-in")
    // return null
  }
  else {
    redirect("/dashboard/habits")
  }
}