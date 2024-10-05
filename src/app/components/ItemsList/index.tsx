"use client";
import Link from "next/link";
import { Select, SelectItem, Image, Spacer } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider, Pagination } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import { useState } from "react";
import { useFilter } from "../FilterContext";
import SidebarComponent from "./sidebar/sidebar-with-sections/sidebarComponent";
import { PageFooter } from "../PageFooter";

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
    <div className="grid grid-cols-5 gap-16 dark bg-background text-foreground">
      <div className="col-span-1 relative w-1/5 ">
        <SidebarComponent></SidebarComponent>
      </div>

      <div className="col-span-4  pl-16 pr-5 lg:p-10">
        <div className="w-full grid col-span-4 mt-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-10">
          {currentPosts.length > 0 ? (
            currentPosts.map((item: any) => (
              <Card key={item.id} className="p-3">
                <CardHeader className="flex flex-col gap-3 ">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl w-96 h-48"
                    src={item.img}
                  />
                  <div className="flex flex-col w-full">
                    <p className="text-md">{item.title}</p>
                    {/* <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-small text-blue-300"
                    >
                      {item.link}
                    </a> */}
                  </div>
                </CardHeader>
                {/* <Divider /> */}
                <CardBody>
                  <p className="trim-text text-xs text-default-400">
                    {item.text}
                  </p>
                </CardBody>
                <CardFooter className="flex items-center justify-end">
                  {/* <Chip>{item.category}</Chip> */}
                  <Link href={`details/${item.id}`}>
                    <Button size="sm" color="primary" className="rounded-xl">
                      details
                    </Button>
                  </Link>
                </CardFooter>
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
        {/* <div className="justify-end bottom-0">
          <PageFooter></PageFooter>
        </div> */}
      </div>
    </div>
  );
};
