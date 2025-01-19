import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  ButtonBase,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireBaseConfig";
import { useAuth } from "../../utils/contextapi/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const { googleSignIn, emailSign } = useAuth();
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



      await emailSign(formState.email,
        formState.password);

      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleSignIn = async () => {

    try {
      await googleSignIn();
      navigate("/");

    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.error(error.message);
    }

  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#EEE"
    >
      <Paper
        elevation={3}
        sx={{
          padding: "24px",
          borderRadius: "0px 25px 0px 25px",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"

          fontWeight="bold"
          mb={3}
        >
          Pixa Login
        </Typography>

        {/* Error Message */}
        {error && (
          <Typography color="error" textAlign="center" mb={2}>
            {error}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 2, background:'#000', display:'flex', item:'center', borderRadiu:'25px' }}
          onClick={handleGoogleSignIn}
          disabled={loading}
         
       
        >
          <Box mt={1} sx={{ marginRight: "5px" }}>
            <GoogleIcon />
          </Box>{" "}
          Sign in with google
        </Button>

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
          
          sx={{
            mt: 2,
            background: '#fff',
            border: '1px solid #ccc',
            color: '#333',
            padding:'10px',
            shadow: 'none',
            '&:hover': {
              background: '#f0f0f0', 
              border: '1px solid #bbb',
              color: '#000', 
            },
          }}
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
          <Link to="/signup" style={{ color: "#000", fontWeight: "bold" }}>
            Signup
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
