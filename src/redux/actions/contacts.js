export const loadingContacts = (token) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: "contacts/loading/start",
      });
      const res = await fetch("/contacts", { headers: { token: token } });
      const json = await res.json();
      dispatch({
        type: "contacts/loading/success",
        payload: json,
      });
    } catch (e) {
      console.error(e);
    }
  };
};

export const addContact = (userId, firstName, lastName, phone, email) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: "contacts/add/start",
      });
      const res = await fetch("/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, firstName, lastName, phone, email }),
      });
      const json = await res.json();

      await dispatch({
        type: "contacts/add/success",
        payload: json,
      });
    } catch (e) {
      console.error(e);
    }
  };
};

export const deleteContact = (id) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: "contacts/delete/start",
      });
      const res = await fetch(`/contacts/${id}`, { method: "DELETE" });
      const json = await res.json();
      await dispatch({
        type: "contacts/delete/success",
        payload: json,
        id: id
      });
    } catch (e) {
      console.error(e);
    }
  };
};

export const updateContact = (id, firstName, lastName, phone, email) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: "contacts/update/start",
      });
      const res = await fetch(`/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, phone, email }),
      });
      const json = await res.json();
      await dispatch({
        type: "contacts/update/success",
        payload: json,
      });
    } catch (e) {
      console.error(e);
    }
  };
};

export const changeFilter = (filter) => {
  return {
    type: "contacts/filter/change",
    payload: filter,
  };
};
