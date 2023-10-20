import sendRequest from "./send-request";
const BASE_URL = '/api/notes';

export async function add(note) {
  return sendRequest(BASE_URL, 'POST', {text: note});
}

export async function getAll() {
    return sendRequest(BASE_URL)
}