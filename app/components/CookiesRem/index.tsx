// app/components/RemoveDishButton.tsx
'use client';

import React from 'react';
import Cookies from 'js-cookie';

interface RemoveDishButtonProps {
  dishId: string;
  onRemove: (dishId: string) => void;
}

const RemoveDishButton: React.FC<RemoveDishButtonProps> = ({ dishId, onRemove }) => {
  const handleClick = () => {
    Cookies.remove(`savedDish_${dishId}`);
    window.location.reload();
    onRemove(dishId);
  };

  return (
    <button
      onClick={handleClick}
      className='ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded'
    >
      Remove
    </button>
  );
};

export default RemoveDishButton;
