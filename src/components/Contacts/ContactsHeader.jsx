import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/actions/contacts";
import { userSelector } from "../../redux/selectors/users";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    marginBottom: "10px",
    marginRight: "10px",
    width: "48%",
  },
});

function ContactsHeader() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const user = useSelector(userSelector);

  const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    error: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValues({
      ...values,
      error: false,
      phone: "",
      email: "",
      firstName: "",
      lastName: "",
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleAddContact = () => {
    if (
      values.firstName === "" ||
      values.lastName === "" ||
      values.phone === ""
    ) {
      setValues({ ...values, error: true });
      return null;
    }
    dispatch(
      addContact(
        user.id,
        values.firstName,
        values.lastName,
        values.phone,
        values.email
      )
    );
    setOpen(false);
    setValues({
      ...values,
      error: false,
      phone: "",
      email: "",
      firstName: "",
      lastName: "",
    });
  };

  return (
    <div className={classes.header}>
      <div>
        <Typography variant="h3" component="h2">
          Список контактов
        </Typography>
      </div>
      <div>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
          Добавить
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
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
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Отмена
          </Button>
          <Button
            onClick={handleAddContact}
            color="secondary"
            variant="contained"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ContactsHeader;
