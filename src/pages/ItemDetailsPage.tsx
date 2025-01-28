import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetItemDetailsQuery,
  usePlaceBidMutation,
} from '../store/slices/api/apiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/slices/authSlice';
import CountdownTimer from '../components/CountdownTimer';

import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL);

const ItemDetailsPage: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const { itemId } = useParams<{ itemId: string }>();
  const { data: item, isLoading, error } = useGetItemDetailsQuery(itemId);
  const [placeBid, { isLoading: isPlacingBid, error: bidError }] =
    usePlaceBidMutation();
  const [bidAmount, setBidAmount] = useState<number | string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentHighestBid, setCurrentHighestBid] = useState<number>(0);
  const [timerComplete, setTimerComplete] = useState(false);

  const isAuctionOpen = () => {
    if (!item || timerComplete || user.id === item.createdBy) return false;
    return item.duration;
  };

  const handleTimerComplete = () => {
    setSuccessMessage(null);
    setTimerComplete(true);
  };

  useEffect(() => {
    if (item) {
      setCurrentHighestBid(item.highestBid || 0);
    }
  }, [item]);

  useEffect(() => {
    socket.on('bidUpdate', (data) => {
      if (data.itemId === Number(itemId)) {
        setCurrentHighestBid(data.highestBid);
      }
    });

    return () => {
      socket.off('bidUpdate');
    };
  }, [itemId]);

  const handleBidSubmit = async () => {
    setSuccessMessage(null);
    if (!bidAmount || isNaN(Number(bidAmount))) {
      setErrorMessage('Please enter a valid bid amount.');
      return;
    }

    const bidValue = Number(bidAmount);
    if (bidValue <= currentHighestBid || bidValue <= item.startingPrice) {
      setErrorMessage(
        'Bid amount must be higher than the current highest bid.'
      );
      return;
    }

    if (!isAuctionOpen()) {
      setErrorMessage('The auction has closed. You cannot place a bid.');
      return;
    }

    setErrorMessage(null);

    try {
      await placeBid({
        userId: user.id,
        amount: bidValue,
        itemId: Number(itemId),
      }).unwrap();

      setCurrentHighestBid(bidValue);
      setSuccessMessage(`Your bid of $${bidValue} was placed successfully!`);
      setBidAmount('');
    } catch (err) {
      setErrorMessage('Error placing the bid.');
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading item details...</p>;
  if (error) return <p>Error loading item details.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-color">
      <div className="bg-accent-color shadow-lg rounded-lg overflow-hidden w-full sm:w-3/4 md:w-2/3 lg:w-1/3 p-6">
        <h1 className="text-2xl font-semibold text-[#0f1c62] mb-6">
          {item.name}
        </h1>
        <p className="text-sm text-white mb-4">
          Description: {item.description}
        </p>
        <p className="text-sm text-white mb-4">
          Starting Price: ${item.startingPrice}
        </p>

        {/* <CountdownTimer duration={item.duration} /> */}
        <CountdownTimer
          duration={item.duration}
          onComplete={handleTimerComplete}
        />

        <p className="text-md font-bold text-[#d9f0ab] mb-4">
          Highest Bid: ${currentHighestBid || 0}
        </p>

        {user != null ? (
          isAuctionOpen() ? (
            <>
              <h2 className="text-lg font-semibold text-[#0f1c62] mb-4">
                Place a Bid
              </h2>
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter bid amount"
                className="w-full p-2 border border-neutral-color rounded-md mb-4"
              />
              <button
                onClick={handleBidSubmit}
                disabled={isPlacingBid}
                className="w-full bg-primary-color text-white py-2 rounded-md hover:bg-secondary-color/90 transition duration-200"
              >
                {isPlacingBid ? 'Placing Bid...' : 'Place Bid'}
              </button>
            </>
          ) : (
            <p className="text-red-color mt-4">
              'You cannot place a bid. (Either auction has closed/You cannot bid
              on your Item)'
            </p>
          )
        ) : (
          <p className="text-red-color mt-4">
            You need to Login if you want to place your bid
          </p>
        )}

        {/* Show error messages */}
        {errorMessage && <p className="text-red-color mt-2">{errorMessage}</p>}
        {bidError && (
          <p className="text-red-color mt-2">
            Error placing bid. Please try again later.
          </p>
        )}

        {/* Show success message */}
        {successMessage && (
          <p className="text-primary-color mt-2">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ItemDetailsPage;
