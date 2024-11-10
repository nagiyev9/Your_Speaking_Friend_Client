import { getAuthToken } from "./token.service";

const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:4747';

export const getAllTopics = async () => {
    const response = await fetch(`${apiURL}/api/topic/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};

export const getTopicByTopicID = async topicID => {
    const response = await fetch(`${apiURL}/api/topic/${topicID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};

export const addTopic = async topic => {
    const response = await fetch(`${apiURL}/api/topic/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(topic),
    });

    const data = response.json();
    return data;
};

export const editTopic = async (topicID, topic) => {
    const response = await fetch(`${apiURL}/api/topic/edit/${topicID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify(topic),
    });

    const data = response.json();
    return data;
};

export const removeTopic = async topicID => {
    const response = await fetch(`${apiURL}/api/topic/remove/${topicID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${getAuthToken()}`,
        },
    });

    const data = response.json();
    return data;
};