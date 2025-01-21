import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ItemProps {
  item: {
    id: number;
    name: string;
    startingPrice: string;
    description: string;
    currentHighestBid: string;
    remainingTime: string;
  };
}

const ItemCard: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/items/${item.id}`);
  };

  return (
    <div className="bg-accent-color shadow-lg rounded-lg overflow-hidden border border-neutral-color hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-[#0f1c62] mb-2">
          {item.name}
        </h2>
        <p className="text-sm text-white mb-2">
          Description: {item.description}
        </p>
        <p className="text-sm text-white mb-2">
          Starting Price: ${item.startingPrice}
        </p>
        <p className="text-sm text-white mb-2">
          Highest Bid: ${item.currentHighestBid ? item.currentHighestBid : 0}
        </p>
        <p className="text-sm text-white mb-4">
          Time Remaining: {item.remainingTime ? item.remainingTime : 0} Minutes
        </p>
        <button
          onClick={goToDetails}
          className="w-full bg-primary-color text-[#0f1c62] font-semibold py-2 rounded-md hover:bg-secondary-color/90 transition duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
