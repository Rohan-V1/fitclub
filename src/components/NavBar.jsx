import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faPersonRunning } from '@fortawesome/free-solid-svg-icons';


const NAV_ITEMS = [
  { path: '/', title: 'Home', icon: <FontAwesomeIcon icon={faHouse} /> },
  { path: '/activity', title: 'Activities', icon: <FontAwesomeIcon icon={faPersonRunning} />},
];

function NavBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      sx={{
        width: collapsed ? 80 : 250,
        height: '100vh',
        bgcolor: 'grey.900',
        color: 'white',
        p: 2,
        transition: 'width 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: 'white' }}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Divider sx={{ bgcolor: 'white', mb: 2 }} />

      {/* Authentication Section */}
      <Box sx={{ flexGrow: 1 }}>
        <SignedOut>
          <SignInButton sx/>
        </SignedOut>
        <SignedIn>
          <UserButton sx={{ alignSelf: 'center', mb: 2 }} />
          <Box component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {NAV_ITEMS.map(({ path, title, icon }) => (
              <Link
                key={path}
                to={path}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 15px',
                  borderRadius: 4,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  transition: 'background-color 0.3s ease-in-out',
                }}
              >
                {icon}
                {!collapsed && <Typography variant="body1">{title}</Typography>}
              </Link>
            ))}
          </Box>
        </SignedIn>
      </Box>

      {/* Footer Section */}
      <Divider sx={{ bgcolor: 'white', my: 2 }} />
      <Typography variant="caption" sx={{ textAlign: 'center', opacity: 0.7 }}>
        © {new Date().getFullYear()} FitClub
      </Typography>
    </Box>
  );
}

export default NavBar;
