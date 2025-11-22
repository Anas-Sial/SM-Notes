export const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const getApiUrl = (endpoint: string) => API_BASE_URL + endpoint;

export const TODOS = getApiUrl("/todos");

