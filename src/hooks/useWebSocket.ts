import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export const useWebSocket = () => {
  const ws = useRef<WebSocket | null>(null);
  const {
    addReservation,
    updateReservation,
    addOrder,
    updateOrder,
    addReview,
    addSocialPost,
    setAvailableTables,
    setCurrentWeather,
    setAnalytics
  } = useStore();

  useEffect(() => {
    // Simulate WebSocket connection for real-time updates
    const connectWebSocket = () => {
      console.log('WebSocket connected');
      
      // Simulate weather updates
      const weatherInterval = setInterval(() => {
        const weathers = ['sunny', 'cloudy', 'rainy'];
        setCurrentWeather(weathers[Math.floor(Math.random() * weathers.length)]);
      }, 300000); // Update every 5 minutes

      // Simulate table availability changes
      const tableInterval = setInterval(() => {
        setAvailableTables(prev => {
          const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? -1 : 1) : 0;
          return Math.max(0, Math.min(20, prev + change));
        });
      }, 120000); // Update every 2 minutes

      return () => {
        clearInterval(weatherInterval);
        clearInterval(tableInterval);
      };
    };

    const cleanup = connectWebSocket();

    return () => {
      if (cleanup) cleanup();
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [addReservation, updateReservation, addOrder, updateOrder, addReview, addSocialPost, setAvailableTables, setCurrentWeather, setAnalytics]);

  // Function to trigger real notifications when actual events occur
  const triggerReservationNotification = (reservation) => {
    // Don't add to store here since it's already added in the component
    toast.success(`New reservation from ${reservation.customerName}!`, {
      duration: 5000,
      icon: '📅',
    });
    
    // Log for debugging
    console.log('Reservation notification triggered:', reservation);
  };

  const triggerOrderNotification = (order) => {
    // Don't add to store here since it's already added in the component
    toast.success(`New ${order.type} order from ${order.customerName}!`, {
      duration: 5000,
      icon: '🛍️',
    });
    
    // Log for debugging
    console.log('Order notification triggered:', order);
  };

  const triggerReviewNotification = (review) => {
    addReview(review);
    toast.success(`New ${review.rating}-star review received!`, {
      duration: 5000,
      icon: '⭐',
    });
  };

  return {
    triggerReservationNotification,
    triggerOrderNotification,
    triggerReviewNotification
  };
};