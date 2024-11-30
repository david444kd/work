import { useEffect, useMemo, useState } from "react";
import {
  ButtonProps,
  Card,
  Input,
  CardFooter,
  divider,
} from "@nextui-org/react";
import { cn } from "../utils";
import { ChangeEvent, useId } from "react";
import Field from "../components/user-interface/field";
import { Separator } from "@/components/ui/separator";
import { Button } from "@nextui-org/react";
import { CardHeader, CardBody } from "@nextui-org/card";
import { Textarea } from "@nextui-org/react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
interface FormLayoutProps {
  heading: string;
  description: string;
  fields: React.ReactNode[];
  button: React.ReactNode;
  back?: React.ReactNode;
  step?: number;
}
interface TextFieldProps {
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: { message: string } | undefined;
}
export default function FormLayout({
  heading,
  description,
  fields,
  button,
  back,
  step,
}: FormLayoutProps) {
  const [website, setWebsite] = useState(localStorage.getItem("website") || "");
  const [targetAudience, setTargetAudience] = useState(
    localStorage.getItem("targetAudience") || ""
  );
  const [productDescription, setProductDescription] = useState(
    localStorage.getItem("productDescription") || ""
  );
  const [price, setPrice] = useState(localStorage.getItem("price") || "");
  const [websimarkette, setMarket] = useState(
    localStorage.getItem("market") || ""
  );
  const [companyDescription, setCompanyDescription] = useState(
    localStorage.getItem("companyDescription") || ""
  );

  const [stepId, setStepId] = useState(0);

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(
      localStorage.getItem("market")
        ? [localStorage.getItem("market") as string]
        : ["Market"]
    )
  );

  useEffect(() => {
    const selectedValue = Array.from(selectedKeys)
      .join(", ")
      .replaceAll("_", " ");
    localStorage.setItem("market", selectedValue);
  }, [selectedKeys]);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  useEffect(() => {
    console.log("step:", step);
    if (step === 1) {
      setStepId(1);
    } else if (step === 2) {
      setStepId(2);
    } else if (step === 3) {
      setStepId(3);
    }
  }, [step]);

  const [iframeError, setIframeError] = useState(false);

  const ensureProtocol = (url: string): string => {
    if (!url) {
      // return "https://book.greatleads.ru/";
      setIframeError(true);
      return "";
    }

    url = url.trim();

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  const [iframeSrc, setIframeSrc] = useState(() => {
    const initialSrc =
      // localStorage.getItem("website") || "https://book.greatleads.ru/";
      localStorage.getItem("website") || "";

    return ensureProtocol(initialSrc);
  });

  const validateURL = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return (
        ["http:", "https:"].includes(parsedUrl.protocol) &&
        parsedUrl.hostname.includes(".")
      );
    } catch {
      return false;
    }
  };

  const processURL = async (url: string): Promise<string> => {
    url = ensureProtocol(url);

    if (!validateURL(url)) {
      console.warn("Некорректный URL. Используется URL по умолчанию.");
      setIframeError(true);
      // return "https://book.greatleads.ru/";
      return "";
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(url, {
        method: "HEAD",
        signal: controller.signal,
        mode: "no-cors",
      });

      clearTimeout(timeoutId);

      if (response.type === "opaque" || response.ok) {
        return url;
      } else {
        console.warn(`Ошибка доступа к URL: ${response.status}`);
        setIframeError(true);
        // return "https://book.greatleads.ru/";
        return "";
      }
    } catch (err: any) {
      console.warn(`Ошибка проверки URL: ${err.message}`);
      setIframeError(true);
      return url;
    }
  };

  useEffect(() => {
    const validateAndUpdateURL = async () => {
      // Get website from localStorage instead of searchParams
      const currentSrc = localStorage.getItem("website");
      if (currentSrc) {
        const validatedSrc = await processURL(currentSrc);
        setIframeSrc(validatedSrc);
      }
    };

    validateAndUpdateURL();
  }, []); // Remove searchParams dependency

  return (
    <>
      {stepId === 1 ? (
        // <div className="grid lg:grid-cols-2 gap-5 h-full w-full items-center justify-center p-4 lg:p-8 ">
        //   <div className=" flex flex-col gap-10  max-w-[300px] sm:max-w-[500px]">
        //     {Steps({ step: stepId })}
        //     <div className="flex justify-start flex-col items-start">
        //       <h1 className="mb-3 text-3xl font-medium text-white">
        //         {heading}
        //       </h1>
        //       <p className="mb-6 text-base text-neutral-500">{description}</p>
        //       <div className="scrollbar-hide mb-4 h-full overflow-auto w-full">
        //         <div className="space-y-4 pt-2 grid grid-cols-1 lg:gap-3 lg:grid-cols-3  w-full items-end justify-between">
        //           <div className="col-span-2 gap-5 lg:min-w-[250px]">
        //             <Input
        //               placeholder="websitee"
        //               onChange={(e) => {
        //                 console.log(e.target.value);
        //                 localStorage.setItem("website", e.target.value);
        //               }}
        //             />
        //           </div>
        //           <div className="flex justify-center col-span-1">
        //             {<FancyButton />}
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        //   {back && (
        //     <div className="absolute left-4 top-5 origin-top-left">{back}</div>
        //   )}
        //   <div className="flex justify-center">
        //     <Card className="h-[316px] w-full lg:w-[316px]  shadow-lg rounded-xl">
        //       <div className="p-6">{/* Some content */}</div>
        //     </Card>
        //   </div>
        // </div>
        <div className="grid  lg:grid-cols-2 gap-5 h-full w-full items-center justify-center p-4 lg:p-8 ">
          <div className=" flex flex-col gap-10  max-w-[300px] sm:max-w-[500px]">
            {Steps({ step: stepId })}
            <div className="flex justify-start flex-col items-start">
              <h1 className="mb-3 text-3xl font-medium text-white">
                {heading}
              </h1>
              <p className="mb-6 text-base text-neutral-500">{description}</p>
              <div className="scrollbar-hide mb-4 h-full overflow-auto w-full">
                <div className="space-y-4 pt-2 grid grid-cols-1 lg:gap-3 lg:grid-cols-3  w-full items-end justify-between">
                  <div className="col-span-2 gap-5 lg:min-w-[250px]">
                    <Input
                      value={website}
                      placeholder="website"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        console.log(newValue);
                        setWebsite(newValue);
                        localStorage.setItem("website", newValue);
                      }}
                    />
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
      ) : stepId === 2 ? (
        <>
          {/* <div className="flex gap-5 h-full w-full items-center justify-between p-4 lg:p-8 ">
            <div className=" flex flex-col gap-10  max-w-[300px] md:max-w-[500px]">
              {Steps({ step: stepId })}
              <div className="flex justify-start flex-col items-start">
                <h1 className="mb-3 text-3xl font-medium text-white">
                  {heading}
                </h1>
                <p className="mb-6 text-base text-neutral-500">{description}</p>
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
          </div> */}
          <div className="flex gap-5 h-full w-full items-center justify-between p-4 lg:p-8 ">
            <div className=" flex flex-col gap-10  max-w-[300px] md:max-w-[500px]">
              {Steps({ step: stepId })}
              <div className="flex justify-start flex-col items-start">
                <h1 className="mb-3 text-3xl font-medium text-white">
                  {heading}
                </h1>
                <p className="mb-6 text-base text-neutral-500">{description}</p>
              </div>
              <div className="scrollbar-hide mb-4 h-full overflow-auto">
                <div className="space-y-4 pt-2 ">
                  <div className="grid grid-cols-1 gap-5 ">
                    <Textarea
                      value={companyDescription}
                      variant="bordered"
                      placeholder="Company Description"
                      disableAnimation
                      disableAutosize
                      onChange={(e) => {
                        const newValue = e.target.value;
                        console.log(newValue);
                        setCompanyDescription(newValue);
                        localStorage.setItem("companyDescription", newValue);
                      }}
                      className="w-full"
                      classNames={{
                        input: "resize-y min-h-[40px]",
                      }}
                    />
                    <Textarea
                      value={productDescription}
                      variant="bordered"
                      placeholder="Product Description"
                      disableAnimation
                      disableAutosize
                      onChange={(e) => {
                        const newValue = e.target.value;
                        console.log(newValue);
                        setProductDescription(newValue);
                        localStorage.setItem("productDescription", newValue);
                      }}
                      className="w-full"
                      classNames={{
                        input: "resize-y min-h-[40px]",
                      }}
                    />
                    {/* <Input
                      placeholder="companyDescription"
                      onChange={(e) => {
                        console.log(e.target.value);
                        localStorage.setItem(
                          "companyDescription",
                          e.target.value
                        );
                      }}
                    /> */}
                    {/* <Input
                      placeholder="productDescription"
                      onChange={(e) => {
                        console.log(e.target.value);
                        localStorage.setItem(
                          "productDescription",
                          e.target.value
                        );
                      }}
                    /> */}
                    <Input
                      value={targetAudience}
                      placeholder="Target Audience"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        console.log(newValue);
                        setTargetAudience(newValue);
                        localStorage.setItem("targetAudience", newValue);
                      }}
                    />
                    {/* <Input
                      placeholder="Market"
                      onChange={(e) => {
                        console.log(e.target.value);
                        localStorage.setItem("market", e.target.value);
                      }}
                    /> */}

                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered" className="capitalize">
                          {selectedValue}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                      >
                        <DropdownItem key="world">World</DropdownItem>
                        <DropdownItem key="latam">Latam</DropdownItem>
                        <DropdownItem key="azia">Azia</DropdownItem>
                        <DropdownItem key="usa">USA</DropdownItem>
                        <DropdownItem key="europe">Europe</DropdownItem>
                        <DropdownItem key="mena">Mena</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>

                    <Input
                      value={price}
                      placeholder="Price"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        console.log(newValue);
                        setPrice(newValue);
                        localStorage.setItem("price", newValue);
                      }}
                    />
                  </div>
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
      ) : stepId === 3 ? (
        <div className="m-10">
          <div className="w-full flex justify-center">
            {Steps({ step: stepId })}
          </div>
          <div className="grid grid-cols-1 gap-5 md:gap-10 p-5 md:p-10 md:grid-cols-2 w-full h-screen m-auto">
            <div className="w-full h-[50vh] md:h-screen flex">
              {!iframeError ? (
                <iframe
                  src={iframeSrc}
                  className="w-full h-full"
                  style={{ border: "none" }}
                  onError={() => setIframeError(true)}
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 p-10 text-center">
                  <div>
                    <h2 className="text-3xl font-bold text-red-500 mb-4">
                      Ошибка загрузки
                    </h2>
                    <p className="text-xl text-gray-700 mb-6">
                      К сожалению, не удалось загрузить страницу. Вероятно
                      ошибка в введеном вами адресе, пожалуйста, замените адрес
                      сайта или попробуйте позже.
                    </p>
                    <div className="flex justify-center space-x-4"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full flex flex-col items-center justify-center md:h-[80vh] h-[40vh]">
              <Card className="w-full max-h-full overflow-auto">
                <CardHeader className="px-5">UX Annotations</CardHeader>
                <div className="px-5">
                  <Separator />
                </div>
                <div className="flex justify-center px-5">
                  {!iframeError ? (
                    <FinallButton />
                  ) : (
                    <>
                      <p className="text-red-500  text-xl md:text-3xl">
                        Error, please replace url
                      </p>
                    </>
                  )}
                </div>
                <CardBody className="overflow-auto px-5">
                  <div className="mb-5 text-xl font-semibold">HomePage</div>

                  <section className="mb-3">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-5 h-5 bg-red-500 text-white flex justify-center items-center rounded-full">
                        1
                      </div>
                      <h2 className="text-md font-semibold">Navigation</h2>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Logo and main navigation containing links to all the main
                      sections of the website (Switch; Eat; Thrive; Impact;
                      Community; Blog). Search functionality and language
                      switcher.
                    </p>
                  </section>

                  <section className="mb-3">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-5 h-5 bg-red-500 text-white flex justify-center items-center rounded-full">
                        2
                      </div>
                      <h2 className="text-md font-semibold">
                        Featured Articles
                      </h2>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Latest articles from the blog or featured ones.
                    </p>
                  </section>

                  <section className="mb-3">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-5 h-5 bg-red-500 text-white flex justify-center items-center rounded-full">
                        3
                      </div>
                      <h2 className="text-md font-semibold">
                        Links to Other Sections
                      </h2>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Links that navigate users through to the main sections of
                      the site: Switch, Eat, & Thrive.
                    </p>
                  </section>

                  <section className="mb-3">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-5 h-5 bg-red-500 text-white flex justify-center items-center rounded-full">
                        4
                      </div>
                      <h2 className="text-md font-semibold">Recipes</h2>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Pulls in the latest recipes that have been posted to the
                      site and links to their respective articles.
                    </p>
                  </section>

                  <section className="mb-3">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-5 h-5 bg-red-500 text-white flex justify-center items-center rounded-full">
                        5
                      </div>
                      <h2 className="text-md font-semibold">Video</h2>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Pulls in the latest recipe video.
                    </p>
                  </section>

                  <section className="mb-3">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-5 h-5 bg-red-500 text-white flex justify-center items-center rounded-full">
                        6
                      </div>
                      <h2 className="text-md font-semibold">
                        Link to Impact Section
                      </h2>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Link that navigates users to the Impact section of the
                      site.
                    </p>
                  </section>

                  <section className="mb-6">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="w-5 h-5 bg-red-500 text-white flex justify-center items-center rounded-full">
                        7
                      </div>
                      <h2 className="text-md font-semibold text-sm">
                        Newsletter
                      </h2>
                    </div>
                    <p className="text-gray-700">
                      Encourages users to sign up to the ChooseVeg newsletter by
                      entering their name and email address.
                    </p>
                  </section>
                </CardBody>
              </Card>
            </div>
          </div>
          {back && (
            <div className="absolute left-4 top-5 origin-top-left">{back}</div>
          )}
        </div>
      ) : null}
    </>
  );
}

const FancyButton = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center w-full gap-1 rounded-2xl  h-[40px] text-center  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-4  text-sm text-white hover:bg-purple-400",
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
const FinallButton = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center w-full gap-1 rounded-2xl bg-blue-600 justify-center  h-[40px] text-center  px-6 py-4  text-sm text-white ",
        "disabled:bg-purple-500 disabled:opacity-60"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      Finish form
    </button>
  );
};
const Steps = ({ step }: { step: number }) => {
  return (
    <div className="flex gap-5">
      <p className={step === 1 ? "text-blue-500" : "text-white"}>Set up</p>
      <p className={step === 2 ? "text-blue-500" : "text-white"}>Confirm</p>
      <p className={step === 3 ? "text-blue-500" : "text-white"}>Final</p>
    </div>
  );
};

export const Svgbutton = () => {
  return (
    <svg
      height="20px"
      width="20px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="#ffffff"
      stroke="#ffffff"
    >
      <path d="M247.355,106.9C222.705,82.241,205.833,39.18,197.46,0c-8.386,39.188-25.24,82.258-49.899,106.917 c-24.65,24.642-67.724,41.514-106.896,49.904c39.188,8.373,82.254,25.235,106.904,49.895c24.65,24.65,41.522,67.72,49.908,106.9 c8.373-39.188,25.24-82.258,49.886-106.917c24.65-24.65,67.724-41.514,106.896-49.904 C315.08,148.422,272.014,131.551,247.355,106.9z"></path>
    </svg>
  );
};
