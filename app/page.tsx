import { redirect } from "next/navigation";
import { auth } from '@clerk/nextjs/server';

export default async function Index() {

  const { userId }: { userId: string | null } = auth();

  console.log(userId)

  if (!userId) {
    redirect("/sign-in")
  }
  else {
    redirect("/dashboard/habits")
  }
}