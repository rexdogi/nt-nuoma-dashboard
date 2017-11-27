import jwtDecode from 'jwt-decode';

export function getAuthData() {
    const token = localStorage.getItem("id_token");

    let tokenData = null;
    let loggedIn = true;
    try {
        tokenData = decode(token);

        const current_time = new Date().getTime() / 1000;
        if (current_time > tokenData.exp) {
            loggedIn = false;
        }
    } catch (e) {
        return {
            status: false,
            user: null
        }
    }

    return {
        status: loggedIn,
        user: tokenData
    }
}

export function decode(token) {
    let myToken = token;
    if (myToken && myToken.includes('Bearer')) {
        myToken.replace('Bearer ', '');
    }

    try {
        return jwtDecode(token);
    } catch (e) {
        return null;
    }

}