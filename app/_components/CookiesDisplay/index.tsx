"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Dish } from "@/types/dish";
import DishCard from "../dishcard";

export default function SavedDishes({ dishes }: { dishes: Dish[] }) {
  const [savedDishes, setSavedDishes] = useState<Dish[]>([]);

  useEffect(() => {
    const cookies = Cookies.get();
    const savedIds = Object.keys(cookies)
      .filter((key) => key.startsWith("savedDish_"))
      .map((key) => key.replace("savedDish_", ""));

    const saved = dishes.filter((dish) => savedIds.includes(String(dish.id)));

    setSavedDishes(saved);
  }, [dishes]);

  return (
    <div className="w-[100vw]">
      {savedDishes.length > 0 ? (
        <ul className="flex flex-wrap justify-center items-center text-center gap-5 my-5">
          {savedDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} removeDish={true} />
          ))}
        </ul>
      ) : (
        <p className="text-center my-2 italic">No saved dishes yet.</p>
      )}
    </div>
  );
}
