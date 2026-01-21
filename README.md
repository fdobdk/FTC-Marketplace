# FTC Marketplace

A marketplace platform for FTC (FIRST Tech Challenge) teams to connect and exchange robot parts.

## Features

- **Team Accounts** - Teams can create accounts with multiple individual members
- **Individual Accounts** - Members join teams, transactions tracked per person
- **Parts Listings** - Post items you have (to give/trade) or want (looking for)
- **Location Filtering** - Find teams by state/city
- **Contact System** - View team contact info when logged in
- **Modern UI** - Clean design with smooth Framer Motion animations

## Tech Stack

- **Frontend**: React 18 + Vite + Framer Motion
- **Backend**: PHP 8+
- **Database**: MySQL
- **Styling**: Custom CSS with CSS Variables

## Setup Instructions

### Prerequisites

- XAMPP (or similar with Apache, PHP 8+, MySQL)
- Node.js 18+
- npm or yarn

### 1. Database Setup

1. Start XAMPP and ensure MySQL is running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Import the database schema:
   - Click "Import"
   - Select `database/schema.sql`
   - Click "Go"

Or run via command line:
```bash
mysql -u root -p < database/schema.sql
```

### 2. Backend Configuration

1. Edit `api/config/database.php` if your MySQL credentials differ from defaults:
```php
private $host = 'localhost';
private $db_name = 'ftc_marketplace';
private $username = 'root';
private $password = '';  // Add your MySQL password if set
```

2. Ensure Apache has mod_rewrite enabled for the API routes

### 3. Frontend Setup

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will run at http://localhost:3000

### 4. Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Project Structure

```
FTC-Marketplace/
├── api/                    # PHP Backend
│   ├── auth/              # Authentication endpoints
│   ├── listings/          # Listings CRUD
│   ├── teams/             # Teams CRUD
│   ├── config/            # Database & CORS config
│   └── utils/             # Helper functions
├── database/
│   └── schema.sql         # MySQL database schema
├── src/                   # React Frontend
│   ├── components/        # Reusable components
│   ├── pages/             # Page components
│   ├── context/           # React context (auth)
│   ├── utils/             # API client, constants
│   └── styles/            # Global CSS
├── public/                # Static assets
├── index.html             # Entry HTML
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password

### Teams
- `GET /api/teams` - List all teams (filterable by state)
- `POST /api/teams` - Create new team
- `GET /api/teams/:id` - Get team details

### Listings
- `GET /api/listings` - List all listings (filterable)
- `POST /api/listings` - Create new listing
- `GET /api/listings/:id` - Get listing details
- `PUT /api/listings/:id` - Update listing
- `DELETE /api/listings/:id` - Delete listing
- `GET /api/listings/my` - Get current user's listings

## Categories

- Motors
- Sensors
- Structural Parts
- Electronics
- Wheels & Drivetrain
- 3D Printed Parts
- Control Systems
- Hardware & Fasteners
- Other

## License

This is a community project. Not affiliated with FIRST.
