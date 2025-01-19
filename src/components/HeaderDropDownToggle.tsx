import { useState, useCallback } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/contextapi/AuthContext";
import { auth } from "../fireBaseConfig";

const ProfileDropdown = () => {
  const { user, logOut } = useAuth(); 
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      await logOut();
      toast.success("See you later! 👋");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
    } finally {
      handleMenuClose();
    }
  }, [handleMenuClose, logOut, navigate]);


  return (
    <>
      <Tooltip title="Profile">
        <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt="User Profile"
            src={auth?.currentUser?.photoURL || "/path/to/default/profile/image"}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            "& .MuiMenuItem-root": { typography: "body2" },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem disabled>
          <strong>Profile</strong>
        </MenuItem>
        <Divider />
        {!auth?.currentUser?  (
          <>
            <MenuItem>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Login
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Signup
              </Link>
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default ProfileDropdown;
