import { getUserData } from "@/api/auth";
import { redirect } from "next/navigation";


export default async function Index() {

  const userData = await getUserData()

  if (!userData) {
    // redirect("/login")
  }
  else {
    redirect("/dashboard/main")
  }

}