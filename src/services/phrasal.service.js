import { getAuthToken } from "./token.service";

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:4747';

export const getAllVerbs = async () => {
    const response = await fetch(`${apiURL}/api/phrasal-verb/all`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        }
    });

    const data = response.json();
    return data;
};

export const getVerbByVerbID = async verbID => {
    const response = await fetch(`${apiURL}/api/phrasal-verb/${verbID}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        }
    });

    const data = response.json();
    return data;
};

export const addVerb = async verb => {
    const response = await fetch(`${apiURL}/api/phrasal-verb/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(verb)
    });

    const data = response.json();
    return data;
};

export const editVerb = async (verbID, verb) => {
    const response = await fetch(`${apiURL}/api/phrasal-verb/edit/${verbID}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(verb)
    });

    const data = response.json();
    return data;
};

export const removeVerb = async verbID => {
    const response = await fetch(`${apiURL}/api/phrasal-verb/remove/${verbID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};