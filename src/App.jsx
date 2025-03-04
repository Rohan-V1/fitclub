import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Box } from '@mui/material';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Activity from './pages/Activity';


function App() {
  return (
    <Router>
      <AppProvider>
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <NavBar />
          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/activity" element={<Activity/>} />
              <Route path="/reports/sales" element={<div>Sales Reports Content</div>} />
              <Route path="/reports/traffic" element={<div>Traffic Reports Content</div>} />
              <Route path="/integrations" element={<div>Integrations Content</div>} />
            </Routes>
          </Box>
        </Box>
      </AppProvider>
    </Router>
  );
}

export default App;
