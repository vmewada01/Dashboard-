import React from "react";
import {
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { User as UserIcon } from "lucide-react";
import { User } from "../types/data";

interface UserSelectorProps {
  users: User[];
  currentUser: User;
  onSelectUser: (user: User) => void;
}

const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  currentUser,
  onSelectUser,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectUser = (user: User) => {
    onSelectUser(user);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        startIcon={
          currentUser.avatar ? (
            <Avatar
              src={currentUser.avatar}
              alt={currentUser.name}
              sx={{ width: 24, height: 24 }}
            />
          ) : (
            <UserIcon size={24} />
          )
        }
        sx={{
          borderRadius: "20px",
          textTransform: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.08)",
            transform: "translateY(-2px)",
          },
        }}
      >
        My Members
      </Button>

      <Dialog onClose={handleClose} open={open} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Select Member
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <List sx={{ pt: 0 }}>
            {users.map((user) => (
              <ListItem
                button
                onClick={() => handleSelectUser(user)}
                key={user.id}
                sx={{
                  borderRadius: "8px",
                  mb: 1,
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                  },
                  ...(currentUser.id === user.id && {
                    backgroundColor: "rgba(25, 118, 210, 0.12)",
                  }),
                }}
              >
                <ListItemAvatar>
                  <Avatar src={user.avatar} alt={user.name}>
                    {!user.avatar && user.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={user.role}
                  primaryTypographyProps={{
                    fontWeight: currentUser.id === user.id ? 600 : 400,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserSelector;
