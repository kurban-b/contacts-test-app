import React from "react";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import MenuRow from "./MenuRow";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  avatar: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
  },
});

function Contact({ contact }) {
  const classes = useStyles();

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            className={classes.avatar}
            variant={"circular"}
            alt={contact.firstName}
            src="/"
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${contact.firstName} ${contact.lastName}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                телефон: {contact.phone}
              </Typography>
              <br />
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Эл. почта: {contact.email}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <MenuRow contactId={contact.id} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
}

export default Contact;
