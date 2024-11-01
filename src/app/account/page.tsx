import React from "react";

import { AccountSettings } from "@stackframe/stack";
import { Link } from "@nextui-org/react";
export default function MyAccountPage() {
  return (
    <div className="w-screen h-screen bg-black z-50">
      <Link href="/">Go home</Link>
      <AccountSettings
        fullPage={true}
        //   extraItems={[
        //     {
        //       title: "Custom Section",
        //       icon: CustomLucideIcon,
        //       content: <CustomContent />,
        //     },
        //   ]}
      />
    </div>
  );
}
