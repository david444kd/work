import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Divider,
} from "@nextui-org/react";
import Twitter from "./icons/twitter";
import Telegram from "./icons/telegram";
import Discord from "./icons/discord";
import Github from "./icons/github";
export const PageFooter = () => {
  const date = new Date();

  return (
    <>
      <div
        id="footer"
        // maxWidth="full"
        className="flex h-64 z-40 mt-48 md:mt-40 lg:mt-10 right-0    items-center  data-[menu-open=true]:border-none relative pt-[100%] inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70 sm:m-0 m-[20%] sm:p-[3%]"
      >
        <div className="w-full">
          <Divider></Divider>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 my-10">
            {/* <p>copyright {date.getFullYear()}</p> */}
            <div className="col-span-1 md:col-span-3 flex-col justify-center flex md:mb-0 mb-6">
              <p className="text-lg">Fusion</p>
              <p className="text-sm text-default-400">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Doloremque, perferendis.
              </p>
              <div className="flex items-center gap-2">
                <Link href="#">
                  <Twitter />
                </Link>
                <Link href="#">
                  <Telegram />
                </Link>
                <Link href="#">
                  <Discord />
                </Link>
                <Link href="#">
                  <Github />
                </Link>
              </div>
            </div>

            <div className="col-span-1 flex-col">
              <p className="text-sm p-1">Services</p>
              <p className="text-sm text-default-400 p-1">Branding</p>
              <p className="text-sm text-default-400 p-1">Data Analysis</p>
              <p className="text-sm text-default-400 p-1">
                E-commerce Solutions
              </p>
              <p className="text-sm text-default-400 p-1">Market Research</p>
            </div>
            <div className="col-span-1 flex-col">
              <p className="text-sm p-1">Services</p>
              <p className="text-sm text-default-400 p-1">Branding</p>
              <p className="text-sm text-default-400 p-1">Data Analysis</p>
              <p className="text-sm text-default-400 p-1">
                E-commerce Solutions
              </p>
              <p className="text-sm text-default-400 p-1">Market Research</p>
            </div>
            <div className="col-span-1 flex-col">
              <p className="text-sm p-1">Services</p>
              <p className="text-sm text-default-400 p-1">Branding</p>
              <p className="text-sm text-default-400 p-1">Data Analysis</p>
              <p className="text-sm text-default-400 p-1">
                E-commerce Solutions
              </p>
              <p className="text-sm text-default-400 p-1">Market Research</p>
            </div>
          </div>
          <Divider></Divider>
          <div className="col-span-6 flex justify-around  md:px-[20%] py-5">
            <p className="text-sm text-default-400">
              {date.getFullYear()} Acme Inc. All rights reserved.
            </p>
            <p className="text-sm text-default-400">Community guidelines</p>
            <p className="text-sm text-default-400">Terms</p>
            <p className="text-sm text-default-400">Privacy policy</p>
          </div>
        </div>
      </div>
    </>
  );
};
