"use client";

import { useState } from "react";
import { Dish } from "@/types/dish";
import DishCard from "../dishcard";

export default function Discover({ dishes }: { dishes: Dish[] }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Dish[]>(dishes);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setFiltered(
      dishes.filter(
        (dish) =>
          dish.english_name?.toLowerCase().includes(value) ||
          dish.local_name.toLowerCase().includes(value)
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
        <ul className="flex flex-wrap justify-center gap-3">
          {filtered.map((dish) => (
            <DishCard key={dish.id} dish={dish} saveDish={true} />
          ))}
        </ul>
      )}
    </div>
  );
}
