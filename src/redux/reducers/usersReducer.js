const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || undefined,
  loading: false,
  error: false,
};

export const usersReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "auth/login/start":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "auth/login/success":
      if (actions.payload.checkbox) {
        localStorage.setItem("user", JSON.stringify(actions.payload.user));
      }
      return {
        ...state,
        loading: false,
        user: actions.payload.user,
      };
    case "auth/login/error":
      return {
        ...state,
        error: true,
        loading: false,
      };
    case "auth/logout":
      localStorage.removeItem("user");
      return {
        ...state,
        user: undefined,
      };
    default:
      return state;
  }
};
