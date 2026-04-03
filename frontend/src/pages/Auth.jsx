import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";


function Auth() {
    const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    try {
      if (formState === 0) {
        // LOGIN
        await handleLogin(username, password);
         navigate("/home");
      }

      if (formState === 1) {
        // REGISTER
        let result = await handleRegister(name, username, password);
        setMessage(result);
        setOpen(true);
        setError("");
        setFormState(0);
      }

      setUsername("");
      setPassword("");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <CssBaseline />

      {/* Left side — background image */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url("/authimg.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "block" },
        }}
      />

      {/* Right side — form */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
          bgcolor: "background.paper",
          maxWidth: "600px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>🔒</Avatar>

        <Typography component="h1" variant="h5">
          Welcome to JustChat!
        </Typography>

        <div style={{ marginTop: "2rem" }}>
          <Button
            variant={formState === 0 ? "contained" : "outlined"}
            onClick={() => { setFormState(0); setError(""); }}
          >
            Sign In
          </Button>

          <Button
            variant={formState === 1 ? "contained" : "outlined"}
            onClick={() => { setFormState(1); setError(""); }}
            sx={{ ml: 1 }}
          >
            Sign Up
          </Button>
        </div>

        {/* No onSubmit — button handles everything */}
        <Box sx={{ mt: 1, width: "100%" }}>

          {formState === 1 && (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            autoFocus={formState === 0}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Error message */}
          {error && <p style={{ color: "red", margin: "8px 0 0" }}>{error}</p>}

          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAuth}
          >
            {formState === 0 ? "Login" : "Register"}
          </Button>

          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={() => setOpen(false)}
            message={message}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Auth;