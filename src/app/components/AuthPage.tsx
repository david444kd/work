"use client";
import { usePathname } from "next/navigation";
import CustomCredentialSignIn from "../signin/page";
import CustomCredentialSignUp from "../signup/page";
import { SignIn, SignUp } from "@stackframe/stack";
import MyAccountPage from "../account/page";

const AuthPage = () => {
  const path = usePathname();
  // if (path === "/signup") {
  //   return <CustomCredentialSignUp />;
  // } else if (path === "/account") {
  //   return <MyAccountPage />;
  // } else {
  //   return <CustomCredentialSignIn />;
  // }

  if (path === "/signup") {
    return <CustomCredentialSignUp />;
  } else {
    return <CustomCredentialSignIn />;
  }
};

export default AuthPage;
