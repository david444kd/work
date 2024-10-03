"use client";
import React, { createContext, useContext, useState } from "react";

// Определение интерфейса Item
interface Item {
  id: number;
  title: string;
  text: string;
  img: string;
  date?: string; // Сделать необязательным
  author?: string; // Сделать необязательным
  category: string;
  country: string;
  type: string;
  company: string;
  lang: string;
  link: string;
}

interface FilterContextType {
  activeCountry: string | undefined;
  activeCategory: string | undefined;
  activeType: string | undefined;
  activeCompany: string | undefined;

  countries: string[] | undefined;
  categories: string[] | undefined;
  types: string[] | undefined;
  companies: string[] | undefined;

  filteredData: Item[] | undefined;

  setActiveCountry: (value: string | undefined) => void;
  setActiveCategory: (value: string | undefined) => void;
  setActiveType: (value: string | undefined) => void;
  setActiveCompany: (value: string | undefined) => void;

  setCountries: (value: string[] | undefined) => void;
  setCategories: (value: string[] | undefined) => void;
  setTypes: (value: string[] | undefined) => void;
  setCompanies: (value: string[] | undefined) => void;

  setFilteredData: (value: Item[] | undefined) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
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

  const [countries, setCountries] = useState<string[] | undefined>(undefined);
  const [categories, setCategories] = useState<string[] | undefined>(undefined);
  const [types, setTypes] = useState<string[] | undefined>(undefined);
  const [companies, setCompanies] = useState<string[] | undefined>(undefined);

  const [filteredData, setFilteredData] = useState<Item[] | undefined>(
    undefined
  );

  return (
    <FilterContext.Provider
      value={{
        activeCountry,
        activeCategory,
        activeType,
        activeCompany,

        countries,
        categories,
        types,
        companies,

        filteredData,

        setActiveCountry,
        setActiveCategory,
        setActiveType,
        setActiveCompany,

        setCountries,
        setCategories,
        setTypes,
        setCompanies,

        setFilteredData,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
