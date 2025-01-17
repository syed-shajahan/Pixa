import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireBaseConfig"; 

const Login: React.FC = () => {
  const navigate = useNavigate();

  // State for form inputs, loading, and error handling
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Login action
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );

      console.log("User logged in:", userCredential.user);
      navigate("/"); 
    } catch (err: any) {
      console.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#fce4ec"
    >
      <Paper
        elevation={3}
        sx={{
          padding: "24px",
          borderRadius: "12px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          color="secondary"
          fontWeight="bold"
          mb={3}
        >
          Login
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography color="error" textAlign="center" mb={2}>
            {error}
          </Typography>
        )}

        {/* Email Input */}
        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          margin="normal"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />

        {/* Password Input */}
        <TextField
          fullWidth
          type="password"
          label="Password"
          variant="outlined"
          margin="normal"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
        />

        {/* Login Button */}
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        {/* Signup Redirect */}
        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={3}
        >
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#d81b60", fontWeight: "bold" }}>
            Signup
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
