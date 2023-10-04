import { List, ListItemButton, ListItemIcon, ListItemText, Popover, Typography } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../hooks/useAuth';

type Anchor = HTMLButtonElement | null;

interface Props {
  id: string | undefined;
  anchorState: [Anchor, Dispatch<SetStateAction<Anchor>>];
}

const PopupMenu = (props: Props) => {
  const { id, anchorState } = props;

  /* hooks */
  const { logout } = useAuth();

  /* states */
  const [anchor, setAnchor] = anchorState;

  /* functions */
  const handleLogout = () => {
    setAnchor(null);
    logout();
  };

  const open = Boolean(anchor);

  return (
    <Popover
      id={id}
      open={open}
      onClose={() => setAnchor(null)}
      anchorEl={anchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <List sx={{ width: '100%', maxWidth: 360 }} component="nav">
        <ListItemButton sx={{ height: 30 }} onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign out" sx={{ fontSize: 12 }} />
        </ListItemButton>
      </List>
    </Popover>
  );
};

export default PopupMenu;
