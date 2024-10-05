import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";

export const PageFooter = () => {
  const date = new Date();

  return (
    <Navbar
      // maxWidth="full"
      className="flex justify-end z-40 right-0 w-3/5 h-auto items-center  data-[menu-open=true]:border-none sticky inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70 p-0"
    >
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <p>copyright {date.getFullYear()}</p>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
