import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarBrand,
  Button,
} from "@nextui-org/react";

import Header from "./ItemsList/navigation-header-with-brand-colors/header";
export const PageHeader = () => {
  return (
    <div className="w-screen flex items-start justify-center">
      <Header></Header>
    </div>
  );
};
