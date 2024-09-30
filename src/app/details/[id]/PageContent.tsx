'use client'
import Link from 'next/link';
import { HomeOutlined } from "@ant-design/icons";
import { Link as NextUiLink } from '@nextui-org/react'
import {Chip} from "@nextui-org/chip";


export const PageContent = ({pageData}: any) => {
    return (
        <>
        <div className='flex w-full flex-col gap-8 mb-5'>

            <Link href="/">
                <HomeOutlined />
            </Link>
            <h1 className='text-2xl'>{pageData.title}</h1>

            <div className="flex gap-4 mb-2">
                <Chip color="primary">{pageData.type}</Chip>

                <Chip>{pageData.country}</Chip>

                <Chip>{pageData.category}</Chip>  

                <NextUiLink href={pageData.link} target="_blank">website</NextUiLink>
            </div>
            {pageData.img && (
                <div className="w-full">
                    <img src={pageData.img} alt="" className="max-h-[200px]" />
                </div>
            )}
        </div>
        <div className='flex w-full flex-col gap-8 mb-5'>
            <p>{pageData.text}</p>

            <div className="flex gap-4">
                <p>
                    {pageData.author}
                </p>

                <p>
                    {pageData.date}
                </p>
            </div>
        </div>
        </>
    )
}