import React, { useState } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/actions/contacts";
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  input: {
    marginBottom: "10px",
    marginRight: "10px",
    width: "48%",
  },
});

function EditContact({ contact, setModal }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    firstName: contact.firstName,
    lastName: contact.lastName,
    phone: contact.phone,
    email: contact.email,
    error: false,
  });

  const handleSaveChange = () => {
    if (
      values.firstName === "" ||
      values.lastName === "" ||
      values.phone === "" ||
      values.email === ""
    ) {
      setValues({ ...values, error: true });
      return null;
    }
    dispatch(
      updateContact(
        contact.id,
        values.firstName,
        values.lastName,
        values.phone,
        values.email
      )
    );
    setValues({ ...values, error: false });
    setModal(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <>
      <DialogTitle id="alert-dialog-title">{"Новый контакт"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextField
            label="Имя"
            variant="outlined"
            required
            className={classes.input}
            size="small"
            value={values.firstName}
            onChange={handleChange("firstName")}
          />
          <TextField
            label="Фамилия"
            variant="outlined"
            required
            className={classes.input}
            size="small"
            value={values.lastName}
            onChange={handleChange("lastName")}
          />
          <TextField
            label="Телефон"
            variant="outlined"
            required
            className={classes.input}
            size="small"
            value={values.phone}
            onChange={handleChange("phone")}
          />
          <TextField
            label="Эл. почта"
            variant="outlined"
            className={classes.input}
            size="small"
            value={values.email}
            onChange={handleChange("email")}
          />
        </DialogContentText>
        {values.error && (
          <Alert severity={"warning"}>Заполните обязательные поля!</Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleSaveChange}
        >
          Сохранить
        </Button>
      </DialogActions>
    </>
  );
}

EditContact.propTypes = {
  contact: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired
}

export default EditContact;
