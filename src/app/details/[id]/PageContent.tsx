"use client";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Link as NextUiLink,
  Button,
} from "@nextui-org/react";

import { Chip } from "@nextui-org/chip";
import Discord from "@/app/components/icons/discord";
import Location from "@/app/components/icons/location";
export const PageContent = ({ pageData }: any) => {
  console.log(pageData?.text?.split("/") || []);

  return (
    <div className="flex justify-start w-[80%] sm:pl-10 mt-10">
      <div className="sm:w-[71%] w-[90%] pl-9 p-7">
        <div className="flex flex-col gap-8 mb-5">
          {/* <Link
            href="/"
            className="text-xl hover:underline hover:opacity-75 text-black"
          >
            Home
            <HomeOutlined className="pl-5" />
          </Link>
          <h1 className="text-2xl text-black">{pageData.title}</h1> */}
        </div>
        <Card className="p-8 mb-6">
          <div className="flex w-full flex-col gap-4 mb-5">
            <div className="relative mb-6 lg:mb-16">
              <Image
                alt="Card background"
                className="object-cover rounded-xl w-[100vw] h-[20vw]"
                src={pageData.img}
              />
              <Image
                src={pageData.imgTitle}
                alt="imageTitle"
                className="xl:w-40 xl:h-40 lg:w-32 lg:h-32 w-20 h-20 absolute z-50 max-w-[100vw] -bottom-6 sm:-bottom-8   lg:-bottom-20" // Добавляем абсолютное позиционирование
              />
            </div>

            <h1 className="text-2xl">{pageData.title}</h1>
            <div className="flex gap-4 text-default-600">
              <p>{pageData.author}</p>
              <p>{pageData.date}</p>
              <NextUiLink
                href={pageData.link}
                target="_blank"
                className="hover:underline"
              >
                Website
              </NextUiLink>
            </div>

            <div className=" flex flex-col gap-4">
              {/* <Chip color="primary">{pageData.type}</Chip> */}

              <div className="flex items-center text-default-700 text-sm">
                <Location />
                <p>{pageData.country}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-default-400">{pageData.text}</p>
            </div>
          </div>
        </Card>

        <Card className="p-8">
          <CardHeader className="flex flex-col gap-3 ">
            <div className="flex w-full items-center justify-between mb-1">
              <div className="flex gap-3 items-center">
                <Image
                  className="w-10 h-10"
                  alt="imageTitle"
                  src={pageData.imgTitle}
                ></Image>
                <div>
                  <p className="text-md">Brooklyn simons</p>
                  <p className="text-xs text-default-400">0 x 123...4567</p>
                </div>
              </div>
              <Image
                alt="notionImage"
                className="w-7 h-7 bg-white"
                src={pageData.notion}
              ></Image>
            </div>
          </CardHeader>
          {/* <Divider /> */}
          <CardBody>
            <p className="trim-text text-xs text-default-400">
              {pageData.text}
            </p>
          </CardBody>
          <CardFooter className="flex  items-center justify-start gap-3 pt-0">
            <Discord></Discord>
          </CardFooter>
        </Card>
      </div>

      <div className="pt-12 w-[24%] fixed right-0 pr-28 hidden md:grid">
        <Card className="w-full mb-10">
          <CardHeader className="flex flex-col gap-3 ">
            <div className="flex w-full items-center justify-between mb-1">
              <div className="flex gap-3 items-center">
                <Image
                  className="w-10 h-10"
                  alt="CompanyImage"
                  src={pageData.imgTitle}
                ></Image>
                <div>
                  <p className="text-md">{pageData.nearImgTitle}</p>
                  <p className="text-xs text-default-400">
                    {pageData.nearImgText}
                  </p>
                </div>
              </div>
              <Image
                className="w-7 h-7 bg-white"
                alt="image"
                src={pageData.notion}
              ></Image>
            </div>
          </CardHeader>
          <CardBody className="pt-10">
            <p className="trim-text text-xs text-default-400">
              {pageData.text}
            </p>
          </CardBody>
          <CardFooter>
            <Image
              className="w-7 h-7 bg-white"
              alt="image"
              src={pageData.notion}
            ></Image>
          </CardFooter>
        </Card>
        <Card className="overflow-visible hidden md:grid w-full" shadow="sm">
          <CardBody className="items-center py-5 text-center">
            <h3 className="text-medium font-medium text-default-700">
              Upgrade to Pro
              <span aria-label="rocket-emoji" className="ml-2" role="img">
                🚀
              </span>
            </h3>
            <p className="p-4 text-small text-default-500">
              Get 1 month free and unlock all the features of the pro plan.
            </p>
          </CardBody>
          <CardFooter className="absolute -bottom-8 justify-center">
            <Button
              className="px-10 shadow-md"
              color="primary"
              radius="full"
              variant="shadow"
            >
              Upgrade
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
