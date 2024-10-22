'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button  className="bg-black text-white m-3 px-6 py-2 rounded-[20px] border-black" onClick={() => signIn()}>Sign in</button>
    </>
  )
}