import { useEffect, useState } from "react";

import { ButtonProps, Card } from "@nextui-org/react";
import { cn } from "../utils";

interface FormLayoutProps {
  heading: string;
  description: string;
  fields: React.ReactNode[];
  button: React.ReactNode;
  back?: React.ReactNode;
  step?: number;
}

export default function FormLayout({
  heading,
  description,
  fields,
  button,
  back,
  step,
}: FormLayoutProps) {
  const [stepId, setStepId] = useState(0);
  useEffect(() => {
    console.log("step:", step);
    if (step == 1) {
      setStepId(1);
    } else {
      setStepId(2);
    }
  }, [step]);

  return (
    <>
      {stepId == 1 ? (
        <div className="grid lg:grid-cols-2 gap-5 h-full w-full items-center justify-center p-4 lg:p-8 ">
          <div className=" flex flex-col gap-10  max-w-[300px] sm:max-w-[500px]">
            {Steps({ step: stepId })}
            <div className="flex justify-start flex-col items-start">
              <h1 className="mb-3  text-3xl font-medium text-white">
                {heading}
              </h1>
              <p className="mb-6  text-base text-neutral-500">{description}</p>
              <div className="scrollbar-hide mb-4 h-full overflow-auto w-full">
                <div className="space-y-4 pt-2 grid grid-cols-1 lg:gap-3 lg:grid-cols-3  w-full items-end justify-between">
                  <div className="col-span-2 gap-5 lg:min-w-[250px]">
                    {fields}
                  </div>

                  <div className="flex justify-center col-span-1">
                    {<FancyButton />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {back && (
            <div className="absolute left-4 top-5 origin-top-left">{back}</div>
          )}
          <div className="flex justify-center">
            <Card className="h-[316px] w-full lg:w-[316px]  shadow-lg rounded-xl">
              <div className="p-6">
                <div className="flex items-center ">
                  <div className="w-4 h-4 rounded-full bg-blue-400 mr-2"></div>
                  <span className="text-lg font-semibold">Wages</span>
                </div>
                <div className="h-2 bg-blue-200 rounded-full ">
                  <div
                    className="h-2 bg-blue-400 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
                <div className="text-xl font-bold mb-2">€12,366</div>

                <div className="flex items-center ">
                  <div className="w-4 h-4 rounded-full bg-orange-400 mr-2"></div>
                  <span className="text-lg font-semibold">Bonus</span>
                </div>
                <div className="h-2 bg-orange-200 rounded-full ">
                  <div
                    className="h-2 bg-orange-400 rounded-full"
                    style={{ width: "10%" }}
                  ></div>
                </div>
                <div className="text-xl font-bold mb-2">€1,366</div>

                <div className="flex items-center ">
                  <div className="w-4 h-4 rounded-full bg-purple-400 mr-2"></div>
                  <span className="text-lg font-semibold">
                    Employee benefits
                  </span>
                </div>
                <div className="h-2 bg-purple-200 rounded-full ">
                  <div
                    className="h-2 bg-purple-400 rounded-full"
                    style={{ width: "5%" }}
                  ></div>
                </div>
                <div className="text-xl font-bold mb-2">€342</div>

                <div className="flex items-center ">
                  <div className="w-4 h-4 rounded-full bg-teal-400 mr-2"></div>
                  <span className="text-lg font-semibold">
                    Education and trainings
                  </span>
                </div>
                <div className="h-2 bg-teal-200 rounded-full ">
                  <div
                    className="h-2 bg-teal-400 rounded-full"
                    style={{ width: "2%" }}
                  ></div>
                </div>
                <div className="text-xl font-bold">€66</div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-5 h-full w-full items-center justify-between p-4 lg:p-8 ">
            <div className=" flex flex-col gap-10  max-w-[300px] md:max-w-[500px]">
              {Steps({ step: stepId })}

              <div className="flex justify-start flex-col items-start">
                <h1 className="mb-3  text-3xl font-medium text-white">
                  {heading}
                </h1>
                <p className="mb-6  text-base text-neutral-500">
                  {description}
                </p>
              </div>
              <div className="scrollbar-hide mb-4 h-full overflow-auto">
                <div className="space-y-4 pt-2 ">
                  <div className="grid grid-cols-1 gap-5 ">{fields}</div>

                  <div className="flex justify-center">{button}</div>
                </div>
              </div>
            </div>

            {back && (
              <div className="absolute left-4 top-5 origin-top-left">
                {back}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

const FancyButton = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center lg:gap-5 w-full rounded-2xl font-bold h-[58px]  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4  text-base text-white hover:bg-purple-400",
        // "focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black",
        "disabled:bg-purple-500 disabled:opacity-60"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <Svgbutton />
      Start setup
    </button>
  );
};

const Steps = ({ step }: { step: number }) => {
  return (
    <div className="flex gap-5">
      <p className={step === 1 ? "text-blue-500" : ""}>Set up</p>
      <p className={step === 2 ? "text-blue-500" : ""}>Confirm</p>
    </div>
  );
};

export const Svgbutton = () => {
  return (
    <svg
      height="20px"
      width="20px"
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      fill="#ffffff"
      stroke="#ffffff"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <style type="text/css"> {} </style>{" "}
        <g>
          <path
            // class="st0"
            d="M247.355,106.9C222.705,82.241,205.833,39.18,197.46,0c-8.386,39.188-25.24,82.258-49.899,106.917 c-24.65,24.642-67.724,41.514-106.896,49.904c39.188,8.373,82.254,25.235,106.904,49.895c24.65,24.65,41.522,67.72,49.908,106.9 c8.373-39.188,25.24-82.258,49.886-106.917c24.65-24.65,67.724-41.514,106.896-49.904 C315.08,148.422,272.014,131.551,247.355,106.9z"
          ></path>{" "}
          <path
            // class="st0"
            d="M407.471,304.339c-14.714-14.721-24.81-40.46-29.812-63.864c-5.011,23.404-15.073,49.142-29.803,63.872 c-14.73,14.714-40.464,24.801-63.864,29.812c23.408,5.01,49.134,15.081,63.864,29.811c14.73,14.722,24.81,40.46,29.82,63.864 c5.001-23.413,15.081-49.142,29.802-63.872c14.722-14.722,40.46-24.802,63.856-29.82 C447.939,329.14,422.201,319.061,407.471,304.339z"
          ></path>{" "}
          <path
            // class="st0"
            d="M146.352,354.702c-4.207,19.648-12.655,41.263-25.019,53.626c-12.362,12.354-33.968,20.82-53.613,25.027 c19.645,4.216,41.251,12.656,53.613,25.027c12.364,12.362,20.829,33.96,25.036,53.618c4.203-19.658,12.655-41.255,25.023-53.626 c12.354-12.362,33.964-20.82,53.605-25.035c-19.64-4.2-41.251-12.656-53.613-25.019 C159.024,395.966,150.555,374.351,146.352,354.702z"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};
