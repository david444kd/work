"use client";

import { useStackApp } from "@stackframe/stack";
import { useState } from "react";
import { Button, Link } from "@nextui-org/react";

export default function CustomCredentialSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const app = useStackApp();

  const onSubmit = async () => {
    if (!password) {
      setError("Please enter your password");
      return;
    }
    // this will redirect to app.urls.afterSignUp if successful, you can customize it in the StackServerApp constructor
    const result = await app.signUpWithCredential({ email, password });
    // It is better to handle each error code separately, but we will just show the error code directly for simplicity here
    if (result.status === "error") {
      setError(result.error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center min-w-[300px]">
      <h1 className="text-lg text-default-900">Sign up to your account</h1>
      <p className="text-default-900">
        You have an account?{" "}
        <Link className="underline text-default-900" href="/signin">
          Sign In
        </Link>
      </p>
      <form
        className="flex flex-col gap-4 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {error ? <p className="text-red-600">{error}</p> : undefined}
        <p className="text-xs text-default-900">Email</p>
        <input
          type="email"
          className="p-4 rounded-lg px-6 text-default-900"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-xs text-default-900">Password</p>
        <input
          type="password"
          className="p-4 rounded-lg px-6 text-default-900"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
