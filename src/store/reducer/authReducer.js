const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  email: null,
  password: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      localStorage.setItem("isAuthenticated", "true"); // Set authentication status in local storage
      return {
        ...state,
        isAuthenticated: true,
        email: action.payload.email,
        password: action.payload.password,
      };
    case "SIGN_OUT":
      localStorage.removeItem("isAuthenticated"); // Clear authentication status from local storage
      return {
        ...state,
        isAuthenticated: false,
        email: null,
        password: null,
      };
    default:
      return state;
  }
};

export default authReducer;
