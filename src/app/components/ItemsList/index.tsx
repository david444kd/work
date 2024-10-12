"use client";
import Link from "next/link";
import { Image } from "@nextui-org/react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Pagination } from "@nextui-org/react";

import { useState } from "react";
import { useFilter } from "../FilterContext";

import Header from "./navigation-header-with-brand-colors/header";
export const ItemsList = ({ data }: { data: any[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const PostsPerPage = 12;

  const { filteredData } = useFilter();
  const { activeCountry } = useFilter();

  const safeFilteredData = filteredData || [];

  const lastPostIndex = currentPage * PostsPerPage;
  const firstPostIndex = lastPostIndex - PostsPerPage;

  const currentPosts = (
    safeFilteredData.length > 0 ? safeFilteredData : data
  ).slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(
    (safeFilteredData.length > 0 ? safeFilteredData.length : data.length) /
      PostsPerPage
  );
  const FivePages = data.slice(0, 5);
  console.log(FivePages);

  return (
    <>
      <Header></Header>
      <div
        id="itemlist"
        className="grid grid-cols-1 gap-16 dark bg-background text-foreground w-[80%]"
      >
        <div className="mt-24 ml-10 flex flex-col gap-6 col-span-1">
          <h1 className="text-4xl">
            {activeCountry ? activeCountry : "All categories"}
          </h1>
          <h2 className="text-2xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae,
            recusandae?
          </h2>
        </div>
        <div className="md:ml-10 md:mr-10 mr-3">
          {FivePages.length > 0 ? (
            FivePages.map((item: any) => (
              <Card
                key={item.id}
                shadow="none"
                className="mt-2 justify-center h-[20vw] sm:h-[10] md:h-[5vw] xl:h-[3vw]"
              >
                <Link href={"/details/" + item.id}>
                  <div className="grid grid-cols-12 items-center">
                    <div className="grid justify-center col-span-1 items-center  mr-3 sm:pr-0">
                      <Image
                        className="object-cover rounded-xl w-16 h-10"
                        alt="CompanyImage"
                        src={item.img}
                      />
                    </div>
                    <p className="text-md col-span-11">{item.title}</p>
                  </div>
                </Link>
              </Card>
            ))
          ) : (
            <p>No data</p>
          )}
        </div>
        <div className="col-span-1 pr-5 md:pb-10 md:pr-10 md:pl-10">
          <div className="w-full grid col-span-1  grid-cols-1  gap-3 lg:gap-6">
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
                            <p className="text-md">{item.nearImgTitle}</p>
                            <p className="text-xs text-default-400">
                              {item.nearImgText}
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
