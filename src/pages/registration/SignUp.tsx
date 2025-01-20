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
import { toast } from 'react-toastify';
import { useAuth } from "../../utils/contextapi/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";

const Signup = () => {

  const { SignUp, googleSignIn } = useAuth()
  const navigate = useNavigate();

  // State management
  const [formState, setFormState] = useState({
    name: "",
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



  // Handle signup
  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {

      await SignUp(formState.email,
        formState.password)

      // await updateProfile(userCredential.user, {
      //   displayName: formState.name,
      // });

      // console.log("User registered:", userCredential.user);

      toast.success('You have been Registered');

      navigate("/login");
    } catch (err: any) {
      console.error("Signup error:", err.message);
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
          borderRadius: "12px",
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
          Pixa Signup
        </Typography>

        {error && (
          <Typography color="error" textAlign="center" mb={2}>
            {error}
          </Typography>
        )}

       


        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 2, background: '#000', display: 'flex', item: 'center', borderRadiu: '25px' }}
          onClick={handleGoogleSignIn}
          disabled={loading}


        >
          <Box mt={1} sx={{ marginRight: "5px" }}>
            <GoogleIcon />
          </Box>{" "}
          Sign in with google
        </Button>

        <Typography variant="h6">
          Enter your email below to create your account
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          margin="normal"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
        />

        <TextField
          fullWidth
          label="Email Address"
          variant="outlined"
          margin="normal"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />

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

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          sx={{
            mt: 2,
            background: '#fff',
            border: '1px solid #ccc',
            color: '#333',
            padding: '10px',
            shadow: 'none',
            '&:hover': {
              background: '#f0f0f0',
              border: '1px solid #bbb',
              color: '#000',
            },
          }}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Signup"}
        </Button>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mt={3}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#000", fontWeight: "bold" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
