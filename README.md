# 💣 Bomberman DOM

<div align="center">

![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

</div>

A multiplayer Bomberman game built with a Go backend and JavaScript frontend, featuring real-time gameplay with WebSocket communication.

## 🎮 Overview

Bomberman DOM is a classic arcade-style multiplayer game where players navigate a grid-based arena, place bombs to destroy obstacles and opponents, and compete to be the last player standing. The game features real-time synchronization between players using WebSockets.

## 📸 Screenshots

### Waiting Room
Players join the waiting room and chat before the game starts:

![Waiting Room](imgs/Screenshot%20from%202025-10-15%2015-38-12.png)

### Gameplay
Real-time multiplayer action with bombs, obstacles, and power-ups:

![Gameplay](imgs/Screenshot%20from%202025-10-15%2015-39-34.png)

## 🏗️ Architecture

This project follows a client-server architecture:

- **Backend**: Go server with WebSocket support for real-time multiplayer gameplay
- **Frontend**: Built using our custom **[Mini Framework](https://github.com/TanakAiko/mini-framework)** - a lightweight JavaScript framework we developed from scratch in a previous project, featuring state management, virtual DOM, and component-based architecture
- **Communication**: WebSocket protocol for real-time game state synchronization

### 🎨 Custom Framework

The frontend is powered by our homemade **Mini Framework**, which we built from scratch to understand modern JavaScript frameworks better. This framework includes:

- **Virtual DOM**: Efficient DOM updates and rendering
- **State Management**: Reactive state with `useState` hook
- **Component System**: JSX-like component-based architecture
- **Event System**: Custom event emitter and handling
- **Router**: Client-side routing capabilities
- **Compiler**: Custom JSX compiler for component templates

You can find the framework source code in `frontend/public/domino/` or check out the [original repository](https://github.com/TanakAiko/mini-framework).

### Project Structure

```
bomberman-dom/
├── backend/              # Go WebSocket server
│   ├── main.go          # Server entry point
│   ├── game/            # Game logic and WebSocket handlers
│   └── utils/           # Utility functions (map generation, etc.)
├── frontend/            # JavaScript frontend
│   ├── server.js        # Express server for static files
│   ├── public/          # Static assets and HTML
│   │   └── domino/      # Mini Framework source code
│   │       ├── _lib/    # Framework core library
│   │       └── _bin/    # Compiled framework
│   └── src/             # Application source code
│       ├── app/         # Game components and logic
│       │   ├── components/  # UI components (built with Mini Framework)
│       │   ├── game/        # Game logic (bombs, movement, WebSocket)
│       │   └── store/       # State management
│       └── utils/       # Frontend utilities
```

## 🚀 Getting Started

### Prerequisites

- **Go** 1.23.0 or higher
- **Node.js** (v14 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bomberman-dom
   ```

2. **Setup Backend**
   ```bash
   cd backend
   go mod download
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

#### Start the Backend Server

```bash
cd backend
go run main.go
```

The Go server will start on `http://localhost:8080`

#### Start the Frontend Server

In a new terminal:

```bash
cd frontend
npm start
```

The Express server will start on `http://localhost:8000`

#### Access the Game

Open your browser and navigate to:
```
http://localhost:8000
```

## ✨ Features

- **Multiplayer Support**: Real-time multiplayer gameplay with WebSocket synchronization
- **Custom Mini Framework**: Built with our homemade JavaScript framework featuring virtual DOM, state management, and reactive components
- **Classic Bomberman Mechanics**: Place bombs, destroy obstacles, collect power-ups
- **Responsive UI**: Built with Tailwind CSS for a modern look
- **Game Rooms**: Players can join waiting rooms before starting a game
- **Chat System**: In-game chat functionality
- **Power-ups**: Collect power-ups to enhance your abilities
- **Sound Effects**: Audio feedback for bombs and explosions

## 🎮 How to Play

1. **Enter Your Name**: When you first join, enter your player name
2. **Waiting Room**: Wait for other players to join
3. **Game Controls**:
   - Arrow keys or WASD to move
   - Spacebar to place a bomb
4. **Objective**: Be the last player standing by avoiding bombs and eliminating opponents

## 🛠️ Development

### Backend Development

The Go backend uses the Gorilla WebSocket library for real-time communication:

```bash
cd backend
go run main.go
```

### Frontend Development

For development with auto-reload:

```bash
cd frontend
npm run dev
```

This uses nodemon to automatically restart the server when files change.

## 📦 Dependencies

### Backend
- Go 1.23.0+
- [Gorilla WebSocket](https://github.com/gorilla/websocket) v1.5.3

### Frontend
- Express.js v4.21.0
- Axios v1.7.7
- Lodash v4.17.21
- Tailwind CSS (via CDN)
- **[Mini Framework](https://github.com/TanakAiko/mini-framework)** (custom framework built from scratch)

## 🎨 Assets

The game includes custom assets:
- Bomb graphics (SVG)
- Explosion animations (SVG)
- Wall and block sprites (PNG)
- Sound effects (MP3)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

Made with ❤️ from 🇸🇳

</div>