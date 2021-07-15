const initialState = {
  contacts: [],
  loading: false,
  updateloading: false,
  filter: "",
};

export const contactsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "contacts/loading/start":
      return {
        ...state,
        loading: true,
      };
    case "contacts/loading/success":
      return {
        ...state,
        loading: false,
        contacts: actions.payload,
      };
    case "contacts/add/start":
      return {
        ...state,
        loading: true,
      };
    case "contacts/add/success":
      return {
        ...state,
        loading: false,
        contacts: [...state.contacts, actions.payload],
      };
    case "contacts/delete/success":
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== actions.id
        ),
      };
    case "contacts/update/start":
      return {
        ...state,
        updateloading: true,
      };
    case "contacts/update/success":
      return {
        ...state,
        updateloading: false,
        contacts: state.contacts.map((contact) => {
          if (contact.id === actions.payload.id) {
            return actions.payload;
          }
          return contact;
        }),
      };
    case "contacts/filter/change":
      return {
        ...state,
        filter: actions.payload,
      };
    default:
      return state;
  }
};
