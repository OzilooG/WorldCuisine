// app/components/index.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface SaveDishButtonProps {
  dishId: string;
}

const SaveDishButton: React.FC<SaveDishButtonProps> = ({ dishId }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = Cookies.get(`savedDish_${dishId}`);
    if (saved === 'true') {
      setIsSaved(true);
    }
  }, [dishId]);

  const handleSave = () => {
    Cookies.set(`savedDish_${dishId}`, 'true'); 
    setIsSaved(true);
    alert('Dish saved!');
  };

  return isSaved ? (
    <p className="text-green-600 font-semibold">Dish already saved</p>
  ) : (
    <button
      onClick={handleSave}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Save Dish
    </button>
  );
};

export default SaveDishButton;
