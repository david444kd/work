"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  Tab,
  AvatarGroup,
  Avatar,
  Chip,
  Tooltip,
  ScrollShadow,
  Divider,
  Breadcrumbs,
  BreadcrumbItem,
  Input,
  Badge,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { AcmeIcon } from "./social";

import NotificationsCard from "./notifications-card";

export default function Component() {
  return (
    <div className="w-full">
      <Navbar
        classNames={{
          base: "bg-primary",
          wrapper: "px-4 sm:px-6",
          item: "data-[active=true]:text-primary",
        }}
        className="px-10"
        height="64px"
        maxWidth="full"
      >
        <NavbarBrand>
          <NavbarMenuToggle className="mr-2 h-6 sm:hidden" />
          <AcmeIcon />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent justify="start">
          <NavbarItem>
            <p>gfj</p>
          </NavbarItem>
        </NavbarContent>

        {/* Right Menu */}
        <NavbarContent
          className="ml-auto h-12 max-w-fit items-center gap-0"
          justify="end"
        >
          <NavbarItem className="hidden lg:flex">
            <Button isIconOnly radius="full" variant="light">
              <Icon
                className="text-primary-foreground/60"
                icon="solar:settings-linear"
                width={24}
              />
            </Button>
          </NavbarItem>
          <NavbarItem className="px-2">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="mt-1 h-8 w-8 transition-transform">
                  <Badge
                    classNames={{
                      badge: "border-primary",
                    }}
                    color="success"
                    content=""
                    placement="bottom-right"
                    shape="circle"
                  >
                    <Avatar
                      size="sm"
                      src="https://i.pravatar.cc/150?u=a04258114e29526708c"
                    />
                  </Badge>
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">johndoe@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="#">
              Dashboard
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem isActive>
            <Link
              aria-current="page"
              className="w-full"
              color="primary"
              href="#"
            >
              Deployments
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="#">
              Analytics
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="#">
              Team
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link className="w-full" color="foreground" href="#">
              Settings
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
