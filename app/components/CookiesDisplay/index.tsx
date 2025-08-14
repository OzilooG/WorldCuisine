"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import RemoveDishButton from "../CookiesRem";
import { Dish } from "@/types/dish";

interface SavedDishesProps {
  allDishes: { [id: string]: Dish }; // From your JSON
}

const SavedDishes: React.FC<SavedDishesProps> = ({ allDishes }) => {
  const [savedDishes, setSavedDishes] = useState<Dish[]>([]);

  useEffect(() => {
    const cookies = Cookies.get();
    const savedIds = Object.keys(cookies)
      .filter((key) => key.startsWith("savedDish_"))
      .map((key) => key.replace("savedDish_", ""));

    const saved = savedIds
      .map((id) => allDishes[id])
      .filter((dish): dish is Dish => Boolean(dish));

    setSavedDishes(saved);
  }, [allDishes]);

  return (
    <div className="w-[100vw]">
      {savedDishes.length > 0 ? (
        <ul className="flex flex-wrap justify-center items-center text-center gap-5 my-5">
          {savedDishes.map((dish) => (
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
                  <RemoveDishButton
                    dishId={dish.id}
                    onRemove={function (dishId: string): void {}}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center my-2 italic">No saved dishes yet.</p>
      )}
    </div>
  );
};

export default SavedDishes;
