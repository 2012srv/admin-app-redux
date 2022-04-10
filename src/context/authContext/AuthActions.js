export const changeTheme = (theme) => ({
    type: "THEME_CHANGE",
    payload: theme
});

export const loginStart = () => ({
    type: "LOGIN_START",
});
export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});
export const loginFailure = (err) => ({
    type: "LOGIN_FAILURE",
    payload: err
});

//logout
export const logOut = () => ({
    type: "LOGOUT",
});
