import {Navbar, NavbarContent, NavbarItem, Link} from "@nextui-org/react";

export const PageFooter = () => {

    const date = new Date();

    return (
        <Navbar
        maxWidth="full"
        className="flex z-40 max-w-none w-full h-auto items-center justify-center data-[menu-open=true]:border-none sticky top-0 inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <p>copyright {date.getFullYear()}</p>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    )
}