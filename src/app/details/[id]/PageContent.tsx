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
} from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import Discord from "@/app/components/icons/discord";
export const PageContent = ({ pageData }: any) => {
  console.log(pageData.text.split("/"));

  return (
    <div className=" w-[80%] mt-20 p-7">
      <div className="flex flex-col gap-8 mb-5">
        <Link href="/" className="text-xl hover:underline hover:opacity-75">
          Home
          <HomeOutlined className="pl-5" />
        </Link>
        <h1 className="text-2xl">{pageData.title}</h1>

        <div className="flex gap-4 mb-2">
          <Chip color="primary">{pageData.type}</Chip>

          <Chip>{pageData.country}</Chip>

          <Chip>{pageData.category}</Chip>

          <NextUiLink
            href={pageData.link}
            target="_blank"
            className="hover:underline"
          >
            Website
          </NextUiLink>
        </div>
        {pageData.img && (
          <Card>
            <img src={pageData.img} alt="" className="w-full rounded-xl" />
          </Card>
        )}
      </div>
      <Card className="p-8 mb-6">
        <div className="flex w-full flex-col gap-8 mb-5">
          <Image src={pageData.imgTitle} className="w-10 h-10"></Image>
          <div className="flex flex-col gap-2">
            {pageData.text.split("\n\n").map((chunk: string) => (
              <p className="text-default-400">{chunk}</p>
            ))}
          </div>

          <div className="flex gap-4">
            <p>{pageData.author}</p>

            <p>{pageData.date}</p>
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <CardHeader className="flex flex-col gap-3 ">
          <div className="flex w-full items-center justify-between mb-1">
            <div className="flex gap-3 items-center">
              <Image className="w-10 h-10" src={pageData.imgTitle}></Image>
              <div>
                <p className="text-md">Brooklyn simons</p>
                <p className="text-xs text-default-400">0 x 123...4567</p>
              </div>
            </div>
            <Image className="w-7 h-7 bg-white" src={pageData.notion}></Image>
          </div>
        </CardHeader>
        {/* <Divider /> */}
        <CardBody>
          <p className="trim-text text-xs text-default-400">{pageData.text}</p>
        </CardBody>
        <CardFooter className="flex  items-center justify-start gap-3 pt-0">
          <Discord></Discord>
        </CardFooter>
      </Card>
    </div>
  );
};
