import { Dish } from "@/types/dish";
import React from "react";
import RemoveDishButton from "./CookiesRem";
import SaveDishButton from "./Cookies";

interface DishCardProps {
  dish: Dish;
  removeDish?: boolean;
  saveDish?: boolean;
}

const DishCard: React.FC<DishCardProps> = ({
  dish,
  removeDish = false,
  saveDish = false,
}) => {
  return (
    <li className="bg-white rounded-xl shadow-md overflow-hidden w-72 flex flex-col hover:shadow-lg transition-shadow">
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
        <h2 className="text-primary font-bold text-lg">{dish.local_name}</h2>
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
          {removeDish && (
            <RemoveDishButton
              dishId={dish.id}
              onRemove={function (dishId: string): void {}}
            />
          )}
          {saveDish && <SaveDishButton dishId={dish.id} />}
        </div>
      </div>
    </li>
  );
};

export default DishCard;
