import { getAuthToken } from "./token.service";

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:4747';

export const getAllQuestions = async () => {
    const response = await fetch(`${apiURL}/api/question/all`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        }
    });

    const data = response.json();
    return data;
};

export const getQuestionByQuestionID = async questionID => {
    const response = await fetch(`${apiURL}/api/question/${questionID}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        }
    });

    const data = response.json();
    return data;
};

export const addQuestion = async question => {
    const response = await fetch(`${apiURL}/api/question/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(question)
    });

    const data = response.json();
    return data;
};

export const editQuestion = async (questionID, question) => {
    const response = await fetch(`${apiURL}/api/question/edit/${questionID}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(question)
    });

    const data = response.json();
    return data;
};

export const removeQuestion = async questionID => {
    const response = await fetch(`${apiURL}/api/question/remove/${questionID}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};