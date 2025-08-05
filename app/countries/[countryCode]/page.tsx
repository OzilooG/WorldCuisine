import React from "react";
import path from "path";
import { promises as fs } from "fs";
import SaveDishButton from "../../components/Cookies/index";
import { Dish } from "@/types/dish";

interface OptimisedDishData {
  countries: { code: string; name: string }[];
  dishes: { [id: string]: Dish };
  dishes_country_map: { [countryCode: string]: string[] };
}

interface CountryPageProps {
  params: {
    countryCode: string;
  };
}

// Server component which fetches and renders data
export default async function CountryPage({ params }: CountryPageProps) {
  const resolvedParams = await params;
  const { countryCode: countryCodeParam } = resolvedParams; // Destructure and rename
  const countryCode = countryCodeParam.toUpperCase(); // Uppercase for lookup

  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "worlddishes.json"
  );

  let data: OptimisedDishData | null = null;
  const jsonData = await fs.readFile(filePath, "utf-8");
  data = JSON.parse(jsonData);

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
    <div className="p-20">
      <h1 className="text-3xl font-bold text-center">
        Dishes from {countryInfo.name} ({countryInfo.code})
      </h1>
      {dishesForCountry && dishesForCountry.length > 0 ? (
        <ul className="flex flex-wrap justify-center items-center text-center gap-5 my-5">
          {dishesForCountry.map((dish) => (
            <li key={dish.id} className="dish-card">
              <h2>{dish.local_name}</h2>
              {dish.english_name && (
                <p className="text-gray-600 italic">{dish.english_name}</p>
              )}
              {dish.description && <p>{dish.description}</p>}
              {dish.recipe && (
                <p className="btn">
                  <a
                    href={dish.recipe}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Recipe
                  </a>
                </p>
              )}
              <SaveDishButton dishId={dish.id} />
              {dish.public_cc_image_url &&
                dish.public_cc_image_url !== "No CC Images Available" && (
                  <div className="dish-image-container">
                    <img
                      src={dish.public_cc_image_url}
                      alt={dish.english_name}
                    />
                  </div>
                )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No dishes found for {countryInfo.name} yet.</p>
      )}
    </div>
  );
}
