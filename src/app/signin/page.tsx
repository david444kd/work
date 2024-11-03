"use client";
import { Link } from "@nextui-org/react";
import { useStackApp } from "@stackframe/stack";
import { useState } from "react";

export default function CustomCredentialSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const app = useStackApp();

  const onSubmit = async () => {
    if (!password) {
      setError("Please enter your password");
      return;
    }
    // this will redirect to app.urls.afterSignIn if successful, you can customize it in the StackServerApp constructor
    const result = await app.signInWithCredential({ email, password });
    // It is better to handle each error code separately, but we will just show the error code directly for simplicity here
    if (result.status === "error") {
      setError(result.error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center w-[30vw]">
      <h1 className="text-lg text-default-900">Sign in to your account</h1>
      <p className="text-default-900">
        Don&apos;t have an account?{" "}
        <Link className="underline text-default-900" href="/signup">
          Sign up
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
        <button className="bg-white text-black rounded-lg p-1" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}
