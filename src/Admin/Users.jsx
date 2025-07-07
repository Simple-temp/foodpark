import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const userData = [
  {
    id: 1,
    name: 'Alice Johnson',
    date: '2025-07-06',
    email: 'alice@example.com',
  },
  {
    id: 2,
    name: 'Bob Smith',
    date: '2025-07-05',
    email: 'bob@example.com',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    date: '2025-07-04',
    email: 'charlie@example.com',
  },
  {
    id: 4,
    name: 'Diana Prince',
    date: '2025-07-03',
    email: 'diana@example.com',
  },
  {
    id: 5,
    name: 'Ethan Hunt',
    date: '2025-07-02',
    email: 'ethan@example.com',
  },
];

const Users = () => {
  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom className="header-title-color">
        All Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Delete</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.date}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => alert(`Delete user ${user.id}`)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
