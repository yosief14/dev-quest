'use server'
import { signOut } from "@/auth"

export async function signOutSevice(){
  signOut({redirectTo:'/'})
}

