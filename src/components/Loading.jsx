import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Loading() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress
          variant="determinate"
          size={156}
          thickness={4}
          value={100}
          sx={{ color: '#9DF0F6' }}
        />
        <CircularProgress
          variant="determinate"
          size={156}
          thickness={4}
          value={25} 
          sx={{
            color: '#1868AF',
            position: 'absolute',
            animation: 'spin 2s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    </Box>
  );
}
