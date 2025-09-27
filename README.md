# ⚽ Sports League Explorer

A responsive React application for browsing and exploring sports leagues from around the world. Built with TypeScript, React Query, and styled-components for optimal performance and user experience.

## 🌟 Features

### 🏠 League Browser

- **Comprehensive League List**: Browse 50+ sports leagues from various sports
- **Real-time Search**: Instantly search leagues by name with live filtering
- **Sport Filtering**: Filter leagues by sport type (Soccer, Basketball, Motorsport, etc.)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 📱 Mobile-First Design

- **Touch-Friendly Interface**: Large touch targets and mobile-optimized controls
- **Custom Dropdown**: Native mobile dropdown with large, easy-to-tap options
- **Responsive Table**: Desktop grid view transforms to mobile card layout
- **Zebra Striping**: Alternating row colors for better readability on desktop


### ⚡ Performance Optimizations

- **React Query Caching**: Intelligent data caching with 10-15 minute stale times
- **Memoization**: Optimized filtering and search with React.memo and useMemo
- **Background Refetching**: Automatic data updates without blocking UI

## 🛠️ Tech Stack

### Frontend Framework

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with full IntelliSense
- **Vite** - Lightning-fast build tool and development server

### Styling & UI

- **Styled Components** - CSS-in-JS with theme support and responsive design
- **Google Fonts (Raleway)** - Modern, clean typography
- **Responsive Design** - Mobile-first approach with CSS Grid and Flexbox

### State Management & Data Fetching

- **TanStack Query (React Query)** - Powerful data synchronization and caching
- **Custom Hooks** - Reusable data fetching logic
- **React Router** - Client-side routing with URL parameters

### Code Quality

- **ESLint** - Code linting and style enforcement
- **TypeScript** - Static type checking
- **React.memo** - Performance optimization for components

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sports-league-explorer
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # The .env file should contain:
   VITE_API_URL="https://www.thesportsdb.com/api/v1/json/3/all_leagues.php"
   VITE_SEASON_API_URL="https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id="
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`



## 🎨 Design System

### Color Palette

- **Primary Blue**: `#007bff` - Interactive elements and focus states
- **Grey Scale**: `#f8f9fa`, `#e9ecef`, `#666`, `#333` - Backgrounds and text
- **Success/Error**: Standard semantic colors for states

### Typography

- **Font Family**: Raleway (Google Fonts)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold)
- **Responsive Sizing**: 14px-22px based on screen size

### Responsive Breakpoints

- **Desktop**: 769px and above
- **Tablet**: 768px and below
- **Mobile**: 480px and below


### Layout Adaptations

- **Desktop**: 3-column grid layout with hover effects
- **Mobile**: Card-based layout with stacked information
- **Navigation**: Full-width buttons and touch-friendly spacing


### Error Handling

- **Network Errors**: Automatic retry with exponential backoff
- **Loading States**: Skeleton screens and loading indicators
- **Fallback UI**: Graceful degradation for missing data

## 🚀 Performance Features

### Caching Strategy

```typescript
// League data: 10 minutes stale time
staleTime: 10 * 60 * 1000;

// Season data: 15 minutes stale time
staleTime: 15 * 60 * 1000;
```

### Optimization Techniques

- **React.memo**: Prevents unnecessary re-renders
- **useMemo**: Memoized filtering and sorting
- **useCallback**: Stable function references
- **Code Splitting**: Lazy loading for better initial load times


## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🎨 Design Decisions

### Architecture Choices

#### **Styled Components over CSS Modules**

- **Reasoning**: Better TypeScript integration, theme support, and component co-location
- **Benefits**: Scoped styles, dynamic styling based on props, no naming conflicts
- **Trade-offs**: Slightly larger bundle size, but better developer experience

#### **React Query for Data Management**

- **Reasoning**: Superior caching, background updates, and error handling compared to useState/useEffect
- **Benefits**: Automatic retries, optimistic updates, offline support
- **Configuration**: 10-15 minute stale times based on data volatility

#### **Custom Dropdown vs Native Select**

- **Problem**: Native `<select>` options can't be styled consistently across mobile browsers
- **Solution**: Custom dropdown component with full styling control
- **Benefits**: Large touch targets (60-65px), consistent UX across devices
- **Trade-offs**: More complex implementation, but significantly better mobile experience

#### **Mobile-First Responsive Design**

- **Approach**: Start with mobile constraints, progressively enhance for larger screens
- **Breakpoints**: 480px (mobile), 768px (tablet), 769px+ (desktop)
- **Benefits**: Better performance on mobile, cleaner CSS, future-proof design

### Performance Decisions

#### **Memoization Strategy**

```typescript
// Expensive operations are memoized
const availableSports = useMemo(() => {
  // Only recalculate when leaguesData changes
}, [leaguesData]);

const filteredLeagues = useMemo(() => {
  // Only refilter when dependencies change
}, [leaguesData, searchTerm, selectedSport]);
```

#### **Component Optimization**

- **React.memo**: Applied to LeagueRow to prevent unnecessary re-renders
- **useCallback**: Stable function references for event handlers
- **Lazy Loading**: Considered for future route-based code splitting

### UX Design Decisions

#### **Search & Filter Combination**

- **Design**: Search input + sport dropdown side-by-side (desktop), stacked (mobile)
- **Reasoning**: Users often want to search within a specific sport category
- **Implementation**: Real-time filtering with debounced search for performance

#### **Table vs Card Layout**

- **Desktop**: Traditional table with zebra striping for data density
- **Mobile**: Card layout for better touch interaction and readability
- **Transition**: CSS media queries handle the responsive transformation


### Typography & Visual Hierarchy

#### **Font Choice: Raleway**

- **Reasoning**: Modern, clean sans-serif with excellent readability
- **Weights Used**: 400 (body), 500 (buttons), 600 (headers), 700 (titles)
- **Performance**: Google Fonts with preconnect for faster loading


### Accessibility Considerations

#### **Touch Targets**

- **Minimum Size**: 44px (WCAG AA compliance)
- **Mobile Optimization**: 60-65px for better usability
- **Spacing**: Adequate gaps between interactive elements

#### **Keyboard Navigation**

- **Focus Management**: Visible focus indicators on all interactive elements
- **Tab Order**: Logical navigation flow through the interface
- **Screen Readers**: Semantic HTML and ARIA labels where needed




**Built with ❤️ using React, TypeScript, and modern web technologies**
