// app/components/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface SaveDishButtonProps {
  dishId: string;
}

const SaveDishButton: React.FC<SaveDishButtonProps> = ({ dishId }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = Cookies.get(`savedDish_${dishId}`);
    if (saved === "true") {
      setIsSaved(true);
    }
  }, [dishId]);

  const handleSave = () => {
    Cookies.set(`savedDish_${dishId}`, "true");
    setIsSaved(true);
  };

  return isSaved ? (
    <p className="text-secondary font-semibold">Dish already saved</p>
  ) : (
    <button onClick={handleSave} className="btn">
      Save Dish
    </button>
  );
};

export default SaveDishButton;
