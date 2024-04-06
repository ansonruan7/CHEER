import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { mainNavbarItems } from './consts/navbarItems';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { Typography } from '@mui/material';
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { Container } from '@mui/material';

const Navbar = () => {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Container>
      {drawerOpen ? <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#FFA500', // Background color of the left side drawer
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <MdMenuOpen size={50} className='nav_menu' onClick={handleDrawerToggle} />
        <Toolbar />
        <Typography
          variant="h1"
          color="inherit"
          style={{ textAlign: 'center' }}
          display={'flex'}
          marginLeft={7}
          padding={'20px'}
        >
          CHEER
        </Typography>
        <Divider />
        <List>
          <ListItem onClick={() => navigate('/')}>
            <ListItemButton>
              <ListItemIcon sx={{ color: '#000000' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
          {mainNavbarItems.map((item, index) => (
            <ListItem key={item.id} onClick={() => navigate(item.route)}>
              <ListItemButton>
                <ListItemIcon sx={{ color: '#000000' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer> :
        <div>
          <MdMenu size={50} className='nav_menu' onClick={handleDrawerToggle} />
        </div>}
    </Container>
  );
};

export default Navbar;