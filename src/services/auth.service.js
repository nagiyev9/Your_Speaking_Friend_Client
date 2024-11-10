import { getAuthToken } from "./token.service.js";

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:4747';

export const getAllAccounts = async () => {
    console.log(apiURL);
    const response = await fetch(`${apiURL}/api/auth/account/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = await response.json();
    return data;
};

export const getAccountByInfoID = async (infoID) => {
    const response = await fetch(`${apiURL}/api/auth/account?infoID=${infoID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = await response.json();
    return data;
};

export const getAccountByID = async (id) => {
    const response = await fetch(`${apiURL}/api/auth/account/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = await response.json();
    return data;
};

export const login = async user => {
    const response = await fetch(`${apiURL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    return data;
};

export const signup = async user => {
    const response = await fetch(`${apiURL}/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    return data;
};

export const confirmSignup = async confirmationCode => {
    const response = await fetch(`${apiURL}/api/auth/signup/confirm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(confirmationCode)
    });

    const data = await response.json();
    return data;
};

export const forgotPassword = async email => {
    const response = await fetch(`${apiURL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(email)
    });

    const data = await response.json();
    return data;
};

export const updatePassword = async (password, token) => {
    const response = await fetch(`${apiURL}/api/auth/reset-password?token=${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(password)
    });

    const data = await response.json();
    return data;
};

export const changeAccountRole = async (infoID, role) => {
    const response = await fetch(`${apiURL}/api/auth/account/change-role?infoID=${infoID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(role),
    });

    const data = await response.json();
    return data;
};