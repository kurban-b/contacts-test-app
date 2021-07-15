import React, { useEffect } from "react";
import ContactsList from "./ContactsList";
import { loadingContacts } from "../../redux/actions/contacts";
import { useDispatch, useSelector } from "react-redux";
import { tokenSelector } from "../../redux/selectors/users";

function Contacts() {
  const dispatch = useDispatch();

  const token = useSelector(tokenSelector);

  useEffect(() => {
    dispatch(loadingContacts(token));
  }, [dispatch, token]);

  return (
    <div>
      <ContactsList />
    </div>
  );
}

export default Contacts;
