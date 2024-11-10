import { getAuthToken } from "./token.service.js";

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:4747';

export const getAllUsers = async () => {
    const response = await fetch(`${apiURL}/api/user/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};

export const getAccountByUserID = async userID => {
    const response = await fetch(`${apiURL}/api/user?userID=${userID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};

export const banUser = async userID => {
    const response = await fetch(`${apiURL}/api/user/ban?userID=${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};

export const unbanUser = async userID => {
    const response = await fetch(`${apiURL}/api/user/unban?userID=${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};

export const changeRole = async (userID, role) => {
    const response = await fetch(`${apiURL}/api/user/change-role?userID=${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(role),
    });

    const data = response.json();
    return data;
};

export const refreshUserUnbanDate = async userID => {
    const response = await fetch(`${apiURL}/api/user/refresh-date/${userID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};