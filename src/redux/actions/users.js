export const startLogin = (login, password, checkbox) => {
  return async (dispatch) => {
    try {
      await dispatch({
        type: "auth/login/start",
      });
      const res = await fetch("/auth", {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json.message) {
        await dispatch({
          type: "auth/login/error",
        });
      } else {
        await dispatch({
          type: "auth/login/success",
          payload: {
            user: json,
            checkbox: checkbox,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const logout = () => {
  return {
    type: "auth/logout",
  };
};
