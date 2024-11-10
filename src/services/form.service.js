import { getAuthToken } from "./token.service.js";

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:4747';

export const getAllForms = async () => {
    const response = await fetch(`${apiURL}/api/form/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};

export const submitForm = async (form) => {
    const response = await fetch(`${apiURL}/api/form/submit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(form),
    });

    const data = response.json();
    return data;
};

export const changeStaus = async (id) => {
    const response = await fetch(`${apiURL}/api/form/change-status/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};

export const deleteForm = async (id) => {
    const response = await fetch(`${apiURL}/api/form/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};