# TaskFlow - Kanban Board Application

A modern, feature-rich Kanban board application built with React and Node.js for efficient task management and workflow visualization.

## Features

- **Drag and Drop Interface** - Intuitive task management with smooth drag-and-drop functionality
- **Real-time Updates** - Synchronized task updates across the application
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Status Tracking** - Organize tasks across Todo, In Progress, and Done columns
- **Persistent Storage** - MongoDB backend with localStorage fallback
- **Clean UI** - Modern, professional interface with glassmorphism effects

## Technology Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Lucide React (Icons)
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas connection)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/piyushtyagiofficial/kanban-board.git
cd kanban-board
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
```

4. Configure environment variables

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

### Running the Application

1. Start the backend server
```bash
cd server
npm start
```

2. Start the frontend development server
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`


## API Endpoints

- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.
