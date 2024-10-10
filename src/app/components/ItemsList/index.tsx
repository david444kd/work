"use client";
import Link from "next/link";
import { Select, SelectItem, Image, Spacer } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider, Pagination, Switch } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import { useState } from "react";
import { useFilter } from "../FilterContext";
import SidebarComponent from "./sidebar/sidebar-with-sections/sidebarComponent";
import { PageFooter } from "../PageFooter";
import SideBar2 from "../SideBar2";
import Zombie from "../icons/zombie";
import Notion from "../icons/notion";
import Discord from "../icons/discord";
import { PageHeader } from "../PageHeader";
import Header from "./navigation-header-with-brand-colors/header";
export const ItemsList = ({ data }: { data: any[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  const { filteredData } = useFilter();

  const safeFilteredData = filteredData || [];

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = (
    safeFilteredData.length > 0 ? safeFilteredData : data
  ).slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(
    (safeFilteredData.length > 0 ? safeFilteredData.length : data.length) /
      postsPerPage
  );

  return (
    <>
      <Header></Header>
      <div
        id="itemlist"
        className="grid grid-cols-3 gap-16 dark bg-background text-foreground w-[80%]"
      >
        <div className="col-span-3 pr-5 md:p-10">
          <div className="w-full grid col-span-4 mt-16 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-6">
            {currentPosts.length > 0 ? (
              currentPosts.map((item: any) => (
                <Card
                  key={item.id}
                  className="hover:shadow-lg hover:shadow-gray-600 hover:transition-all hover:w-[101%] hover:h-[101%] "
                >
                  <Link href={"/details/" + item.id} className="p-3 h-full">
                    <CardHeader className="flex flex-col gap-3 ">
                      <div className="flex w-full items-center justify-between mb-1">
                        <div className="flex gap-3 items-center">
                          <Image
                            className="w-10 h-10"
                            alt="CompanyImage"
                            src={item.imgTitle}
                          ></Image>
                          <div>
                            <p className="text-md">Brooklyn simons</p>
                            <p className="text-xs text-default-400">
                              0 x 123...4567
                            </p>
                          </div>
                        </div>
                        <Image
                          className="w-7 h-7 bg-white"
                          alt="image"
                          src={item.notion}
                        ></Image>
                      </div>
                      <Image
                        alt="Card background"
                        className="object-cover rounded-xl w-96 h-48"
                        src={item.img}
                      />
                      <div className="flex flex-col w-full">
                        <p className="text-md">{item.title}</p>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <p className="trim-text text-xs text-default-400">
                        {item.text}
                      </p>
                    </CardBody>
                  </Link>
                </Card>
              ))
            ) : (
              <p>No data available.</p>
            )}
          </div>
          <div className="col-span-4 mt-10">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={(page) => setCurrentPage(page)}
              color="primary"
            />
          </div>
        </div>
      </div>
    </>
  );
};
