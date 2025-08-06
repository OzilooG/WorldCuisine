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
              <RemoveDishButton
                dishId={dish.id}
                onRemove={function (dishId: string): void {}}
              />
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
        <p className="text-center">No saved dishes yet.</p>
      )}
    </div>
  );
};

export default SavedDishes;
