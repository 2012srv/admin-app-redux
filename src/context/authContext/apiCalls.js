import { loginFailure, loginStart, loginSuccess, logOut, changeTheme } from "./AuthActions";

export const login = async (user, dispatch, axios) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("auth/login", user);
        const { accessToken, refreshToken, ...rest } = res.data;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch(loginSuccess(rest));
    } catch (err) {
        dispatch(loginFailure(err));
    }
};

export const logOff = async (dispatch, axios) => {
    const refreshToken = localStorage.getItem('refreshToken');
    dispatch(logOut());
    try {
        await axios.post("auth/logout", { token: refreshToken });
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        // console.log(err);
    } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        console.log(err);
    }
};

export const themeChange = (theme, dispatch) => {
    dispatch(changeTheme(theme));
    // try {
    //     const res = await axios.post("auth/logout", { token: user.token });
    // } catch (err) {
    //     console.log(err);
    // }
};
