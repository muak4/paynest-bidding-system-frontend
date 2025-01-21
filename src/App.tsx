import React from 'react';
import RouterComponent from './router'; // Import the new router component
import './index.css';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  // return <RouterComponent />;
  return (
    <div>
      <Navbar />
      <RouterComponent />
    </div>
  );
};

export default App;
