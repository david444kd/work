import React from "react";
import { data } from "../../data";
import { PageContent } from "./PageContent";

export async function generateStaticParams(): Promise<any> {
  return data.map(({ id }) => {
    return { id: `${id}` };
  });
}

type Props = {
  params: {
    id: string;
  };
};

const Details = ({ params }: Props) => {
  const filteredData = data.find((item) => item.id === Number(params.id));
  console.log(filteredData);

  return <PageContent pageData={filteredData} />;
};

export default Details;
