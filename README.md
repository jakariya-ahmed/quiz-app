
# Quiz App — Full Documentation

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Setup & Installation](#setup--installation)  
5. [Project Structure](#project-structure)  
6. [Components and Pages](#components-and-pages)  
    - [Navbar](#navbar)  
    - [QuizPage](#quizpage)  
    - [ProfilePage](#profilepage)  
    - [LoginPage](#loginpage)  
    - [RegisterPage](#registerpage)  
7. [State Management & Persistence](#state-management--persistence)  
8. [Routing & Navigation](#routing--navigation)  
9. [Styling](#styling)  
10. [How to Use](#how-to-use)  
11. [Customization](#customization)  
12. [Known Limitations](#known-limitations)  
13. [Future Improvements](#future-improvements)  
14. [License](#license)  
15. [Contact](#contact)  

---

## Project Overview

This project is a **React-based Quiz Application** that allows users to register/login, take timed quizzes with multiple choice questions, and review their results and progress. The app uses client-side routing, manages authentication state with localStorage, and features responsive design.

---

## Features

- User Authentication (Register, Login, Logout)
- Timed Quiz Questions (default 15 seconds/question)
- Sequential question navigation (from 1 to 10)
- Auto-move to next question on answer select or timeout
- Final results page displaying score and detailed answer comparison
- User Profile showing quiz history and performance stats
- Responsive UI with accessible navigation (navbar + mobile menu)
- Protected routes: quiz and profile pages require login
- Persistent login state using localStorage

---

## Tech Stack

| Technology       | Purpose                           |
|------------------|---------------------------------|
| React            | Frontend UI framework            |
| React Router DOM | SPA routing and protected routes|
| Tailwind CSS     | Utility-first styling framework |
| react-toastify   | User notifications               |
| Local Storage    | Persisting auth and quiz data   |

---

## Setup & Installation

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
/src
 ├── /components
 │     ├── Navbar.jsx
 │     ├── QuizPage.jsx
 │     ├── ProfilePage.jsx
 │     ├── LoginPage.jsx
 │     └── RegisterPage.jsx
 ├── /data
 │     └── questions.js
 ├── App.jsx
 └── index.js
```

---

## Components and Pages

### Navbar

- Responsive navigation bar with logo, links, and user menu
- Shows different menus based on authentication state
- Includes Login, Register, Profile, and Logout options
- Syncs login state across tabs using `window.storage` event
- Mobile-friendly hamburger menu

### QuizPage

- Displays one question at a time with multiple-choice options
- Timer counts down (default 15 seconds per question)
- Automatically advances on answer selection or timeout
- Stores user answers and calculates score
- Final screen shows detailed results with correct and user answers highlighted
- Uses React hooks for state and timer management

### ProfilePage

- Displays user quiz history and stats such as:
  - Number of quizzes taken
  - Best score
  - Accuracy percentage
- Data persisted in localStorage keyed to user email

### LoginPage

- Form to enter email and password
- Validates credentials against registered users in localStorage
- Shows error messages via toast notifications

### RegisterPage

- User signup form with email and password
- Password confirmation check
- Stores new user in localStorage

---

## State Management & Persistence

- Authentication state (`isLoggedIn`, `currentUser`) stored in **localStorage**
- Quiz answers and history also stored in localStorage for persistence
- React state hooks (`useState`, `useEffect`) manage UI state dynamically
- Login status synced across browser tabs via `window.storage` event listener

---

## Routing & Navigation

- React Router handles navigation between:
  - `/` Home
  - `/login` Login page
  - `/register` Registration page
  - `/quiz` Quiz page (protected)
  - `/profile` Profile page (protected)
- Protected routes check `isLoggedIn` state; redirect unauthenticated users to `/login`

---

## Styling

- Tailwind CSS for rapid, consistent, responsive UI design
- Utility classes for margins, padding, fonts, colors, grids, flexbox
- Clean card-style layouts for quiz and profile sections
- Hover and focus states for accessibility and better UX

---

## How to Use

1. Register a new account or login.
2. Click "Quiz" in the navbar to start a quiz.
3. Answer each question before the timer runs out.
4. View your final score and review answers.
5. Visit "Profile" to see your quiz history and performance.
6. Logout from the user menu when done.

---

## Customization

- Modify quiz questions in `/src/data/questions.js`:
  ```js
  export const QUESTIONS = [
    {
      question: "What is 2 + 2?",
      options: ["1", "2", "3", "4"],
      answerIndex: 3,
    },
    // Add or edit more questions here
  ];
  ```
- Adjust the time per question in `QuizPage.jsx` by changing the `TIME_PER_QUESTION` constant.
- Customize styling by editing Tailwind classes in component JSX files.

---

## Known Limitations

- User data and quiz results are stored only in localStorage (no backend persistence).
- No password encryption or security measures for stored credentials.
- Limited to a single set of quiz questions.
- No multi-category or difficulty filtering.
- Profile stats are basic and limited to client-side data.

---

## Future Improvements

- Implement backend API and database for secure user data and quiz storage.
- Add password encryption and improved security.
- Support multiple quiz categories and difficulty levels.
- Add timer pause/resume and review previous questions.
- Enhance profile page with charts and advanced stats.
- Add social sharing for quiz results.
- Add sound effects and animations.

---

## License

This project is open-source under the MIT License.

---

## Contact

For questions, feature requests, or contributions, contact:

- Your Name: your-email@example.com  
- GitHub: [github.com/your-username](https://github.com/your-username)

---

*Happy Quizzing! 🎉*
