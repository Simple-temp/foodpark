import React, { useState } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Paper,
} from '@mui/material';

const MySettings = () => {
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const reasons = [
    'Privacy concerns',
    'Found a better service',
    'Too many emails',
    'Technical issues',
    'Other',
  ];

  const handleReasonChange = (event) => {
    setReason(event.target.value);
    if (event.target.value !== 'Other') {
      setOtherReason('');
    }
  };

  const handleDelete = () => {
    const finalReason = reason === 'Other' ? otherReason : reason;
    if (!finalReason) {
      alert('Please select or enter a reason for account deletion.');
      return;
    }
    // Implement deletion logic here
    alert(`Account deletion requested.\nReason: ${finalReason}`);
  };

  return (
    <Box p={4} maxWidth={600} mx="auto">
      <Typography variant="h4" gutterBottom>
        Account Deletion
      </Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="body1" mb={2}>
          Please tell us why you want to delete your account:
        </Typography>

        <RadioGroup value={reason} onChange={handleReasonChange}>
          {reasons.map((r) => (
            <FormControlLabel
              key={r}
              value={r}
              control={<Radio />}
              label={r}
            />
          ))}
        </RadioGroup>

        {reason === 'Other' && (
          <TextField
            fullWidth
            label="Please specify"
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            margin="normal"
          />
        )}

        <Box mt={4}>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            fullWidth
            size="large"
          >
            Delete Account
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MySettings;
