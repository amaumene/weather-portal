# Weather Portal

A modern, type-safe weather portal application for Japanese locations, built with Vue 3, TypeScript, and a clean layered architecture.

## 🌟 Features

- **Location Search**: Search for Japanese locations using OpenStreetMap Nominatim API
- **Weather Service Integration**: Quick access to multiple weather services (SCW, Windy, Weather News)
- **Mountain Weather**: Automatic integration with Yamaten mountain weather forecasts
- **Favorites**: Save frequently accessed locations
- **Search History**: Track and revisit recent searches
- **Responsive Design**: Mobile-first design with adaptive UI
- **Offline Caching**: Smart caching with LRU eviction and TTL support
- **URL Sharing**: Shareable location links

## 🏗️ Architecture

This application follows a **clean, layered architecture** with clear separation of concerns:

```
src/
├── domain/              # Business logic (entities, value objects, services)
├── application/         # Use cases and orchestration
├── infrastructure/      # External concerns (API, cache, storage, repositories)
├── presentation/        # Vue composables
├── vue/                 # Vue components
└── config/              # Configuration files
```

## 🚀 Getting Started

### Development

```bash
# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## 📚 Key Improvements

### ✅ Security Fixes
- Fixed XSS vulnerability
- Added comprehensive input validation
- Implemented proper error boundaries

### ✅ Architecture Refactoring
- Clean layered architecture (Domain → Application → Infrastructure → Presentation)
- Repository pattern for data access
- Dependency injection for testability
- Value objects for type safety

### ✅ Code Quality
- Removed 40+ lines of duplicated CSS
- Fixed memory leaks and race conditions
- Added accessibility improvements
- Fixed all magic numbers and typos

### ✅ Performance Optimizations
- Spatial indexing for O(1) mountain lookups
- LRU cache with TTL and automatic eviction
- Search debouncing (300ms)
- AbortController for request cancellation

### ✅ Testing
- Vitest configuration
- Comprehensive domain layer tests
- Test utilities and fixtures

## 📦 Tech Stack

- Vue 3 + Composition API
- TypeScript 5+
- Vite
- VueUse
- Turf.js (geospatial)
- Vitest (testing)

## 📄 License

MIT License

---

**Built with ❤️ using modern web technologies**
