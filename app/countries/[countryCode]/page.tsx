"use client";

import React, { useEffect, useState, use } from "react";
import path from "path";
import SaveDishButton from "../../components/Cookies/index";
import { Dish } from "@/types/dish";
import Link from "next/link";

interface CountryPageProps {
  params: Promise<{
    countryCode: string;
  }>;
}

interface OptimisedDishData {
  countries: { code: string; name: string }[];
  dishes: { [id: string]: Dish };
  dishes_country_map: { [countryCode: string]: string[] };
}

export default function CountryPage({ params }: CountryPageProps) {
  const { countryCode: countryCodeParam } = use(params) as {
    countryCode: string;
  };
  const countryCode = countryCodeParam.toUpperCase();
  const [data, setData] = useState<OptimisedDishData | null>(null); // Uppercase for lookup

  useEffect(() => {
    fetch("/data/worlddishes.json")
      .then((res) => res.json())
      .then((json: OptimisedDishData) => {
        setData(json);
      });
  }, []);

  //make sure data is not null
  if (!data) {
    return <div>Data not available.</div>;
  }

  const countryInfo = data.countries.find((c) => c.code === countryCode);

  // prevent non existent country codes
  if (!countryInfo) {
    return <h1>404 - Country "{countryCodeParam}" Not Found</h1>;
  }

  const dishIdsForCountry: string[] =
    data.dishes_country_map[countryCode] || [];

  const dishesForCountry: Dish[] = dishIdsForCountry
    .map((dishId) => {
      const dish = data.dishes[dishId];
      if (dish) {
        return { ...dish, id: dishId };
      }
      return undefined;
    })
    .filter((dish): dish is Dish => Boolean(dish));

  return (
    <div className="p-20 min-h-[70vh]">
      <h1 className="text-3xl font-bold text-center">
        Dishes from {countryInfo.name} ({countryInfo.code})
      </h1>
      {dishesForCountry && dishesForCountry.length > 0 ? (
        <ul className="flex flex-wrap justify-center gap-6 my-8">
          {dishesForCountry.map((dish) => (
            <li
              key={dish.id}
              className="bg-white rounded-xl shadow-md overflow-hidden w-72 flex flex-col hover:shadow-lg transition-shadow"
            >
              {dish.public_cc_image_url &&
              dish.public_cc_image_url !== "No CC Images Available" ? (
                <img
                  src={dish.public_cc_image_url}
                  alt={dish.english_name || dish.local_name}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-primary font-bold text-lg">
                  {dish.local_name}
                </h2>
                {dish.english_name && (
                  <p className="text-gray-500 italic">{dish.english_name}</p>
                )}
                {dish.description && (
                  <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                    {dish.description}
                  </p>
                )}

                {/* Actions */}
                <div className="mt-auto flex flex-col gap-2">
                  {dish.recipe && (
                    <a
                      href={dish.recipe}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      View Recipe
                    </a>
                  )}
                  <SaveDishButton dishId={dish.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 gap-2 flex flex-col text-center">
          <p>No dishes found for {countryInfo.name} yet.</p>
          <p>Got suggestions? Click bellow to contribute.</p>
          <Link href="/adddish">
            <button className="btn">Suggest</button>
          </Link>
        </div>
      )}
    </div>
  );
}
