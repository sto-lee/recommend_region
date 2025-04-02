import { AppBar, Box, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ padding: '1rem 2rem' }}>
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#1d1d1f',
            fontWeight: 600,
            letterSpacing: '-0.5px'
          }}
        >
          HOME_GENIE
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Header; 