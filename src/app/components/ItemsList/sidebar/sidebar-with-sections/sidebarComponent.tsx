"use client";

import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  ScrollShadow,
  Spacer,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { AcmeLogo } from "./acme";
import { sectionItems } from "./sidebar-items";

import Sidebar from "./sidebar";
import { profile } from "console";

export default function SidebarComponent() {
  const [profile, setProfile] = useState(0);
  return (
    <div className="h-dvh relative top-8 w-1/5">
      <div className="fixed flex h-full w-1/5 min-w-36  flex-1 flex-col border-r-small border-divider p-6">
        <Spacer y={8} />

        <div className="flex flex-col gap-4">
          {profile ? (
            <div className="flex items-center gap-3 px-2 mb-7">
              <Avatar
                isBordered
                size="sm"
                src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              />
              <div className="flex flex-col">
                <p className="text-small font-medium text-default-600">
                  John Doe
                </p>
                <p className="text-tiny text-default-400">Product Designer</p>
              </div>
            </div>
          ) : (
            <>
              <Button className="mb-3">Profile</Button>
            </>
          )}
          {/* <Input
            fullWidth
            aria-label="search"
            className="px-1"
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
              <Icon
                className="text-default-500  [&>g]:stroke-[2px]"
                icon="solar:magnifer-linear"
                width={18}
              />
            }
          /> */}
        </div>

        <Sidebar defaultSelectedKey="home" items={sectionItems} />
        <Button className="mb-12">Launch</Button>
        <Card className="mx-2 overflow-visible" shadow="sm">
          <CardBody className="items-center py-5 text-center">
            <h3 className="text-medium font-medium text-default-700">
              Upgrade to Pro
              <span aria-label="rocket-emoji" className="ml-2" role="img">
                🚀
              </span>
            </h3>
            <p className="p-4 text-small text-default-500">
              Get 1 month free and unlock all the features of the pro plan.
            </p>
          </CardBody>
          <CardFooter className="absolute -bottom-8 justify-center">
            <Button
              className="px-10 shadow-md"
              color="primary"
              radius="full"
              variant="shadow"
            >
              Upgrade
            </Button>
          </CardFooter>
        </Card>

        <Spacer y={8} />

        {/* <div className="mt-auto flex flex-col">
          <Button
            fullWidth
            className="justify-start text-default-500 data-[hover=true]:text-foreground"
            startContent={
              <Icon
                className="text-default-500"
                icon="solar:info-circle-line-duotone"
                width={24}
              />
            }
            variant="light"
          >
            Help & Information
          </Button>
          <Button
            className="justify-start text-default-500 data-[hover=true]:text-foreground"
            startContent={
              <Icon
                className="rotate-180 text-default-500"
                icon="solar:minus-circle-line-duotone"
                width={24}
              />
            }
            variant="light"
          >
            Log Out
          </Button>
        </div> */}
      </div>
    </div>
  );
}
