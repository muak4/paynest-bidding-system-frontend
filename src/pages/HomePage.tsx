import React, { useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import { useGetItemsQuery } from '../store/slices/api/apiSlice';

const HomePage: React.FC = () => {
  const { data: items, isLoading, error, refetch } = useGetItemsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading)
    return <p className="text-center text-xl text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-xl text-red-500">Error loading items.</p>
    );

  return (
    <div className="min-h-screen bg-neutral-color p-6">
      <h1 className="text-3xl font-bold text-[#0f1c62] text-center mb-6">
        {items && items?.length > 0
          ? 'Items Available for Auction'
          : 'No Items Available for Auction'}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {items?.map((item) => <ItemCard key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default HomePage;
