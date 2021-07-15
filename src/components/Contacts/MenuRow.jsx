import React, { useState } from "react";
import {
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Popover,
} from "@material-ui/core";
import { Delete, MoreVert, Settings } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { contactsSelector } from "../../redux/selectors/contacts";
import EditContact from "./EditContact";
import { deleteContact } from "../../redux/actions/contacts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
  },
  text: {
    fontSize: "14px",
  },
}));

function MenuRow({ contactId }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const [modal, setModal] = useState(false);

  const contacts = useSelector(contactsSelector);

  const contact = contacts.find((item) => item.id === contactId);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const handleDelete = () => {
    dispatch(deleteContact(contactId));
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List component="nav" className={classes.root}>
          <ListItem button className={classes.icon} onClick={handleModal}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText secondary="Редактировать" className={classes.text} />
          </ListItem>
          <ListItem button className={classes.icon} onClick={handleDelete}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText secondary="Удалить" className={classes.text} />
          </ListItem>
        </List>
      </Popover>
      <Dialog
        open={modal}
        onClose={handleModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <EditContact contact={contact} setModal={setModal} />
      </Dialog>
    </div>
  );
}

MenuRow.propTypes = {
  contactId: PropTypes.number.isRequired,
};
export default MenuRow;
