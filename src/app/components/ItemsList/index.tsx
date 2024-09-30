"use client";
import Link from "next/link";
import { Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider, DatePicker, Pagination } from "@nextui-org/react";
import { Chip } from "@nextui-org/chip";
import { useEffect, useMemo, useState } from "react";
import SaidBar from "../saidBar";
import Rocket from "../rocket";
import Pagin from "../Pagin";
import { log } from "console";
export const ItemsList = ({ data }: any) => {
  const [allitemsData, setAllItemsData] = useState([data]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);

  const [filteredData, setFilteredData] = useState(data);
  const [countries, setCountries] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [activeCountry, setActiveCountry] = useState<string | undefined>(
    undefined
  );
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined
  );
  const [activeType, setActiveType] = useState<string | undefined>(undefined);
  const [activeCompany, setActiveCompany] = useState<string | undefined>(
    undefined
  );
  const lastPostIndex = currentPage * postPerPage;
  const firstPostInsex = lastPostIndex - postPerPage;
  const currentPosts = filteredData.slice(firstPostInsex, lastPostIndex);
  useEffect(() => {
    const hash = {
      country: [] as string[],
      category: [] as string[],
      type: [] as string[],
      company: [] as string[],
    };

    data.forEach((el: any) => {
      if (el.country && !hash.country.includes(el.country)) {
        hash.country.push(el.country as string);
      }
      if (el.category && !hash.category.includes(el.category)) {
        hash.category.push(el.category as string);
      }
      if (el.type && !hash.type.includes(el.type)) {
        hash.type.push(el.type as string);
      }
      if (el.company && !hash.company.includes(el.company)) {
        hash.company.push(el.company as string);
      }
    });

    Object.entries(hash).forEach(([key, value]) => {
      if (key === "country") {
        setCountries(value);
      }
      if (key === "category") {
        setCategories(value);
      }
      if (key === "category") {
        setTypes(value);
      }
      if (key === "company") {
        setCompanies(value);
      }
    });
  }, []);

  const changeValue = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    let currentCountry = activeCountry;
    let currentCategory = activeCategory;
    let currentType = activeType;
    let currentCompany = activeCompany;

    if (name === "activeCountry") {
      setActiveCountry(value);
      currentCountry = value;
    }

    if (name === "activeCategory") {
      setActiveCategory(value);
      currentCategory = value;
    }

    if (name === "activeType") {
      setActiveType(value);
      currentType = value;
    }

    if (name === "activeCompany") {
      setActiveCompany(value);
      currentCompany = value;
    }

    setTimeout(() => {
      const newData = data.filter((element: any) => {
        return (
          element.category === currentCategory ||
          element.company === currentCompany ||
          element.country === currentCountry ||
          element.type === currentType
        );
      });

      setFilteredData(newData);
    }, 40);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
        <div className="grid grid-cols-1 col-span-1">
          <SaidBar></SaidBar>
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="grid col-span-4 mt-28">
            <div className="flex flex-wrap mb-10">
              {countries.length > 1 && (
                <Select
                  placeholder="country"
                  name="activeCountry"
                  className="max-w-[200px]"
                  onChange={changeValue}
                >
                  {countries.map((country) => {
                    return <SelectItem key={country}>{country}</SelectItem>;
                  })}
                </Select>
              )}

              {categories.length > 1 && (
                <Select
                  placeholder="category"
                  name="activeCategory"
                  className="max-w-[200px]"
                  onChange={changeValue}
                >
                  {categories.map((category) => {
                    return <SelectItem key={category}>{category}</SelectItem>;
                  })}
                </Select>
              )}

              {types.length > 1 && (
                <Select
                  placeholder="type"
                  name="activeType"
                  className="max-w-[200px]"
                  onChange={changeValue}
                >
                  {types.map((type) => {
                    return <SelectItem key={type}>{type}</SelectItem>;
                  })}
                </Select>
              )}

              {companies.length > 1 && (
                <Select
                  placeholder="company"
                  name="activeCompany"
                  className="max-w-[200px]"
                  onChange={changeValue}
                >
                  {companies.map((company) => {
                    return <SelectItem key={company}>{company}</SelectItem>;
                  })}
                </Select>
              )}
              {/* <Pagin></Pagin> */}
            </div>
          </div>
          <div className="grid col-span-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {currentPosts.map((item: any) => {
              return (
                <Card key={item.id}>
                  <CardHeader className="flex flex-col gap-3 ">
                    <div className="flex flex-col">
                      <p className="text-md">{item.title}</p>
                      <a
                        href={item.link}
                        target="_blank"
                        className="text-small text-default-500"
                      >
                        {item.link}
                      </a>
                    </div>
                    <div className="w-full">
                      <img src={item.img} alt="" className="max-h-[200px]" />
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <p className="trim-text">{item.text}</p>
                  </CardBody>
                  <CardFooter className="flex gap-2 items-center">
                    <Chip>{item.category}</Chip>
                    <Link href={`details/${item.id}`}>
                      <Button size="sm" color="primary">
                        details
                      </Button>
                    </Link>
                  </CardFooter>
                  <Divider />
                </Card>
              );
            })}
            <div className="col-span-3">
              <Pagin
                totalPosts={filteredData.length}
                postPerPage={postPerPage}
                currentPage={currentPage}
                setPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* <div className="flex items-center mb-10">
{countries.length > 1 && (
  <Select
    placeholder="country"
    name="activeCountry"
    className="max-w-[200px]"
    onChange={changeValue}
  >
    {countries.map((country) => {
      return <SelectItem key={country}>{country}</SelectItem>;
    })}
  </Select>
)}

{categories.length > 1 && (
  <Select
    placeholder="category"
    name="activeCategory"
    className="max-w-[200px]"
    onChange={changeValue}
  >
    {categories.map((category) => {
      return <SelectItem key={category}>{category}</SelectItem>;
    })}
  </Select>
)}

{types.length > 1 && (
  <Select
    placeholder="type"
    name="activeType"
    className="max-w-[200px]"
    onChange={changeValue}
  >
    {types.map((type) => {
      return <SelectItem key={type}>{type}</SelectItem>;
    })}
  </Select>
)}

{companies.length > 1 && (
  <Select
    placeholder="company"
    name="activeCompany"
    className="max-w-[200px]"
    onChange={changeValue}
  >
    {companies.map((company) => {
      return <SelectItem key={company}>{company}</SelectItem>;
    })}
  </Select>
)}
</div> */
}
