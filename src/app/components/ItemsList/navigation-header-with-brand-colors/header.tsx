"use client";
import React, { useEffect, useState } from "react";
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
  Avatar,
  Badge,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { AcmeIcon } from "./social";
import { useFilter } from "../../FilterContext";
import { data } from "../../../data";

export default function Header() {
  const [countries, setCountries] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);

  const { setFilteredData } = useFilter();
  const { activeCountry, setActiveCountry } = useFilter();
  const { activeCategory, setActiveCategory } = useFilter();
  const { activeType, setActiveType } = useFilter();
  const { activeCompany, setActiveCompany } = useFilter();

  useEffect(() => {
    const hash = {
      country: [] as string[],
      category: [] as string[],
      type: [] as string[],
      company: [] as string[],
    };

    data.forEach((el: any) => {
      if (el.country && !hash.country.includes(el.country)) {
        hash.country.push(el.country as string);
      }
      if (el.category && !hash.category.includes(el.category)) {
        hash.category.push(el.category as string);
      }
      if (el.type && !hash.type.includes(el.type)) {
        hash.type.push(el.type as string);
      }
      if (el.company && !hash.company.includes(el.company)) {
        hash.company.push(el.company as string);
      }
    });

    setCountries(hash.country);
    setCategories(hash.category);
    setTypes(hash.type);
    setCompanies(hash.company);
  }, []);

  const changeValue = (value: string, type: string) => {
    let currentCountry = activeCountry;
    let currentCategory = activeCategory;
    let currentType = activeType;
    let currentCompany = activeCompany;

    if (type === "country") {
      setActiveCountry(value);
      currentCountry = value;
    }

    if (type === "category") {
      setActiveCategory(value);
      currentCategory = value;
    }

    if (type === "type") {
      setActiveType(value);
      currentType = value;
    }

    if (type === "company") {
      setActiveCompany(value);
      currentCompany = value;
    }

    const newData = data
      .filter((element: any) => {
        return (
          element.category === currentCategory ||
          element.company === currentCompany ||
          element.country === currentCountry ||
          element.type === currentType
        );
      })
      .map((element: any) => ({
        ...element,
        author: element.author ?? "Unknown Author",
        date: element.date ?? "Unknown Date",
      }));

    setFilteredData(newData);
  };

  return (
    <div className="w-full fixed z-50">
      <Navbar
        classNames={{
          // base: "bg-primary",
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
          <NavbarItem className="flex gap-4">
            {countries.length > 1 &&
              countries.map((country) => (
                <Button
                  key={country}
                  color={activeCountry === country ? "primary" : "default"}
                  onPress={() => changeValue(country, "country")}
                >
                  {country}
                </Button>
              ))}

            {categories.length > 1 &&
              categories.map((category) => (
                <Button
                  key={category}
                  color={activeCategory === category ? "primary" : "default"}
                  onPress={() => changeValue(category, "category")}
                >
                  {category}
                </Button>
              ))}

            {types.length > 1 &&
              types.map((type) => (
                <Button
                  key={type}
                  color={activeType === type ? "primary" : "default"}
                  onPress={() => changeValue(type, "type")}
                >
                  {type}
                </Button>
              ))}

            {companies.length > 1 &&
              companies.map((company) => (
                <Button
                  key={company}
                  color={activeCompany === company ? "primary" : "default"}
                  onPress={() => changeValue(company, "company")}
                >
                  {company}
                </Button>
              ))}
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
