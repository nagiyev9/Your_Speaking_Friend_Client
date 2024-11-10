import { jwtDecode } from "jwt-decode";

function formatDate(expireAt) {
    const date = new Date(expireAt * 1000);
    return date.getTime();
}

const setAuthToken = (token) => {
    localStorage.setItem("token", token ? token : null);
    return;
};

const getAuthToken = () => {
    return localStorage.getItem("token")
};

const checkTokenExpiration = () => {
    const token = getAuthToken();
    if (token === null) {
        return window.location.href = "/";
    };
    try {
        const decodedToken = jwtDecode(token);
        const expireAt = formatDate(decodedToken.exp);
        const now = new Date().getTime();

        if (now > expireAt) {
            setAuthToken(null);
            return window.location.href = "/"; 
        }
    } catch (error) {
        setAuthToken(null);
        window.location.href = "/";
    }
};

setInterval(checkTokenExpiration, 1000 * 60 * 30);

export { setAuthToken, getAuthToken };