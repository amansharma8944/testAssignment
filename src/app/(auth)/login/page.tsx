"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import GoogleButton from 'react-google-button'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-4">
      <GoogleButton onClick={() => signIn("google")}>
        Sign in with Google
      </GoogleButton>

      {/* <Button onClick={() => signIn("github")}>
        Sign in with GitHub
      </Button> */}
    </div>
  );
}