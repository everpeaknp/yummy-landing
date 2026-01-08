# Yummy - Restaurant Management System
A comprehensive Flutter-based restaurant management application with multi-role support (Admin, Staff, Kitchen). Built with Clean Architecture and BLoC pattern for state management.

## 🚀 Features

### Core Features
- **Multi-role Authentication**: Admin, Staff, and Kitchen roles with role-based routing
- **Restaurant Management**: Complete restaurant profile setup and management
- **Order Management**: Create and manage orders (dine-in, pickup, group orders)
- **Menu Management**: Full CRUD operations for menu items and categories
- **Table Management**: Manage restaurant tables and table types
- **Kitchen Operations**: Kitchen dashboard with KOT (Kitchen Order Ticket) system
- **Staff Portal**: Dedicated dashboard for staff members
- **Finance Management**: Track expenses, income, purchases, and generate reports
- **Group Management**: Organize orders by groups

### ☁️ Deployment & Cloud Infrastructure
Yummy is designed to run on cloud infrastructure with a serverless-first approach for cost efficiency.

**Planned production infrastructure:**
- **Backend API**: Google Cloud Run (FastAPI)
- **Database**: PostgreSQL (Cloud SQL)
- **Authentication**: Firebase Authentication
- **File Storage**: Google Cloud Storage
- **Notifications**: Firebase Cloud Messaging (FCM)

This setup allows Yummy to scale efficiently while keeping costs affordable for restaurants in developing markets like Nepal.

### Technical Features
- Clean Architecture with feature-based structure
- BLoC pattern for state management
- Secure token storage with automatic refresh
- Environment-based configuration
- Error handling and user-friendly error messages
- Dark/Light theme support
- Multi-platform support (Android, iOS, Web, Windows, Linux, macOS)

## 📌 Project Status
- **MVP**: Nearly complete
- **Current focus**: Pilot testing with local restaurants
- **Next milestone**: Production deployment on Google Cloud

## 📋 Prerequisites
- Flutter SDK: ^3.9.2
- Dart SDK: ^3.9.2
- Android Studio / VS Code with Flutter extensions
- Git

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd yummy
```

### 2. Install Dependencies
```bash
flutter pub get
```

### 3. Environment Configuration
Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
BASE_URL=https://yummy-2xfq.onrender.com
ENVIRONMENT=prod
API_TIMEOUT=40
TOKEN_TTL=24
TOKEN_REFRESH_BUFFER=5
```

**Note**: For local development, you can use:
```env
BASE_URL=http://192.168.1.85:8000
ENVIRONMENT=dev
```

### 4. Run the Application
```bash
flutter run
```

## 📁 Project Structure

```
lib/
├── core/                    # Shared infrastructure
│   ├── config/              # App configuration (environment variables)
│   ├── di/                  # Dependency injection setup
│   ├── routes/              # Navigation/router
│   ├── themes/              # App theming
│   ├── services/            # Core services (storage, API, etc.)
│   ├── error/               # Error handling
│   ├── mapper/              # Data mappers
│   └── widgets/             # Reusable widgets
│
└── features/                # Feature modules
    ├── auth/                # Authentication
    │   ├── data/           # Data layer (models, datasources, repositories)
    │   ├── domain/         # Domain layer (entities, repositories, usecases)
    │   └── presentation/   # Presentation layer (BLoC, screens, widgets)
    ├── admin/               # Admin dashboard
    ├── orders/              # Order management
    ├── menu/                # Menu management
    ├── tables/              # Table management
    ├── kitchen/             # Kitchen operations
    ├── staff_portal/        # Staff dashboard
    ├── finance/             # Financial management
    └── ...                  # Other features
```

## 🏗️ Architecture

### Clean Architecture
The project follows Clean Architecture principles with three main layers:
1.  **Presentation Layer**: UI components, BLoC, screens, widgets
2.  **Domain Layer**: Business logic, entities, use cases, repository interfaces
3.  **Data Layer**: Data sources, models, repository implementations

### State Management
- **BLoC Pattern**: Used for state management across all features
- **Repository Pattern**: Abstracts data sources
- **Use Cases**: Encapsulate business logic

### Dependency Injection
- **GetIt**: Service locator for dependency injection
- All dependencies registered in `lib/core/di/di.dart`

## 🔐 Security

### Token Storage
- Uses `flutter_secure_storage` for encrypted token storage
- Automatic token refresh with configurable TTL
- Secure storage configured per platform:
    - Android: Encrypted SharedPreferences
    - iOS: Keychain with first unlock accessibility
    - Linux: Session keyring
    - Windows: Modern secure storage

### API Security
- JWT token-based authentication
- Automatic token refresh on expiration
- Request retry on 401 errors
- Unauthorized logout stream for global auth state management

## 🌐 API Configuration

### Base URL
Configured via environment variables in `.env` file:
- Production: `https://yummy-2xfq.onrender.com`
- Development: `http://192.168.1.85:8000` (or your local server)

### API Endpoints
Main API endpoints are defined in `lib/core/app_apis.dart`:
- Authentication: `/auth/login`, `/auth/refresh`, `/auth/logout`
- Users: `/users/`, `/users/admin/register`
- Orders, Menu, Tables, etc.

## 🧪 Testing

### Running Tests
```bash
# Run all tests
flutter test

# Run tests with coverage
flutter test --coverage
```

### Test Structure
```
test/
├── unit/              # Unit tests for use cases, repositories
├── widget/            # Widget tests
└── bloc/              # BLoC tests
```

### Example Test
See `test/` directory for test examples. Add tests for:
- Use cases
- BLoCs
- Repositories
- Widgets

## 🎨 Theming
The app supports both light and dark themes:
- Theme configuration: `lib/core/themes/app_theme.dart`
- Colors: `lib/core/themes/app_colors.dart`
- Theme mode controlled by Settings BLoC

## 📱 Platform Support
- ✅ Android
- ✅ iOS
- ✅ Web
- ✅ Windows
- ✅ Linux
- ✅ macOS

## 🔧 Development

### Code Style
- Follows Flutter/Dart style guide
- Uses `flutter_lints` for linting
- Run `dart format .` before committing

### Adding a New Feature
1.  Create feature directory under `lib/features/`
2.  Follow Clean Architecture structure:
    -   `data/`: Models, datasources, repository implementations
    -   `domain/`: Entities, repository interfaces, use cases
    -   `presentation/`: BLoC, screens, widgets
3.  Register dependencies in `lib/core/di/di.dart`
4.  Add routes in `lib/core/routes/app_router.dart`

### Error Handling
- Centralized error messages: `lib/core/error/error_messages.dart`
- Error widgets: `lib/core/widgets/error_widget.dart`
- Error handler utility: `lib/core/widgets/error_boundary.dart`

## 📦 Dependencies

### Main Dependencies
- `flutter_bloc`: State management
- `dio`: HTTP client
- `get_it`: Dependency injection
- `fpdart`: Functional programming utilities
- `flutter_secure_storage`: Secure storage
- `flutter_dotenv`: Environment configuration
- `google_fonts`: Typography
- `cached_network_image`: Image caching

See `pubspec.yaml` for complete list.

## 🐛 Troubleshooting

### Common Issues
1.  **Environment variables not loading**
    -   Ensure `.env` file exists in root directory
    -   Check that `AppConfig.load()` is called in `main.dart`

2.  **Token storage issues**
    -   Verify `flutter_secure_storage` is properly configured
    -   Check platform-specific storage permissions

3.  **API connection errors**
    -   Verify `BASE_URL` in `.env` file
    -   Check network connectivity
    -   Verify API server is running

## 👥 Contributors
- **Niraj Adhikari**

## 📞 Support
- **Gmail**: everacy.np@gmail.com

For issues and questions, please open an issue on the repository.

---
**Note**: This project is an MVP preparing for production deployment and pilot restaurant onboarding.
