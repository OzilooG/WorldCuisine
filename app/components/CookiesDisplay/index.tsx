// app/components/SavedDishes.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { imageOptimizer } from 'next/dist/server/image-optimizer';
import RemoveDishButton from '../CookiesRem';

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

interface SavedDishesProps {
  allDishes: { [id: string]: Dish }; // From your JSON
}

const SavedDishes: React.FC<SavedDishesProps> = ({ allDishes }) => {
  const [savedDishes, setSavedDishes] = useState<Dish[]>([]);

  useEffect(() => {
    const cookies = Cookies.get();
    const savedIds = Object.keys(cookies)
      .filter((key) => key.startsWith('savedDish_'))
      .map((key) => key.replace('savedDish_', ''));

    const saved = savedIds
      .map((id) => allDishes[id])
      .filter((dish): dish is Dish => Boolean(dish));

    setSavedDishes(saved);
  }, [allDishes]);

  return (
    <div className='w-[100vw]'>
      
      {savedDishes.length > 0 ? (
        <ul className='flex flex-col items-center text-center gap-5 my-5'>
          {savedDishes.map((dish) => (
            <li key={dish.id} className='flex flex-col items-center border-2 rounded p-5'>
              <h3 className='text-2xl'>{dish.english_name}</h3>
                <RemoveDishButton dishId={dish.id} onRemove={function (dishId: string): void {
                throw new Error('Function not implemented.');
              } }/>
                {dish.local_name && <p>({dish.local_name})</p>}
                {dish.description && <p>{dish.description}</p>}
                {dish.recipe && <p><a href={dish.recipe} target="_blank" rel="noopener noreferrer">View Recipe</a></p>}
                {dish.public_cc_image_url && dish.public_cc_image_url !== "No CC Images Available" && (
                <img src={dish.public_cc_image_url} alt={dish.english_name} style={{ width: '200px', height: 'auto' }} />
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
