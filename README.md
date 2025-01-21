# Bidding System Frontend

A responsive and efficient frontend for a bidding system, built with **React** and **Vite** to provide a seamless user experience. The application connects with the backend via WebSocket to enable real-time updates for bid submissions and current highest bids.

---

## 🚀 Features

- Real-time bid updates with WebSocket integration.
- Fast and optimized build using **Vite**.
- Responsive design for an enhanced user experience across devices.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **WebSocket**: Socket.io client
- **State Management**: Redux Toolkit

---

## 🖥️ Running the Project

### Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 16.x or later
- **npm**: Version 7.x or later (comes with Node.js)

---

### 📦 Run Locally Without Docker

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd bidding-system-frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. Access the app: Open your browser and go to http://localhost:5173

---

### 🐳 Run Locally With Docker

1. **uild the DOcker image**:

   ```bash
   docker build -t bidding-system-frontend .

   ```

2. **Run the Docker containe**:
   ```bash
   docker run -p 3000:80 bidding-system-frontend
   ```
3. Access the app: Open your browser and go to http://localhost:3000

---

### 📂 Project Structure

The `bidding-system-frontend` project is organized as follows:

```plaintext
bidding-system-frontend/
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/             # Page-level components
│   ├── router/            # React Router Dom
│   ├── store/             # Redux store initialization
│       ├── slices
│           ├── authSlice.tsx
│           ├── api        # APi code
│   ├── styles/            # Tailwind CSS and custom styles
│   ├── App.tsx            # Main App component
│   └── main.tsx           # Application entry point
├── public/                # Static files
├── Dockerfile             # Docker configuration
├── nginx.template         # Nginx configuration for production
├── package.json           # Project dependencies and scripts
├── *.ts                   # Other Configurations files
└── README.md              # Documentation

```

---

### 🔧 Useful Scripts

- **Start Development Server:**: `npm run dev`
- **Build for Production**: `npm run build`
- **Preview Production Build**: `npm run preview or start`

---

### 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

### ✉️ Support

For support, open an issue in the repository or reach out to the project maintainer.
