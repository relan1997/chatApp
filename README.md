# ChatApp

A real-time chat application built with React and Socket.io, featuring user authentication, multiple chat rooms, and live messaging capabilities.

## Features

- **Real-time Messaging**: Instant message delivery using WebSocket connections
- **User Authentication**: Secure login and registration system
- **Multiple Chat Rooms**: Create and join different chat rooms
- **User Management**: See online users and manage user profiles
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Message History**: Persistent chat history storage
- **Typing Indicators**: Real-time typing status display
- **User Status**: Online/offline status tracking

## Technology Stack

### Frontend
- **React.js** - User interface framework
- **Socket.io-client** - Real-time communication
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Modern JavaScript features

### Backend
- **Node.js** - Server runtime environment
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - Database for storing messages and user data
- **Mongoose** - MongoDB object modeling

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- MongoDB (v4.0 or higher)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/relan1997/chatApp.git
   cd chatApp
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   mongod
   ```

## Running the Application

### Development Mode

1. **Start the server** (from the server directory):
   ```bash
   npm run dev
   ```

2. **Start the client** (from the client directory, in a new terminal):
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

### Production Mode

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd ../server
   npm start
   ```

## Project Structure

```
chatApp/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   ├── styles/        # CSS files
│   │   └── App.js         # Main App component
│   ├── package.json
│   └── README.md
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   ├── socket/           # Socket.io configuration
│   ├── server.js         # Main server file
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Chat Rooms
- `GET /api/rooms` - Get all chat rooms
- `POST /api/rooms` - Create a new chat room
- `GET /api/rooms/:id` - Get specific chat room
- `DELETE /api/rooms/:id` - Delete a chat room

### Messages
- `GET /api/messages/:roomId` - Get messages for a specific room
- `POST /api/messages` - Send a new message

### Users
- `GET /api/users` - Get all users
- `GET /api/users/online` - Get online users

## Socket.io Events

### Client to Server
- `join_room` - Join a specific chat room
- `leave_room` - Leave a chat room
- `send_message` - Send a message to a room
- `typing` - Indicate user is typing
- `stop_typing` - Stop typing indicator

### Server to Client
- `message_received` - New message received
- `user_joined` - User joined the room
- `user_left` - User left the room
- `typing_indicator` - Show typing indicator
- `online_users` - Updated list of online users

## Configuration

### Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/chatapp

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

### Database Setup

The application uses MongoDB to store:
- User accounts and profiles
- Chat rooms and room metadata
- Message history
- User sessions

## Features in Detail

### Real-time Communication
The application uses Socket.io for real-time bidirectional communication between clients and the server. This enables instant message delivery, typing indicators, and live user status updates.

### User Authentication
Secure authentication system using JWT tokens. Users can register, login, and maintain sessions across browser refreshes.

### Chat Rooms
Users can create public chat rooms or join existing ones. Each room maintains its own message history and user list.

### Message Persistence
All messages are stored in MongoDB, allowing users to see chat history when joining rooms.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running on your system
   - Check the MONGODB_URI in your .env file
   - Verify MongoDB service is accessible

2. **Socket.io Connection Issues**
   - Check if the server is running on the correct port
   - Verify CORS configuration
   - Ensure firewall isn't blocking the connection

3. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check Node.js and npm versions
   - Verify all environment variables are set

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**relan1997** - [GitHub Profile](https://github.com/relan1997)

## Acknowledgments

- Socket.io for real-time communication
- React.js community for excellent documentation
- MongoDB for flexible data storage
- Express.js for robust server framework
