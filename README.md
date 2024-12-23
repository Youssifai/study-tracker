# StudyTracker

A modern web application built with Next.js 13 that helps students track their study sessions, manage courses, and collaborate with study groups.

## Features

### Authentication
- Secure user authentication using NextAuth.js
- Email and password-based registration and login
- Protected routes for authenticated users

### Dashboard
- Personal study timer with start/stop functionality
- Daily study progress tracking
- Todo list management with priority levels
- Group activity overview
- Dark/Light theme toggle

### Study Groups
- Create or join study groups using invite codes
- View group members and their study progress
- Monthly leaderboard showing study time rankings
- Daily activity tracking for group members
- Group owner controls (rename group, remove members)

### Courses
- Add and manage courses
- Track study time per course
- Set exam dates and view countdown timers
- Organize todos by course

### Progress Tracking
- Visual representation of daily and weekly study goals
- Study streak tracking
- Time-based statistics and analytics
- Group performance comparisons

## Tech Stack

- **Frontend**: Next.js 13, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: TailwindCSS with dark mode support
- **Icons**: Lucide Icons
- **State Management**: React Hooks and Context

## Project Structure

```
studytracker/
├── app/
│   ├── (protected)/         # Protected routes requiring authentication
│   │   ├── dashboard/       # Main dashboard
│   │   ├── courses/        # Course management
│   │   └── group/          # Group features
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── courses/        # Course management
│   │   ├── groups/         # Group management
│   │   ├── sessions/       # Study session tracking
│   │   ├── statistics/     # Progress statistics
│   │   └── todos/          # Todo management
│   └── components/         # Reusable React components
├── prisma/                 # Database schema and migrations
├── lib/                    # Utility functions and configurations
└── public/                 # Static assets
```

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/studytracker.git
cd studytracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/studytracker"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Key Components

### StudyProgress
Displays user's study progress including:
- Weekly study goal progress
- Daily study time tracking
- Study streak information

### DailyTeamProgress
Shows team members' daily progress:
- Todo completion status
- Study time tracking
- Real-time updates

### GroupActions
Handles group-related actions:
- Group creation
- Joining groups via invite code
- Group management

### TodoList
Manages study tasks:
- Create and organize todos
- Set priorities
- Mark tasks as complete
- Filter by course

## Database Schema

The application uses a PostgreSQL database with the following main tables:
- Users
- Groups
- Courses
- StudySessions
- Todos
- GroupMembers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- TailwindCSS for the styling utilities
- NextAuth.js for authentication
- Prisma team for the excellent ORM 