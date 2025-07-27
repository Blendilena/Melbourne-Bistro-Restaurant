import { create } from 'zustand';
import { subscribeWithSelector, persist } from 'zustand/middleware';

// Types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  dietary: string[];
  image: string;
  images?: string[]; // Multiple images support
  arCode: string;
  available: boolean;
  ingredients: string[];
  preparationTime: number;
  popularity: number;
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  allergens: string[];
  spiceLevel?: number;
  chefNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
  image: string;
}

export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
  specialRequests: string;
  tableNumber?: number;
  eventId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  type: 'pickup' | 'delivery';
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  scheduledTime: string;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  deliveryAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  joinDate: string;
  totalSpent: number;
  visitCount: number;
  preferences: string[];
  allergies: string[];
  favoriteItems: string[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: number;
  maxSpots: number;
  availableSpots: number;
  image: string;
  images?: string[]; // Multiple images support
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  text: string;
  platform: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  response?: string;
  createdAt: string;
}

export interface SocialPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'twitter';
  user: string;
  content: string;
  image?: string;
  likes: number;
  time: string;
  status: 'active' | 'hidden';
  createdAt: string;
}

export interface Celebrity {
  id: string;
  name: string;
  dish: string;
  quote: string;
  image: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Award {
  id: string;
  year: string;
  award: string;
  organization: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface PressFeature {
  id: string;
  publication: string;
  headline: string;
  excerpt: string;
  date: string;
  link?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface WeatherSuggestion {
  id: string;
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'cold';
  title: string;
  description: string;
  dishes: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'reservation' | 'order' | 'review' | 'member' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: any;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  avatar: string;
  permissions: string[];
  lastLogin: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
    timezone: string;
  };
  createdAt: string;
}

export interface Analytics {
  totalReservations: number;
  totalOrders: number;
  totalMembers: number;
  totalRevenue: number;
  averageOrderValue: number;
  popularItems: { name: string; count: number }[];
  revenueByMonth: { month: string; revenue: number }[];
  reservationsByDay: { day: string; count: number }[];
}

// Store Interface
interface StoreState {
  // Data
  menuItems: MenuItem[];
  cart: CartItem[];
  reservations: Reservation[];
  orders: Order[];
  members: Member[];
  events: Event[];
  reviews: Review[];
  socialPosts: SocialPost[];
  celebrities: Celebrity[];
  awards: Award[];
  pressFeatures: PressFeature[];
  weatherSuggestions: WeatherSuggestion[];
  notifications: Notification[];
  adminUser: AdminUser | null;
  analytics: Analytics;
  
  // UI State
  isLoading: boolean;
  error: string | null;
  currentWeather: string;
  availableTables: number;
  
  // Actions
  setMenuItems: (items: MenuItem[]) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  
  // Cart Actions
  addToCart: (item: MenuItem, quantity?: number, specialInstructions?: string) => void;
  updateCartItem: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  
  setReservations: (reservations: Reservation[]) => void;
  addReservation: (reservation: Reservation) => void;
  updateReservation: (id: string, updates: Partial<Reservation>) => void;
  deleteReservation: (id: string) => void;
  
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  
  setMembers: (members: Member[]) => void;
  addMember: (member: Member) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  
  setReviews: (reviews: Review[]) => void;
  addReview: (review: Review) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  
  setSocialPosts: (posts: SocialPost[]) => void;
  addSocialPost: (post: SocialPost) => void;
  updateSocialPost: (id: string, updates: Partial<SocialPost>) => void;
  deleteSocialPost: (id: string) => void;
  
  setCelebrities: (celebrities: Celebrity[]) => void;
  addCelebrity: (celebrity: Celebrity) => void;
  updateCelebrity: (id: string, updates: Partial<Celebrity>) => void;
  deleteCelebrity: (id: string) => void;
  
  setAwards: (awards: Award[]) => void;
  addAward: (award: Award) => void;
  updateAward: (id: string, updates: Partial<Award>) => void;
  deleteAward: (id: string) => void;
  
  setPressFeatures: (features: PressFeature[]) => void;
  addPressFeature: (feature: PressFeature) => void;
  updatePressFeature: (id: string, updates: Partial<PressFeature>) => void;
  deletePressFeature: (id: string) => void;
  
  setWeatherSuggestions: (suggestions: WeatherSuggestion[]) => void;
  addWeatherSuggestion: (suggestion: WeatherSuggestion) => void;
  updateWeatherSuggestion: (id: string, updates: Partial<WeatherSuggestion>) => void;
  deleteWeatherSuggestion: (id: string) => void;
  
  // Notification Actions
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Admin Actions
  setAdminUser: (user: AdminUser) => void;
  updateAdminUser: (updates: Partial<AdminUser>) => void;
  
  setAnalytics: (analytics: Analytics) => void;
  setCurrentWeather: (weather: string) => void;
  setAvailableTables: (count: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Sync Actions
  syncToDatabase: () => Promise<void>;
  syncFromDatabase: () => Promise<void>;
  
  // Real-time table management
  updateAvailableTables: () => void;
}

// Create Store with Persistence
export const useStore = create<StoreState>()(
  persist(
    subscribeWithSelector((set, get) => ({
      // Initial State
      menuItems: [],
      cart: [],
      reservations: [],
      orders: [],
      members: [],
      events: [],
      reviews: [],
      socialPosts: [],
      celebrities: [],
      awards: [],
      pressFeatures: [],
      weatherSuggestions: [],
      notifications: [],
      adminUser: {
        id: 'admin_1',
        name: 'Admin User',
        email: 'admin@melbournebistro.com.au',
        role: 'admin',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
        permissions: ['all'],
        lastLogin: new Date().toISOString(),
        preferences: {
          theme: 'dark',
          notifications: true,
          language: 'en',
          timezone: 'Australia/Melbourne'
        },
        createdAt: new Date().toISOString()
      },
      analytics: {
        totalReservations: 0,
        totalOrders: 0,
        totalMembers: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        popularItems: [],
        revenueByMonth: [],
        reservationsByDay: []
      },
      isLoading: false,
      error: null,
      currentWeather: 'sunny',
      availableTables: 12,
      
      // Menu Actions
      setMenuItems: (items) => {
        set({ menuItems: items });
        get().syncToDatabase();
      },
      addMenuItem: (item) => {
        set((state) => ({ 
          menuItems: [...state.menuItems, item] 
        }));
        get().addNotification({
          type: 'system',
          title: 'Menu Item Added',
          message: `${item.name} has been added to the menu`,
          read: false,
          data: { itemId: item.id }
        });
        get().syncToDatabase();
      },
      updateMenuItem: (id, updates) => {
        const currentItem = get().menuItems.find(item => item.id === id);
        set((state) => ({
          menuItems: state.menuItems.map(item => 
            item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
          )
        }));
        if (currentItem) {
          get().addNotification({
            type: 'system',
            title: 'Menu Item Updated',
            message: `${currentItem.name} has been updated`,
            read: false,
            data: { itemId: id, updates }
          });
        }
        get().syncToDatabase();
      },
      deleteMenuItem: (id) => {
        const item = get().menuItems.find(item => item.id === id);
        set((state) => ({
          menuItems: state.menuItems.filter(item => item.id !== id)
        }));
        if (item) {
          get().addNotification({
            type: 'system',
            title: 'Menu Item Deleted',
            message: `${item.name} has been removed from the menu`,
            read: false,
            data: { itemId: id }
          });
        }
        get().syncToDatabase();
      },
      
      // Cart Actions
      addToCart: (item, quantity = 1, specialInstructions = '') => set((state) => {
        const existingItem = state.cart.find(cartItem => 
          cartItem.menuItemId === item.id && cartItem.specialInstructions === specialInstructions
        );
        
        if (existingItem) {
          return {
            cart: state.cart.map(cartItem =>
              cartItem.id === existingItem.id
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            )
          };
        }
        
        const newCartItem: CartItem = {
          id: `cart_${Date.now()}_${Math.random()}`,
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity,
          specialInstructions,
          image: item.image
        };
        
        return { cart: [...state.cart, newCartItem] };
      }),
      
      updateCartItem: (id, quantity) => set((state) => ({
        cart: quantity > 0 
          ? state.cart.map(item => item.id === id ? { ...item, quantity } : item)
          : state.cart.filter(item => item.id !== id)
      })),
      
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      })),
      
      clearCart: () => set({ cart: [] }),
      
      // Reservation Actions
      setReservations: (reservations) => {
        set({ reservations });
        get().syncToDatabase();
      },
      addReservation: (reservation) => {
        set((state) => {
          const newReservations = [...state.reservations, reservation];
          return { 
            reservations: newReservations,
            analytics: {
              ...state.analytics,
              totalReservations: newReservations.length
            }
          };
        });
        get().addNotification({
          type: 'reservation',
          title: 'New Reservation',
          message: `${reservation.customerName} made a reservation for ${reservation.guests} guests`,
          read: false,
          data: reservation
        });
        get().syncToDatabase();
      },
      updateReservation: (id, updates) => {
        const currentReservation = get().reservations.find(res => res.id === id);
        set((state) => ({
          reservations: state.reservations.map(reservation => 
            reservation.id === id ? { ...reservation, ...updates, updatedAt: new Date().toISOString() } : reservation
          )
        }));
        if (currentReservation) {
          get().addNotification({
            type: 'reservation',
            title: 'Reservation Updated',
            message: `Reservation for ${currentReservation.customerName} has been updated`,
            read: false,
            data: { reservationId: id, updates }
          });
        }
        get().syncToDatabase();
      },
      deleteReservation: (id) => {
        const reservation = get().reservations.find(res => res.id === id);
        set((state) => ({
          reservations: state.reservations.filter(reservation => reservation.id !== id)
        }));
        if (reservation) {
          get().addNotification({
            type: 'reservation',
            title: 'Reservation Cancelled',
            message: `Reservation for ${reservation.customerName} has been cancelled`,
            read: false,
            data: { reservationId: id }
          });
        }
        get().syncToDatabase();
      },
      
      // Order Actions
      setOrders: (orders) => {
        set({ orders });
        get().syncToDatabase();
      },
      addOrder: (order) => {
        set((state) => {
          const newOrders = [...state.orders, order];
          return { 
            orders: newOrders,
            analytics: {
              ...state.analytics,
              totalOrders: newOrders.length,
              totalRevenue: newOrders.reduce((sum, o) => sum + o.total, 0)
            }
          };
        });
        get().addNotification({
          type: 'order',
          title: 'New Order',
          message: `${order.customerName} placed a ${order.type} order`,
          read: false,
          data: order
        });
        get().syncToDatabase();
      },
      updateOrder: (id, updates) => {
        const currentOrder = get().orders.find(order => order.id === id);
        set((state) => ({
          orders: state.orders.map(order => 
            order.id === id ? { ...order, ...updates, updatedAt: new Date().toISOString() } : order
          )
        }));
        if (currentOrder) {
          get().addNotification({
            type: 'order',
            title: 'Order Updated',
            message: `Order for ${currentOrder.customerName} has been updated to ${updates.status || 'updated'}`,
            read: false,
            data: { orderId: id, updates }
          });
        }
        get().syncToDatabase();
      },
      deleteOrder: (id) => {
        const order = get().orders.find(order => order.id === id);
        set((state) => ({
          orders: state.orders.filter(order => order.id !== id)
        }));
        if (order) {
          get().addNotification({
            type: 'order',
            title: 'Order Cancelled',
            message: `Order for ${order.customerName} has been cancelled`,
            read: false,
            data: { orderId: id }
          });
        }
        get().syncToDatabase();
      },
      
      // Member Actions
      setMembers: (members) => {
        set({ members });
        get().syncToDatabase();
      },
      addMember: (member) => {
        set((state) => ({ 
          members: [...state.members, member],
          analytics: {
            ...state.analytics,
            totalMembers: state.members.length + 1
          }
        }));
        get().addNotification({
          type: 'member',
          title: 'New Member',
          message: `${member.name} joined as a ${member.membershipTier} member`,
          read: false,
          data: member
        });
        get().syncToDatabase();
      },
      updateMember: (id, updates) => {
        set((state) => ({
          members: state.members.map(member => 
            member.id === id ? { ...member, ...updates, updatedAt: new Date().toISOString() } : member
          )
        }));
        get().syncToDatabase();
      },
      deleteMember: (id) => {
        set((state) => ({
          members: state.members.filter(member => member.id !== id)
        }));
        get().syncToDatabase();
      },
      
      // Event Actions
      setEvents: (events) => {
        set({ events });
        get().syncToDatabase();
      },
      addEvent: (event) => {
        set((state) => ({ events: [...state.events, event] }));
        get().addNotification({
          type: 'system',
          title: 'New Event Created',
          message: `${event.title} has been scheduled for ${event.date}`,
          read: false,
          data: event
        });
        get().syncToDatabase();
      },
      updateEvent: (id, updates) => {
        set((state) => ({
          events: state.events.map(event => 
            event.id === id ? { ...event, ...updates, updatedAt: new Date().toISOString() } : event
          )
        }));
        get().syncToDatabase();
      },
      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter(event => event.id !== id)
        }));
        get().syncToDatabase();
      },
      
      // Review Actions
      setReviews: (reviews) => {
        set({ reviews });
        get().syncToDatabase();
      },
      addReview: (review) => {
        set((state) => ({ reviews: [...state.reviews, review] }));
        get().addNotification({
          type: 'review',
          title: 'New Review',
          message: `${review.customerName} left a ${review.rating}-star review`,
          read: false,
          data: review
        });
        get().syncToDatabase();
      },
      updateReview: (id, updates) => {
        set((state) => ({
          reviews: state.reviews.map(review => 
            review.id === id ? { ...review, ...updates } : review
          )
        }));
        get().syncToDatabase();
      },
      deleteReview: (id) => {
        set((state) => ({
          reviews: state.reviews.filter(review => review.id !== id)
        }));
        get().syncToDatabase();
      },
      
      // Social Post Actions
      setSocialPosts: (posts) => {
        set({ socialPosts: posts });
        get().syncToDatabase();
      },
      addSocialPost: (post) => {
        set((state) => ({ socialPosts: [...state.socialPosts, post] }));
        get().syncToDatabase();
      },
      updateSocialPost: (id, updates) => {
        set((state) => ({
          socialPosts: state.socialPosts.map(post => 
            post.id === id ? { ...post, ...updates } : post
          )
        }));
        get().syncToDatabase();
      },
      deleteSocialPost: (id) => {
        set((state) => ({
          socialPosts: state.socialPosts.filter(post => post.id !== id)
        }));
        get().syncToDatabase();
      },
      
      // Celebrity Actions
      setCelebrities: (celebrities) => {
        set({ celebrities });
        get().syncToDatabase();
      },
      addCelebrity: (celebrity) => {
        set((state) => ({ celebrities: [...state.celebrities, celebrity] }));
        get().syncToDatabase();
      },
      updateCelebrity: (id, updates) => {
        set((state) => ({
          celebrities: state.celebrities.map(celebrity => 
            celebrity.id === id ? { ...celebrity, ...updates } : celebrity
          )
        }));
        get().syncToDatabase();
      },
      deleteCelebrity: (id) => {
        set((state) => ({
          celebrities: state.celebrities.filter(celebrity => celebrity.id !== id)
        }));
        get().syncToDatabase();
      },
      
      // Award Actions
      setAwards: (awards) => {
        set({ awards });
        get().syncToDatabase();
      },
      addAward: (award) => {
        set((state) => ({ awards: [...state.awards, award] }));
        get().syncToDatabase();
      },
      updateAward: (id, updates) => {
        set((state) => ({
          awards: state.awards.map(award => 
            award.id === id ? { ...award, ...updates } : award
          )
        }));
        get().syncToDatabase();
      },
      deleteAward: (id) => {
        set((state) => ({
          awards: state.awards.filter(award => award.id !== id)
        }));
        get().syncToDatabase();
      },
      
      // Press Feature Actions
      setPressFeatures: (features) => {
        set({ pressFeatures: features });
        get().syncToDatabase();
      },
      addPressFeature: (feature) => {
        set((state) => ({ pressFeatures: [...state.pressFeatures, feature] }));
        get().syncToDatabase();
      },
      updatePressFeature: (id, updates) => {
        set((state) => ({
          pressFeatures: state.pressFeatures.map(feature => 
            feature.id === id ? { ...feature, ...updates } : feature
          )
        }));
        get().syncToDatabase();
      },
      deletePressFeature: (id) => {
        set((state) => ({
          pressFeatures: state.pressFeatures.filter(feature => feature.id !== id)
        }));
        get().syncToDatabase();
      },
      
      // Weather Suggestion Actions
      setWeatherSuggestions: (suggestions) => {
        set({ weatherSuggestions: suggestions });
        get().syncToDatabase();
      },
      addWeatherSuggestion: (suggestion) => {
        set((state) => ({ 
          weatherSuggestions: [...state.weatherSuggestions, suggestion] 
        }));
        get().syncToDatabase();
      },
      updateWeatherSuggestion: (id, updates) => {
        set((state) => ({
          weatherSuggestions: state.weatherSuggestions.map(suggestion => 
            suggestion.id === id ? { ...suggestion, ...updates } : suggestion
          )
        }));
        get().syncToDatabase();
      },
      deleteWeatherSuggestion: (id) => {
        set((state) => ({
          weatherSuggestions: state.weatherSuggestions.filter(suggestion => suggestion.id !== id)
        }));
        get().syncToDatabase();
      },
      
      // Notification Actions
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: `notif_${Date.now()}_${Math.random()}`,
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50) // Keep only last 50
        }));
      },
      markNotificationRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
          )
        }));
      },
      markAllNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(notif => ({ ...notif, read: true }))
        }));
      },
      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(notif => notif.id !== id)
        }));
      },
      clearNotifications: () => {
        set({ notifications: [] });
      },
      
      // Admin Actions
      setAdminUser: (user) => {
        set({ adminUser: user });
      },
      updateAdminUser: (updates) => {
        set((state) => ({
          adminUser: state.adminUser ? { ...state.adminUser, ...updates } : null
        }));
      },
      
      // General Actions
      setAnalytics: (analytics) => set({ analytics }),
      setCurrentWeather: (weather) => set({ currentWeather: weather }),
      setAvailableTables: (count) => set({ availableTables: count }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      
      // Sync Actions
      syncToDatabase: async () => {
        // Simulate database sync
        console.log('Syncing to database...');
        const state = get();
        try {
          // In a real app, this would be an API call
          localStorage.setItem('melbourne-bistro-backup', JSON.stringify({
            menuItems: state.menuItems,
            reservations: state.reservations,
            orders: state.orders,
            members: state.members,
            events: state.events,
            reviews: state.reviews,
            socialPosts: state.socialPosts,
            celebrities: state.celebrities,
            awards: state.awards,
            pressFeatures: state.pressFeatures,
            weatherSuggestions: state.weatherSuggestions,
            lastSync: new Date().toISOString()
          }));
          console.log('Database sync completed');
        } catch (error) {
          console.error('Database sync failed:', error);
          set({ error: 'Failed to sync to database' });
        }
      },
      
      syncFromDatabase: async () => {
        // Simulate database sync
        console.log('Syncing from database...');
        try {
          const backup = localStorage.getItem('melbourne-bistro-backup');
          if (backup) {
            const data = JSON.parse(backup);
            set({
              menuItems: data.menuItems || [],
              reservations: data.reservations || [],
              orders: data.orders || [],
              members: data.members || [],
              events: data.events || [],
              reviews: data.reviews || [],
              socialPosts: data.socialPosts || [],
              celebrities: data.celebrities || [],
              awards: data.awards || [],
              pressFeatures: data.pressFeatures || [],
              weatherSuggestions: data.weatherSuggestions || []
            });
            console.log('Database sync from backup completed');
          }
        } catch (error) {
          console.error('Database sync failed:', error);
          set({ error: 'Failed to sync from database' });
        }
      },
      
      // Real-time table management
      updateAvailableTables: () => {
        const { reservations } = get();
        const today = new Date().toISOString().split('T')[0];
        const currentHour = new Date().getHours();
        
        // Count reservations for today that are currently active (seated or confirmed for current time)
        const activeReservations = reservations.filter(reservation => {
          if (reservation.date !== today) return false;
          if (reservation.status === 'cancelled' || reservation.status === 'completed') return false;
          
          const reservationHour = parseInt(reservation.time.split(':')[0]);
          // Consider reservation active if it's within 2 hours of current time
          return Math.abs(reservationHour - currentHour) <= 2;
        }).length;
        
        // Calculate available tables (assuming 20 total tables)
        const totalTables = 20;
        const availableTables = Math.max(0, totalTables - activeReservations);
        
        set({ availableTables });
      }
    })),
    {
      name: 'melbourne-bistro-store',
      partialize: (state) => ({
        menuItems: state.menuItems,
        reservations: state.reservations,
        orders: state.orders,
        members: state.members,
        events: state.events,
        reviews: state.reviews,
        socialPosts: state.socialPosts,
        celebrities: state.celebrities,
        awards: state.awards,
        pressFeatures: state.pressFeatures,
        weatherSuggestions: state.weatherSuggestions,
        notifications: state.notifications,
        adminUser: state.adminUser,
        analytics: state.analytics
      })
    }
  )
);

// Update available tables every minute
setInterval(() => {
  useStore.getState().updateAvailableTables();
}, 60000);