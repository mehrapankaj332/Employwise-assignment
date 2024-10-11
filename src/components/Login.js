import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
        const response = await axios.post('https://reqres.in/api/login', {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
        });
        localStorage.setItem('token', response.data.token);
        onLogin();
    } catch (err) {
        toast.error("Login Failed");
    } finally {
        setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <Stack
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"99vw"}
      height={"99vh"}
      flex={8}
    >
      <FormControl required>
        <Stack
          sx={{ width: '400px' }}
          spacing={4}
        >
          <TextField 
            fullWidth
            variant="outlined"
            type="email"
            placeholder="Enter your business email address"
            value={email}
            onChange={handleEmailChange}
            disabled={loading}
          />
          
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            id="password-create"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          <Button 
            fullWidth
            size="large"
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ height: '3.5rem', textTransform:"none" }} 
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
          </Button>
        </Stack>
      </FormControl>
    </Stack>
  );
}

export default Login;
