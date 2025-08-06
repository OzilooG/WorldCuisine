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
  const [random_dish, setRandomDish] = useState<Dish | null>(null);
  const [allDishes, setAllDishes] = useState<WorldDishesData>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false); // 👈 New state

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

  // Update isSaved every time a new random dish is selected
  useEffect(() => {
    if (random_dish) {
      const saved = Cookies.get(`savedDish_${random_dish.id}`);
      setIsSaved(saved === "true");
    }
  }, [random_dish]);

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
    <div>
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

      {random_dish && (
        <div className="p-6 border border-gray-200 rounded-lg shadow-lg bg-white mx-auto text-center max-w-4xl">
          <h3 className="text-3xl font-semibold text-gray-800 mb-2">
            {random_dish.local_name}
          </h3>
          {random_dish.english_name && (
            <p className="text-xl text-gray-600 italic mb-2">
              {random_dish.english_name}
            </p>
          )}
          {random_dish.countries && (
            <p className="text-xl mb-2">{random_dish.countries.join(", ")}</p>
          )}
          {random_dish.description && (
            <p className="text-gray-700 leading-relaxed mb-4">
              {random_dish.description}
            </p>
          )}
          {random_dish.recipe && (
            <p className="mb-4">
              <a
                href={random_dish.recipe}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                View Recipe
              </a>
            </p>
          )}
          {random_dish.public_cc_image_url &&
            random_dish.public_cc_image_url !== "No CC Images Available" && (
              <div className="mt-4 flex flex-col items-center">
                <img
                  src={random_dish.public_cc_image_url}
                  alt={random_dish.public_cc_image_caption}
                  className="max-w-full h-auto rounded-lg shadow-sm"
                  style={{ maxWidth: "400px" }}
                />
                {random_dish.public_cc_image_caption && (
                  <p className="text-sm text-gray-500 mt-2">
                    {random_dish.public_cc_image_caption}
                  </p>
                )}
              </div>
            )}

          <SaveDishButton dishId={random_dish.id} />
        </div>
      )}
    </div>
  );
}
