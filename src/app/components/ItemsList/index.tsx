"use client";
import Link from "next/link";
import { Select, SelectItem, Image } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider, Pagination } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import { useState } from "react";
import { useFilter } from "../FilterContext";

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
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 dark bg-background text-foreground">
      <div className="col-span-1">{/* <SaidBar></SaidBar> */}</div>

      <div className="col-span-1 lg:col-span-4">
        <div className="grid col-span-4 mt-28">
          <div className="flex flex-wrap mb-10">
            {/* Тут могут быть Select элементы для фильтров */}
          </div>
        </div>

        <div className="grid col-span-4 grid-cols-1 xl:grid-cols-3 gap-10">
          {currentPosts.length > 0 ? (
            currentPosts.map((item: any) => (
              <Card key={item.id} className="p-3" isBlurred>
                <CardHeader className="flex flex-col gap-3 ">
                  <Image
                    isZoomed
                    alt="Card background"
                    className="object-cover rounded-xl w-96 h-48"
                    src={item.img}
                  />
                  <div className="flex flex-col w-full">
                    <p className="text-md">{item.title}</p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-small text-blue-300"
                    >
                      {item.link}
                    </a>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="trim-text text-xs text-gray-300">{item.text}</p>
                </CardBody>
                <CardFooter className="flex gap-2 items-center justify-end">
                  <Chip>{item.category}</Chip>
                  <Link href={`details/${item.id}`}>
                    <Button size="sm" color="primary">
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
        <div className="col-span-3">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={(page) => setCurrentPage(page)}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};
