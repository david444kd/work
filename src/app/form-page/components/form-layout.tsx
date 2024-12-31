import { useEffect, useMemo, useState } from "react";
import { ButtonProps, Card, Input } from "@nextui-org/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { cn } from "../utils";
import { Button } from "@nextui-org/react";
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
  const [value, setValue] = useState("option-one");
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
        : ["Country or region"]
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
    const initialSrc = localStorage.getItem("website") || "";

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
  }, []);

  const Steps = ({ step }: { step: number }) => {
    return (
      <div className="flex gap-5 items-center">
        <p
          className={
            step === 1
              ? "text-blue-500 whitespace-nowrap"
              : "text-default-500 whitespace-nowrap"
          }
        >
          Set up
        </p>
        <p
          className={
            step === 2
              ? "text-blue-500 whitespace-nowrap"
              : "text-default-500 whitespace-nowrap"
          }
        >
          Confirm
        </p>
        <p
          className={
            step === 3
              ? "text-blue-500 whitespace-nowrap"
              : "text-default-500 whitespace-nowrap"
          }
        >
          Final
        </p>
        {!iframeError && step === 3 ? (
          <>
            <FinallButton></FinallButton>
          </>
        ) : (
          <></>
        )}
      </div>
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
  return (
    <>
      {stepId === 1 ? (
        <div className="grid  lg:grid-cols-2 gap-5 h-full w-full items-center justify-center p-4 lg:p-8 ">
          <div className=" flex flex-col gap-10  max-w-[300px] sm:max-w-[500px]">
            {Steps({ step: stepId })}
            <div className="flex justify-start flex-col items-start">
              <h1 className="mb-3 text-3xl font-medium text-default-900">
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
          <div className="flex gap-5 h-full w-full items-center justify-between p-4 lg:p-8 ">
            <div className=" flex flex-col gap-10  max-w-[300px] md:max-w-[500px]">
              {Steps({ step: stepId })}
              <div className="flex justify-start flex-col items-start">
                <h1 className="mb-3 text-3xl font-medium text-default-900">
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
                      placeholder="Name of the startup"
                      disableAnimation
                      disableAutosize
                      onChange={(e) => {
                        const newValue = e.target.value;
                        console.log(newValue);
                        setCompanyDescription(newValue);
                        localStorage.setItem("companyDescription", newValue);
                      }}
                      className="w-full"
                    />

                    <Textarea
                      value={productDescription}
                      variant="bordered"
                      placeholder="A brief overview of what the company offers. No less than 20 words"
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
                        input: "resize-y min-h-[40px] max-h-[100px]",
                      }}
                    />
                    <Textarea
                      value={targetAudience}
                      variant="bordered"
                      placeholder="Key demographics and psychographics of the audience (age, profession, preferences, etc.)"
                      disableAnimation
                      disableAutosize
                      onChange={(e) => {
                        const newValue = e.target.value;
                        console.log(newValue);
                        setTargetAudience(newValue);
                        localStorage.setItem("targetAudience", newValue);
                      }}
                      className="w-full"
                      classNames={{
                        input: "resize-y min-h-[40px] max-h-[100px]",
                      }}
                    />

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

                    <Textarea
                      type="number"
                      value={price}
                      variant="bordered"
                      placeholder="Price range of the product/service and its positioning (e.g., premium, budget-friendly)"
                      disableAnimation
                      disableAutosize
                      onChange={(e) => {
                        const newValue = e.target.value;

                        if (!/^\d*$/.test(newValue)) {
                          newValue.replace(/[^0-9]/g, "");
                          return;
                        }

                        console.log(newValue);
                        setPrice(newValue);
                        localStorage.setItem("price", newValue);
                      }}
                      className="w-full"
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
        <div className="mt-10">
          <div className="w-full flex justify-center">
            {Steps({ step: stepId })}
          </div>

          <Tabs
            defaultValue="option-one"
            className="mt-5 sm:hidden flex"
            onValueChange={setValue}
            defaultChecked
          >
            <TabsList>
              <TabsTrigger value="option-one">Website</TabsTrigger>
              <TabsTrigger value="option-two">Recomendations</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 gap-5 md:gap-10 p-5 mr-10 md:grid-cols-2 w-full h-screen m-auto">
            {value === "option-one" ? (
              <div className="w-full md:h-[80vh] h-[40vh]  flex-col">
                <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-2 border-b border-gray-300">
                    <div className="flex gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                {!iframeError ? (
                  <iframe
                    src={iframeSrc}
                    className="w-full h-full"
                    style={{ border: "none" }}
                    onError={() => setIframeError(true)}
                  ></iframe>
                ) : (
                  <div className="w-full md:h-[80vh] h-[40vh]  flex items-center justify-center bg-gray-100 p-10 text-center">
                    <div>
                      <h2 className="text-3xl font-bold text-red-500 mb-4">
                        Ошибка загрузки
                      </h2>
                      <p className="text-xl text-gray-700 mb-6">
                        К сожалению, не удалось загрузить страницу. Вероятно
                        ошибка в введеном вами адресе, пожалуйста, замените
                        адрес сайта или попробуйте позже.
                      </p>
                      <div className="flex justify-center space-x-4"></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full flex flex-col  max-h-full overflow-auto bg-yellow-300 rounded-lg">
                <div className="overflow-auto px-5">
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
                </div>
              </div>
            )}

            <div className="w-full flex flex-col items-center justify-center md:h-[80vh] h-[40vh]">
              <ScoreCard></ScoreCard>
              <div className="w-full sm:flex flex-col hidden  max-h-full overflow-auto bg-yellow-300 rounded-lg">
                <div className="overflow-auto px-5">
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
                </div>
              </div>
              <FeedbackButtons></FeedbackButtons>
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

const ScoreCard = () => {
  const metrics = [
    { label: "Answer Depth", value: 7.0, icon: "📊" },
    { label: "Data-Driven", value: 8.0, icon: "📈" },
    { label: "Conciseness", value: 8.0, icon: "💫" },
    { label: "Pitch Clarity", value: 8.0, icon: "🎯" },
  ];

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            Upgrade to Professional
          </DialogTitle>
          <p className="text-2xl text-center text-blue-600 px-1">$49/mounth</p>
          <DialogDescription className="text-center">
            To access this feature and continue enjoying our services,
            you&apos;ll need to upgrade your plan.
          </DialogDescription>
        </DialogHeader>
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4">
            <svg
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span>2000 credits every month</span>
          </div>

          <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4">
            <svg
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Extended access to Person Memo (up to 50)</span>
          </div>

          <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4">
            <svg
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Extended access to Eval Report (up to 33)</span>
          </div>

          <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4">
            <svg
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Ability to personalize personal & company info</span>
          </div>
        </div>
        <div className="mb-6 w-full rounded-lg text-center bg-blue-600 py-4 text-base font-semibold text-white hover:bg-blue-700">
          Upgrade to Professional →
        </div>

        <div className="text-center">
          <p className="text-base text-blue-600 hover:text-blue-800">
            Contact Sales for Enterprise
          </p>
        </div>
      </DialogContent>

      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg space-y-6">
        <div className="bg-violet-600 rounded-lg p-4 flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-white text-xl font-bold">YC Interview Score</h2>
            <DialogTrigger>
              <p className="text-white/80 text-sm">
                To create this report, we used basic information. For a more
                customized and relevant report, please add your personal details
              </p>
            </DialogTrigger>
          </div>
          <div className="text-white text-3xl font-bold">6.5</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {metrics.map(({ label, value, icon }) => (
            <div key={label} className="space-y-2">
              <div className="flex items-center justify-between space-x-2 text-white/80">
                <div className="flex gap-1">
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>

                <span className="ml-auto">{value}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-600 rounded-full"
                  style={{ width: `${(value / 10) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

const FeedbackButtons = () => {
  const emojis = ["🤬", "😶", "🙂", "🤓", "🤩"];

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl p-4">
      <div className="text-center text-gray-600 text-sm mb-3">
        Let us know if it were useful or not
      </div>
      <div className="flex justify-center gap-4">
        {emojis.map((emoji, index) => (
          <div
            key={index}
            className="text-2xl hover:scale-110 transition-transform"
            aria-label={`Feedback emoji ${emoji}`}
          >
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
};
