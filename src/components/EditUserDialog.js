import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const EditUserDialog = ({ open, user, onClose, onSave, onChange }) => {

    return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="First Name"
          value={user.first_name}
          onChange={(e) => onChange('first_name', e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Last Name"
          value={user.last_name}
          onChange={(e) => onChange('last_name', e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Email"
          value={user.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button style={{textTransform:"none"}} onClick={onClose} color="secondary">Cancel</Button>
        <Button style={{textTransform:"none"}} onClick={onSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
