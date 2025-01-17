import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { auth } from "../fireBaseConfig";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("See you later! 👋");

      handleMenuClose();
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <>
      <Tooltip title="Profile">
        <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt="User Profile"
            src="/path/to/your/profile/image"
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
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
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileDropdown;
