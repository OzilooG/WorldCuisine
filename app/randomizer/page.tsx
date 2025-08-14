"use client";

import { useState, useEffect } from "react";
import SaveDishButton from "../components/Cookies/index";
import Cookies from "js-cookie";

interface Dish {
  id: string;
  local_name?: string;
  english_name: string;
  description?: string;
  countries?: string[];
  recipe?: string;
  public_cc_image_url?: string;
  language?: string;
  language_code?: string;
  continent?: string;
  regions?: string;
  cultures?: string;
  time_of_day?: string;
  time_of_day_more?: string;
  type_of_dish?: string;
  type_of_dish_more?: string;
  utensils?: string;
  drink?: string;
  occasions?: string;
  occasions_more?: string;
  ingredients?: string;
  more_details?: string;
  public_cc_image_caption?: string;
  uploaded_image_name?: string;
  uploaded_image_url?: string;
  uploaded_image_caption?: string;
}

interface WorldDishesData {
  dishes: { [key: string]: Dish };
}
export default function Randomizer() {
  const [dish, setRandomDish] = useState<Dish | null>(null);
  const [allDishes, setAllDishes] = useState<WorldDishesData>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("/data/worlddishes.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: WorldDishesData = await response.json();
        setAllDishes(data);
      } catch (e: any) {
        console.error("Failed to load dishes:", e);
        setError(`Failed to load dishes: ${e.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const generateRandomDish = (event: React.FormEvent) => {
    event.preventDefault();

    if (!allDishes) {
      console.error("Dishes are missing! Check JSON ASAP!!!");
      return;
    }
    const dishIds = Object.keys(allDishes.dishes);
    const randomIndex = Math.floor(Math.random() * dishIds.length);
    const randomId = dishIds[randomIndex];

    setRandomDish(allDishes.dishes[randomId]);
  };

  // UI Rendering
  if (isLoading) return <div>Loading dishes...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="my-20">
      <h1 className="mt-15 text-3xl font-bold mb-4 flex flex-col items-center">
        Dish Randomizer
      </h1>

      <form
        onSubmit={generateRandomDish}
        className="mb-8 flex flex-col items-center"
      >
        <button type="submit" className="px-6 py-3 btn">
          Get Random Dish
        </button>
      </form>

      {dish && (
        <div className="flex items-center justify-center">
          <div
            key={dish.id}
            className="bg-white rounded-xl shadow-md overflow-hidden w-80 flex flex-col hover:shadow-lg transition-shadow"
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
          </div>
        </div>
      )}
    </div>
  );
}
