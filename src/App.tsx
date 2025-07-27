import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import ReservationsPage from './components/ReservationsPage';
import OrderingPage from './components/OrderingPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import MembershipPage from './components/MembershipPage';
import EventDetailPage from './components/EventDetailPage';
import PressArticlePage from './components/PressArticlePage';
import SupplierPage from './components/SupplierPage';

// CMS Components
import CMSLayout from './components/cms/CMSLayout';
import Dashboard from './components/cms/Dashboard';
import MenuManagement from './components/cms/MenuManagement';
import ReservationManagement from './components/cms/ReservationManagement';
import OrderManagement from './components/cms/OrderManagement';
import MemberManagement from './components/cms/MemberManagement';
import EventManagement from './components/cms/EventManagement';
import ReviewManagement from './components/cms/ReviewManagement';
import SocialMediaManagement from './components/cms/SocialMediaManagement';
import CelebrityManagement from './components/cms/CelebrityManagement';
import PressAwardsManagement from './components/cms/PressAwardsManagement';
import WeatherMenuManagement from './components/cms/WeatherMenuManagement';
import Analytics from './components/cms/Analytics';
import Settings from './components/cms/Settings';
import AdminProfile from './components/cms/AdminProfile';

// Hooks
import { useWebSocket } from './hooks/useWebSocket';
import { useStore } from './store/useStore';

function App() {
  useWebSocket(); // Initialize WebSocket connection
  const { 
    setMenuItems, setReservations, setOrders, setMembers, setEvents, 
    setReviews, setSocialPosts, setCelebrities, setAwards, setPressFeatures, 
    setWeatherSuggestions, syncFromDatabase 
  } = useStore();

  useEffect(() => {
    // Initialize with expanded sample data and sync from database
    const initializeData = async () => {
      // Try to sync from database first
      await syncFromDatabase();
      
      // If no data exists, initialize with sample data
      const { menuItems, reservations, orders } = useStore.getState();
      
      if (menuItems.length === 0) {
        // Initialize with sample data only if no data exists
        setMenuItems([
          // Starters (10 items)
          {
            id: '1',
            name: 'Truffle Arancini',
            description: 'Crispy risotto balls with black truffle, parmesan, and wild mushroom sauce',
            price: 24,
            category: 'starters',
            dietary: ['glutenFree'],
            image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
            arCode: 'AR001',
            available: true,
            ingredients: ['risotto', 'truffle', 'parmesan', 'mushrooms'],
            preparationTime: 15,
            popularity: 85,
            nutritionalInfo: { calories: 320, protein: 12, carbs: 28, fat: 18 },
            allergens: ['dairy', 'gluten'],
            chefNotes: 'Our signature dish featuring locally sourced black truffles',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Seared Scallops',
            description: 'Pan-seared scallops with cauliflower puree, pancetta, and micro herbs',
            price: 32,
            category: 'starters',
            dietary: ['lowFat'],
            image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
            arCode: 'AR002',
            available: true,
            ingredients: ['scallops', 'cauliflower', 'pancetta', 'herbs'],
            preparationTime: 12,
            popularity: 92,
            nutritionalInfo: { calories: 280, protein: 22, carbs: 8, fat: 16 },
            allergens: ['shellfish'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          // Add more sample items...
          {
            id: '11',
            name: 'Wagyu Beef Tenderloin',
            description: 'Premium wagyu with roasted vegetables, red wine jus, and truffle oil',
            price: 68,
            category: 'mains',
            dietary: ['lowFat'],
            image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400',
            arCode: 'AR011',
            available: true,
            ingredients: ['wagyu beef', 'vegetables', 'red wine', 'truffle oil'],
            preparationTime: 25,
            popularity: 95,
            nutritionalInfo: { calories: 580, protein: 45, carbs: 12, fat: 38 },
            allergens: [],
            chefNotes: 'Cooked to your preference, served medium-rare unless requested',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: '21',
            name: 'Dark Chocolate Soufflé',
            description: 'Rich chocolate soufflé with vanilla bean ice cream and gold leaf',
            price: 18,
            category: 'desserts',
            dietary: ['glutenFree'],
            image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=400',
            arCode: 'AR021',
            available: true,
            ingredients: ['dark chocolate', 'vanilla', 'eggs', 'cream'],
            preparationTime: 20,
            popularity: 92,
            nutritionalInfo: { calories: 380, protein: 8, carbs: 32, fat: 24 },
            allergens: ['eggs', 'dairy'],
            chefNotes: 'Please allow 20 minutes preparation time',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]);

        // Sample reservations
        setReservations([
          {
            id: 'res_1',
            customerName: 'John Smith',
            customerEmail: 'john@email.com',
            customerPhone: '+61 4XX XXX XXX',
            date: '2024-03-15',
            time: '19:00',
            guests: 4,
            status: 'confirmed',
            specialRequests: 'Anniversary dinner',
            tableNumber: 12,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]);

        // Sample orders
        setOrders([
          {
            id: 'ord_1',
            customerName: 'Jane Doe',
            customerEmail: 'jane@email.com',
            customerPhone: '+61 4XX XXX XXX',
            items: [{
              menuItemId: '1',
              name: 'Truffle Arancini',
              price: 24,
              quantity: 2
            }],
            type: 'pickup',
            status: 'preparing',
            scheduledTime: 'ASAP',
            paymentMethod: 'card',
            subtotal: 48,
            deliveryFee: 0,
            tax: 4.8,
            total: 52.8,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]);

        // Initialize other sample data...
        setMembers([
          {
            id: 'mem_1',
            name: 'Sarah Johnson',
            email: 'sarah@email.com',
            phone: '+61 4XX XXX XXX',
            membershipTier: 'gold',
            joinDate: '2023-01-15',
            totalSpent: 2450,
            visitCount: 12,
            preferences: ['seafood', 'wine pairing'],
            allergies: ['nuts'],
            favoriteItems: ['1', '2'],
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]);

        setEvents([
          {
            id: 'evt_1',
            title: 'Wine Pairing Dinner',
            description: '5-course menu with premium Victorian wines',
            date: '2024-03-15',
            time: '19:00',
            price: 185,
            maxSpots: 20,
            availableSpots: 8,
            image: 'https://images.pexels.com/photos/1753437/pexels-photo-1753437.jpeg?auto=compress&cs=tinysrgb&w=400',
            status: 'upcoming',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ]);

        setReviews([
          {
            id: 'rev_1',
            customerName: 'Michael Chen',
            rating: 5,
            text: 'Outstanding food and service. The chef\'s attention to detail is remarkable.',
            platform: 'Google',
            date: new Date().toISOString(),
            status: 'approved',
            createdAt: new Date().toISOString()
          }
        ]);

        setSocialPosts([
          {
            id: 'social_1',
            platform: 'instagram',
            user: '@foodie_melbourne',
            content: 'The wagyu at @melbournebistro is absolutely divine! 🥩✨',
            image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=300',
            likes: 234,
            time: '2h ago',
            status: 'active',
            createdAt: new Date().toISOString()
          }
        ]);

        setCelebrities([
          {
            id: 'cel_1',
            name: 'Hugh Jackman',
            dish: 'Wagyu Beef Tenderloin',
            quote: 'Absolutely incredible! Best meal I\'ve had in Melbourne.',
            image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
            status: 'active',
            createdAt: new Date().toISOString()
          }
        ]);

        setAwards([
          {
            id: 'award_1',
            year: '2024',
            award: 'Restaurant of the Year',
            organization: 'Melbourne Dining Awards',
            status: 'active',
            createdAt: new Date().toISOString()
          }
        ]);

        setPressFeatures([
          {
            id: 'press_1',
            publication: 'The Age',
            headline: 'Melbourne Bistro Redefines Fine Dining',
            excerpt: 'Chef Marcus Thompson\'s innovative approach to Australian cuisine...',
            date: 'March 2024',
            status: 'active',
            createdAt: new Date().toISOString()
          }
        ]);

        setWeatherSuggestions([
          {
            id: 'weather_1',
            weatherType: 'sunny',
            title: 'Perfect Day for Our Terrace',
            description: 'Light, fresh dishes perfect for Melbourne\'s beautiful weather',
            dishes: ['Grilled Barramundi', 'Summer Salad', 'Citrus Sorbet'],
            status: 'active',
            createdAt: new Date().toISOString()
          }
        ]);
      }
    };

    initializeData();
  }, [setMenuItems, setReservations, setOrders, setMembers, setEvents, setReviews, setSocialPosts, setCelebrities, setAwards, setPressFeatures, setWeatherSuggestions, syncFromDatabase]);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="bg-gray-900 text-white">
              <Header />
              <HomePage />
              <Footer />
            </div>
          } />
          <Route path="/menu" element={
            <div className="bg-gray-900 text-white">
              <Header />
              <MenuPage />
              <Footer />
            </div>
          } />
          <Route path="/reservations" element={
            <div className="bg-gray-900 text-white">
              <Header />
              <ReservationsPage />
              <Footer />
            </div>
          } />
          <Route path="/order" element={
            <div className="bg-gray-900 text-white">
              <Header />
              <OrderingPage />
              <Footer />
            </div>
          } />
          <Route path="/contact" element={
            <div className="bg-gray-900 text-white">
              <Header />
              <ContactPage />
              <Footer />
            </div>
          } />
          <Route path="/about" element={
            <div className="bg-gray-900 text-white">
              <Header />
              <AboutPage />
              <Footer />
            </div>
          } />
          <Route path="/membership" element={
            <div className="bg-gray-900 text-white">
              <Header />
              <MembershipPage />
              <Footer />
            </div>
          } />
          <Route path="/events/:eventId" element={
            <div className="bg-gray-900 text-white">
              <Header />
              <EventDetailPage />
              <Footer />
            </div>
          } />
          <Route path="/press/:articleId" element={
            <div className="bg-gray-900 text-white">
              <Header />
              <PressArticlePage />
              <Footer />
            </div>
          } />
          <Route path="/suppliers/:supplierId" element={
            <div className="bg-gray-900 text-white">
              <Header />
              <SupplierPage />
              <Footer />
            </div>
          } />

          {/* CMS Routes */}
          <Route path="/cms" element={<CMSLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="reservations" element={<ReservationManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="members" element={<MemberManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="reviews" element={<ReviewManagement />} />
            <Route path="social" element={<SocialMediaManagement />} />
            <Route path="celebrities" element={<CelebrityManagement />} />
            <Route path="press" element={<PressAwardsManagement />} />
            <Route path="weather" element={<WeatherMenuManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;