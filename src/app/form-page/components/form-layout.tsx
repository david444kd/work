import { Card, CardHeader } from "@nextui-org/card";

interface FormLayoutProps {
  heading: string;
  description: string;
  fields: React.ReactNode[];
  button: React.ReactNode;
  back?: React.ReactNode;
}

export default function FormLayout({
  heading,
  description,
  fields,
  button,
  back,
}: FormLayoutProps) {
  return (
    <div className="flex gap-5 h-full w-full items-center justify-between p-4 lg:p-8">
      <div className=" max-w-2xl flex flex-col shrink-0">
        <div className="flex justify-start flex-col items-start">
          {" "}
          <h1 className="mb-3  text-3xl font-medium text-white">{heading}</h1>
          <p className="mb-6  text-base text-neutral-500">{description}</p>
        </div>
        <div className="scrollbar-hide mb-4 h-full overflow-auto">
          <div className="space-y-4 pt-2 ">
            {/* <div className="flex flex-col gap-6">{fields}</div> */}
            <div className="grid grid-cols-1 gap-5 ">{fields}</div>

            <div className="flex justify-center">{button}</div>
          </div>
        </div>
      </div>
      {/* <div className="p-5 bg-default-100 rounded-2xl h-[30vh] w-1/4"></div> */}
      {back && (
        <div className="absolute left-4 top-5 origin-top-left">{back}</div>
      )}
    </div>
  );
}
