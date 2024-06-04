import { getUserData } from "@/api/auth";
import { redirect } from "next/navigation";

export default async function Index() {

  const userData = await getUserData()
  // console.log("user_data = ", userData)

  if (!userData) {
    return redirect("/login")
  }
  else {
    return redirect("/dashboard/main")
  }

}
