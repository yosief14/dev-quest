'use client'
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
export default function SignOutButton() {
  return (
    <Button
      className="text-white hover:text-red-500"
      onClick={() => {
        signOut()
      }}>
      Sign Out
    </Button>
  )
}
