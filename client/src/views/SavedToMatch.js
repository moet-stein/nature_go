import React from 'react';
import AppBarComponent from '../components/AppBarComponent';
import ProfileSection from '../components/ProfileSection';
import Box from '@material-ui/core/Box';

export default function SavedToMatch() {
  return (
    <div>
      <AppBarComponent />
      <Box mt={3}>
        <ProfileSection />
      </Box>
    </div>
  );
}
