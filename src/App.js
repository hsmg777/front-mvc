import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Core from './componets/Core';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Core/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
