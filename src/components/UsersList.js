import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, CircularProgress, Grid, Typography, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditUserDialog from './EditUserDialog';
import { toast } from 'react-toastify';
const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null); 
  const [openEditDialog, setOpenEditDialog] = useState(false); 
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page]);

  const handlePrevious = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage(prev => prev + 1); 
  };

  const handleDeleteProfile=async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
    } catch (err) {
      console.error('Failed to delete user');
    }
  };

  const handleEditProfile=async (user) => {
    setEditingUser(user);
    setOpenEditDialog(true);
  }

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingUser(null);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${editingUser.id}`, {
        first_name: editingUser.first_name,
        last_name: editingUser.last_name,
        email: editingUser.email,
      });
      setUsers(users.map(user => (user.id === editingUser.id ? { ...user, ...response.data } : user)));
      handleCloseEditDialog();
      toast.success('User updated successfully');
    } catch (err) {
      toast.error('Error updating user');
    }
  };  


  const handleEditChange = (field, value) => {
    setEditingUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>User List</Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {users.map(user => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                boxShadow={2}
                borderRadius={2}
                bgcolor="background.paper"
              >
                <Avatar
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                />
                <Typography variant="body1">
                  {user.first_name} {user.last_name}
                </Typography>
                <Box style={{display:'flex', flexDirection:'row', gap:"10px"}}>
                  <Tooltip title="Edit" arrow>
                    <EditIcon cursor="pointer" color="#637381" fontSize='small' onClick={()=>handleEditProfile(user)} />
                  </Tooltip>
                  <Tooltip title="Delete" arrow>
                    <DeleteIcon cursor="pointer" color="#637381" fontSize='small' onClick={()=>handleDeleteProfile(user?.id)} />
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrevious}
          disabled={page === 1}
          sx={{ mr: 2 }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </Box>
      {editingUser && (
        <EditUserDialog
          open={openEditDialog}
          user={editingUser}
          onClose={handleCloseEditDialog}
          onSave={handleSaveEdit}
          onChange={handleEditChange}
        />
      )}
    </Box>
  );
};

export default UsersList;
