"use client";

import { useState } from "react";
import DishCard from "../dishcard";
import type { Dish } from "@/types/dish";

export default function Randomiser({ dishes }: { dishes: Dish[] }) {
  const [dish, setRandomDish] = useState<Dish | null>(null);

  const generateRandomDish = (event: React.FormEvent) => {
    event.preventDefault();

    if (!dishes || dishes.length === 0) {
      console.error("No dishes available to randomize.");
      setRandomDish(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * dishes.length);
    setRandomDish(dishes[randomIndex]);
  };

  return (
    <div className="my-20 min-h-[70vh]">
      <h1 className="mt-15 text-3xl font-bold mb-4 flex flex-col items-center">
        Dish Randomiser
      </h1>

      <form
        onSubmit={generateRandomDish}
        className="mb-8 flex flex-col items-center"
      >
        <button type="submit" className="px-6 py-3 btn">
          Get Random Dish
        </button>
      </form>

      <div className="flex justify-center items-center">
        {dish && <DishCard key={dish.id} dish={dish} saveDish={true} />}
      </div>
    </div>
  );
}
