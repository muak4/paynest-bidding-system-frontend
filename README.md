# Bidding System Frontend

A responsive and efficient frontend for a bidding system, built with **React** and **Vite** to provide a seamless user experience. The application connects with the backend via WebSocket to enable real-time updates for bid submissions and current highest bids.

---

## 🚀 Features

- Real-time bid updates with WebSocket integration.
- Integrated with NestJs backend with Restful APIs.
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

## 📘 Development Approach

### Key Decisions

1. **Real-Time Updates**: Integrated WebSocket for real-time bid updates to ensure users always see the latest data without manual refresh.
2. **State Management**: Chose Redux Toolkit for centralized state management to ensure predictability and simplify debugging.
3. **Scalability**: Designed the component structure with reusability and scalability in mind, ensuring it can adapt to new features easily.

### Ensuring Robustness and Scalability

- **Error Handling**: Implemented error boundaries and graceful fallbacks for unexpected issues.
- **Performance Optimization**: Utilized Vite for faster build times and optimized bundling.
- **WebSocket Resilience**: Implemented reconnection logic to handle intermittent network issues.

---

## 🖥️ Running the Project

### Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 16.x or later
- **npm**: Version 7.x or later (comes with Node.js)
- **.env**: Create .env file with backend baseurl

```bash
  VITE_API_URL=http://localhost:3001
```

---

### 📦 Run Locally Without Docker

1. **Clone the repository**:
   ```bash
   git clone git@github.com:muak4/paynest-bidding-system-frontend.git
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

## 🔄 CI/CD Pipeline

### Setup and Deployment Process

1. **Pipeline Configuration**:

   - The pipeline is configured using GitHub Actions (or your chosen CI/CD tool).
   - It automates deployment steps.

2. **Steps to Run the Pipeline**:
   - Push changes to the repository. The pipeline triggers automatically.
   - Monitor progress via the CI/CD dashboard (e.g., GitHub Actions).
   - Review any errors and re-run if necessary.

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
