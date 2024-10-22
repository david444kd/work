"use client";
import Link from "next/link";
import { Image } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

import {
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { use, useEffect, useState } from "react";
import { useFilter } from "../FilterContext";

import Header from "./navigation-header-with-brand-colors/header";
export const ItemsList = ({ data }: { data: any[] }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="text-black">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div
        id="itemlist"
        className="grid grid-cols-1 gap-7 dark bg-background text-foreground w-[83%] md:w-[59%] md:mr-[20%]"
      >
        <div className="mt-24 ml-10 flex flex-col gap-4 col-span-1">
          <h1 className="text-4xl font-bold">
            {activeCountry ? activeCountry : "All categories"}
          </h1>
          <h2 className="text-xl text-default-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae,
            recusandae?
          </h2>
        </div>
        <div className="md:ml-10 md:mr-10 mr-3">
          <Card className="gap-6 p-3 border border-default-200" shadow="none">
            {FivePages.length > 0 ? (
              FivePages.map((item: any) => (
                <Link href={"/details/" + item.id} key={item.id}>
                  <div className="grid grid-cols-12 items-center">
                    <div className="grid justify-center col-span-1 items-center  sm:pr-0 md:pl-0 pl-6 ">
                      <Image
                        className="object-cover w-10 h-10 min-w-10 min-h-10 rounded-none mr-3"
                        alt="CompanyImage"
                        src={item.imgTitle}
                      />
                    </div>
                    <p className="text-md col-span-11 md:pl-0 pl-5">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p>No data</p>
            )}
          </Card>
        </div>
        <div className="col-span-1 pr-5 md:pb-10 md:pr-10 md:pl-10">
          <div className="w-full grid col-span-1  grid-cols-1  gap-3 lg:gap-6">
            {currentPosts.length > 0 ? (
              currentPosts.map((item: any) => (
                <Card
                  key={item.id}
                  className="hover:bg-default-200 border border-default-200"
                  shadow="none"
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
                        className="object-cover rounded-xl w-[100vw] h-[20vw]"
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

      <div className="overflow-visible hidden md:grid w-[18%] mr-5  mt-24 fixed z-50">
        <Button
          className=" flex flex-col bg-default-50 justify-start items-center h-full w-full px-0"
          onPress={onOpen}
        >
          <Image
            src="https://insidefmcg.com.au/wp-content/uploads/2021/03/Venchi-London-store.jpg"
            className="h-[20vw] min-w-[100%] object-cover"
          />

          {/* <CardFooter className="absolute -bottom-8 justify-center">
          <Button
            className="px-10 shadow-md"
            color="primary"
            radius="full"
            variant="shadow"
            onPress={onOpen}
          >
            Upgrade
          </Button>
        </CardFooter> */}
        </Button>
        <div>
          <p className="text-default-900">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
            reprehenderit ab aspernatur tempore quo molestias corporis aliquam
            beatae unde corrupti deserunt id enim at totam expedita, veniam
            numquam sed delectus.
          </p>
        </div>
      </div>
    </>
  );
};
