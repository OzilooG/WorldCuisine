"use client";

import { useEffect, useState } from "react";
import SaveDishButton from "../components/Cookies/index";
import Cookies from "js-cookie";
import { Dish } from "@/types/dish";

interface DishesData {
  dishes: { [key: string]: Dish };
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filtered, setFiltered] = useState<Dish[]>([]);
  const [savedDishIds, setSavedDishIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("/data/worlddishes.json");
        const data: DishesData = await response.json();
        const dishList = Object.entries(data.dishes).map(([id, dish]) => ({
          ...dish,
          id,
        }));
        setDishes(dishList);
        setFiltered(dishList);
      } catch (e) {
        console.error("Error loading dishes:", e);
      }
    };

    fetchDishes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setFiltered(
      dishes.filter(
        (dish) =>
          dish.english_name.toLowerCase().includes(value) ||
          dish.local_name?.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Search Dishes by Name
      </h1>

      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Enter dish name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6"
      />

      {filtered.length === 0 ? (
        <p>No matching dishes found.</p>
      ) : (
        <ul className="flex flex-wrap gap-5">
          {filtered.map((dish) => {
            return (
              <li key={dish.id} className="dish-card">
                <h2>{dish.local_name}</h2>
                {dish.english_name && (
                  <p className="text-gray-600 italic">{dish.english_name}</p>
                )}
                {dish.countries && <p>{dish.countries.join(", ")}</p>}
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
            );
          })}
        </ul>
      )}
    </div>
  );
}
