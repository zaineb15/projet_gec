import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Index from './index'; // Changement de 'index' à 'Index' pour respecter la casse

function App() {
  return (
    <Router>
      <Index />
    </Router>
  );
}

export default App;
