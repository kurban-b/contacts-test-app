import React from "react";
import { List, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  contactsSelector,
  filterSelector,
  loadingSelector,
} from "../../redux/selectors/contacts";
import ContactsHeader from "./ContactsHeader";
import Contact from "./Contact";

const useStyles = makeStyles({
  contacts: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px 10px",
  },
});

function ContactsList() {
  const classes = useStyles();

  const contacts = useSelector(contactsSelector).sort();

  const filter = useSelector(filterSelector);

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;
    return fullName.toUpperCase().indexOf(filter.toUpperCase()) > -1;
  });

  const loading = useSelector(loadingSelector);

  return (
    <div className={classes.contacts}>
      <ContactsHeader />
      {loading ? (
        "load"
      ) : (
        <List className={classes.root}>
          {filteredContacts.map((contact) => {
            return <Contact key={contact.id} contact={contact} />;
          })}
        </List>
      )}
    </div>
  );
}

export default ContactsList;
