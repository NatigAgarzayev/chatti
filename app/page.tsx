import { getUserData } from "@/api/auth";
import { Store } from "@/types";
import { redirect } from "next/navigation";
import { create } from 'zustand'


export default async function Index() {

  const userData = await getUserData()

  if (!userData) {
    redirect("/login")
  }
  else {
    redirect("/dashboard/main")
  }

}