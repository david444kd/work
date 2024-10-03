import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarBrand,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "../components/AcmeLogo.";
import App from "../components/ItemsList/navigation-header-with-brand-colors/App";
export const PageHeader = () => {
  return (
    <div className="w-screen flex items-start justify-center">
      <App></App>
      {/* <Navbar
        maxWidth="full"
        className="flex h-24 z-50 max-w-none w-full  items-center justify-center data-[menu-open=true]:border-none fixed top-0 inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70"
      >
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit text-white">ACME</p>
        </NavbarBrand>
        <NavbarContent
          className="hidden sm:flex gap-4 bg-zinc-900 border-slate-800 border-solid border-2 rounded-3xl pl-8 pr-8 "
          justify="center"
        >
          <NavbarItem>
            <Link className="text-gray-400" href="#">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-gray-400" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white" href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-gray-400" href="#">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-gray-400" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link color="foreground" href="#">
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              href="#"
              className="bg-purple-950 border-2 border-purple-900"
              variant="flat"
            >
              Start Free Trial
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar> */}
    </div>
  );
};
