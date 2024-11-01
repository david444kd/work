"use client";

import { useStackApp } from "@stackframe/stack";
import { useState } from "react";
import { Link } from "@nextui-org/react";

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
    <div className="flex flex-col gap-3 justify-center items-center w-[30vw]">
      <h1 className="text-lg">Sign up to your account</h1>
      <p>
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
        {error}
        <p className="text-xs">Email</p>
        <input
          type="email"
          className="p-4 rounded-lg px-6"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-xs">Password</p>
        <input
          type="password"
          className="p-4 rounded-lg px-6"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-white text-black rounded-lg p-1" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
