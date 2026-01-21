<h1 align="center">
  <img alt="logo" src="./assets/icon.png" width="124px" style="border-radius:10px"/><br/>
  Wordrizz - Vocabulary Learning App
</h1>

<p align="center">
  📚 A modern, feature-rich mobile application for mastering vocabulary through interactive learning, word packs, quizzes, and community engagement.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81.5-61dafb?style=flat-square&logo=react" alt="React Native"/>
  <img src="https://img.shields.io/badge/Expo-~54.0-000020?style=flat-square&logo=expo" alt="Expo"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178c6?style=flat-square&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/NativeWind-4.2.1-38bdf8?style=flat-square" alt="NativeWind"/>
</p>

---

## 🎯 About Wordrizz

Wordrizz is a comprehensive vocabulary learning platform designed to help users expand their word knowledge through curated word packs, interactive quizzes, and an engaging community feed. Built with modern React Native technologies, it provides a seamless cross-platform experience on iOS and Android.

### ✨ Key Features

- **🔍 Smart Word Search** - Advanced search with autocomplete functionality
- **📦 Word Packs** - Subscribe to curated word collections (IELTS, GRE, SAT, and more)
- **🎯 Interactive Quizzes** - Test your knowledge with engaging quiz challenges
- **📊 Analytics Dashboard** - Track your learning progress with detailed statistics
- **👥 Community Feed** - Share insights and learn from other users
- **⭐ Reviews & Ratings** - Rate and review word packs
- **🌓 Dark Mode** - Beautiful UI with automatic theme switching
- **🌍 Internationalization** - Multi-language support with i18next
- **🔐 Secure Authentication** - JWT-based auth with MMKV secure storage
- **📱 Responsive Design** - Optimized for all screen sizes

---

## 🚀 Quick Start

### Prerequisites

- [Node.js LTS release](https://nodejs.org/en/)
- [Pnpm](https://pnpm.io/installation) (v9.12.3 or higher)
- [Git](https://git-scm.com/)
- [Watchman](https://facebook.github.io/watchman/docs/install) (macOS/Linux only)
- [React Native dev environment](https://reactnative.dev/docs/environment-setup) (for native builds)
- [Cursor](https://www.cursor.com/) or [VS Code](https://code.visualstudio.com/) with recommended extensions

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/efazulkarim/vocab-mobile-ui.git
   cd vocab-mobile-ui
   ```

2. **Install dependencies**

   ```sh
   pnpm install
   ```

3. **Configure environment**

   ```sh
   # Copy environment template
   cp .env.example .env

   # Update .env with your API credentials
   ```

4. **Start the development server**

   ```sh
   # Start Expo development server
   pnpm start

   # Run on iOS
   pnpm ios

   # Run on Android
   pnpm android
   ```

---

## 🏗️ Project Structure

```
src/
├── api/                    # API integration & React Query hooks
│   ├── auth/              # Authentication endpoints
│   ├── words/             # Word search & autocomplete
│   ├── packs/             # Word pack management
│   ├── quiz/              # Quiz endpoints
│   ├── posts/             # Community feed
│   ├── reviews/           # Ratings & reviews
│   ├── analytics/         # User statistics
│   └── subscription/      # Pack subscriptions
├── app/                   # Expo Router screens
│   ├── (app)/            # Authenticated screens
│   ├── login.tsx         # Login screen
│   ├── register.tsx      # Registration screen
│   └── onboarding.tsx    # Onboarding flow
├── components/            # Reusable UI components
├── store/                 # Zustand global state
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
├── animations/            # Reanimated animations
└── translations/          # i18n translation files
```

---

## 🛠️ Tech Stack

### Core Technologies

- **[React Native](https://reactnative.dev/)** - Cross-platform mobile development
- **[Expo](https://expo.dev/)** (v54) - Development platform with EAS Build
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - File-based navigation

### UI & Styling

- **[NativeWind](https://www.nativewind.dev/)** (v4) - Tailwind CSS for React Native
- **[Lucide React Native](https://lucide.dev/)** - Beautiful icon library
- **[Moti](https://moti.fyi/)** - Declarative animations
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** - High-performance animations
- **[React Native Gifted Charts](https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts)** - Analytics charts

### State & Data Management

- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[React Query](https://tanstack.com/query)** - Server state & caching
- **[React Query Kit](https://github.com/liaoliao666/react-query-kit)** - Query hooks utilities
- **[Axios](https://axios-http.com/)** - HTTP client
- **[MMKV](https://github.com/mrousavy/react-native-mmkv)** - Fast, secure storage

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Developer Experience

- **[ESLint](https://eslint.org/)** - Code linting with custom rules
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[Lint-staged](https://github.com/lint-staged/lint-staged)** - Run linters on staged files
- **[Jest](https://jestjs.io/)** - Unit testing
- **[Maestro](https://maestro.mobile.dev/)** - E2E testing

---

## 📱 Key Features Breakdown

### Authentication System

- Secure JWT-based authentication
- Registration with email verification
- Password reset functionality
- Persistent session with MMKV storage
- Auto-login on app launch

### Word Management

- Real-time word search with debouncing
- Smart autocomplete suggestions
- Detailed word definitions
- Audio pronunciations (if available)
- Save favorite words

### Word Packs

- Browse curated word collections
- Subscribe/unsubscribe to packs
- Track learning progress
- IELTS, GRE, SAT, and custom packs
- Pack details with word previews

### Quiz System

- Multiple-choice questions
- Timed quizzes
- Score tracking
- Leaderboard (weekly & monthly)
- Detailed result analysis
- Retry failed quizzes

### Community Feed

- Share vocabulary insights
- Like and comment on posts
- Follow other learners
- Discover trending words
- Community challenges

### Analytics Dashboard

- Learning streak tracking
- Words learned statistics
- Quiz performance metrics
- Progress visualization
- Goal setting and tracking

---

## 🔧 Available Scripts

### Development

```sh
pnpm start              # Start Expo dev server
pnpm ios                # Run on iOS simulator
pnpm android            # Run on Android emulator
pnpm web                # Run on web browser
```

### Staging Environment

```sh
pnpm start:staging
pnpm ios:staging
pnpm android:staging
```

### Production Environment

```sh
pnpm start:production
pnpm ios:production
pnpm android:production
```

### Building

```sh
# Development builds
pnpm build:development:ios
pnpm build:development:android

# Staging builds
pnpm build:staging:ios
pnpm build:staging:android

# Production builds
pnpm build:production:ios
pnpm build:production:android
```

### Quality Assurance

```sh
pnpm lint               # Run ESLint
pnpm type-check         # Run TypeScript check
pnpm test               # Run Jest tests
pnpm test:watch         # Run tests in watch mode
pnpm check-all          # Run all checks (lint + type + test)
pnpm e2e-test           # Run Maestro E2E tests
```

---

## 🌍 Multi-Environment Setup

The app supports three environments:

- **Development** - Local development with debug features
- **Staging** - Pre-production testing environment
- **Production** - Live production environment

Each environment has its own:

- API endpoint configuration
- App bundle identifier
- Environment variables
- Build profiles

---

## 🎨 Design System

The app follows a premium design aesthetic with:

- Modern glassmorphism effects
- Smooth micro-animations
- Consistent color palette
- Dark mode support
- Responsive layouts
- Accessible UI components

---

## 📚 API Integration

The app integrates with a RESTful API backend. Key endpoints:

- **Auth**: `/auth/login`, `/auth/register`, `/auth/refresh`
- **Words**: `/words/search`, `/words/autocomplete`, `/words/{id}`
- **Packs**: `/packs`, `/packs/{id}`, `/packs/subscribe`
- **Quiz**: `/quiz/start`, `/quiz/submit`, `/quiz/leaderboard`
- **Posts**: `/posts`, `/posts/{id}`, `/posts/like`
- **Analytics**: `/analytics/stats`, `/analytics/progress`

---

## 🧪 Testing

### Unit Tests

```sh
pnpm test
pnpm test:watch
```

### E2E Tests

```sh
# Install Maestro
pnpm install-maestro

# Run E2E tests
pnpm e2e-test
```

---

## 🚢 Deployment

### EAS Build & Submit

The project uses [Expo Application Services (EAS)](https://docs.expo.dev/eas/) for building and deploying:

```sh
# Build for app stores
eas build --platform ios --profile production
eas build --platform android --profile production

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

### Over-the-Air Updates

```sh
# Publish updates
eas update --branch production
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the code style (run `pnpm lint` and `pnpm type-check`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Code Style Guidelines

- Use TypeScript for all new code
- Follow the existing project structure
- Write unit tests for new features
- Keep functions under 90 lines
- Use functional components with hooks
- Follow REST API design rules (see user rules)

---

## 📖 Documentation

For more detailed documentation, see:

- [Obytes Starter Documentation](https://starter.obytes.com)
- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [NativeWind v4 Docs](https://www.nativewind.dev/v4/overview)
- [React Query Docs](https://tanstack.com/query/latest)

---

## 🐛 Troubleshooting

### Common Issues

**Metro bundler issues**

```sh
# Clear cache and restart
pnpm start --clear
```

**Build failures**

```sh
# Clean and rebuild
rm -rf node_modules
pnpm install
pnpm prebuild --clean
```

**iOS pod install issues**

```sh
cd ios
pod deintegrate
pod install
cd ..
```

---

## 📄 License

This project is **MIT licensed**.

---

## 👨‍💻 Author

**Md Efazul Karim**

- GitHub: [@efazulkarim](https://github.com/efazulkarim)
- Project: [vocab-mobile-ui](https://github.com/efazulkarim/vocab-mobile-ui)

---

## 🙏 Acknowledgments

- Built on [Obytes React Native Starter](https://starter.obytes.com)
- Icons by [Lucide Icons](https://lucide.dev/)
- Animations powered by [Reanimated](https://docs.swmansion.com/react-native-reanimated/)

---

<p align="center">Made with ❤️ and ☕ by the Wordrizz Team</p>
