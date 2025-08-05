'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

interface Dish {
  id: string;
  english_name: string;
  local_name?: string;
  description?: string;
  countries?: string[];

  public_cc_image_url?: string;
  public_cc_image_caption?: string;
}

interface DishesData {
  dishes: { [key: string]: Dish };
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filtered, setFiltered] = useState<Dish[]>([]);
  const [savedDishIds, setSavedDishIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('/data/worlddishes.json');
        const data: DishesData = await response.json();
        const dishList = Object.entries(data.dishes).map(([id, dish]) => ({ ...dish, id }));
        setDishes(dishList);
        setFiltered(dishList);
      } catch (e) {
        console.error('Error loading dishes:', e);
      }
    };

    fetchDishes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setFiltered(
      dishes.filter((dish) =>
        dish.english_name.toLowerCase().includes(value) ||
        dish.local_name?.toLowerCase().includes(value)
      )
    );
  };

  const handleSave = (dishId: string) => {
    Cookies.set(`savedDish_${dishId}`, 'true');
    setSavedDishIds((prev) => new Set(prev).add(dishId));
    alert('Dish saved!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Dishes by Name</h1>

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
        <ul className="space-y-6">
          {filtered.map((dish) => {
            const isSaved = Cookies.get(`savedDish_${dish.id}`) === 'true';
            return (
              <li key={dish.id} className="p-4 border rounded shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{dish.english_name}</h2>
                    {dish.countries && (
                      <p className="text-xl mb-2">{dish.countries}</p>
                    )}
                    {dish.local_name && (
                      <p className="text-gray-600 italic">({dish.local_name})</p>
                    )}
                    {dish.description && (
                      <p className="text-gray-700 mt-1">{dish.description}</p>
                    )}
                  </div>
                  <div className="ml-4">
                    {isSaved ? (
                      <p className="text-green-600 font-semibold">✓ Saved</p>
                    ) : (
                      <button
                        onClick={() => handleSave(dish.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>

                {dish.public_cc_image_url &&
                  dish.public_cc_image_url !== 'No CC Images Available' && (
                    <div className="mt-3">
                      <img
                        src={dish.public_cc_image_url}
                        alt={dish.public_cc_image_caption || dish.english_name}
                        className="max-w-full h-auto rounded"
                        style={{ maxWidth: '300px' }}
                      />
                      {dish.public_cc_image_caption && (
                        <p className="text-sm text-gray-500 mt-1">
                          {dish.public_cc_image_caption}
                        </p>
                      )}
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
