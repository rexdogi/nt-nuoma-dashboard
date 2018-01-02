import axios from 'axios';

const headers = () => ({
    'Authorization': localStorage.getItem('id_token'),
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    crossDomain: true
});

const REMOTE_ENDPOINT = 'http://108.59.80.189:8080';
const LOCAL_ENDPOINT = 'http://localhost:8080';

const SELECTED = LOCAL_ENDPOINT;

export function get(api, config) {
    return axios.get(SELECTED + api, {...config, headers: headers()})
}

export function post(api, data, config) {
    return axios.post(SELECTED + api, data, {...config, headers: headers()})
}

export function put(api, data, config) {
    return axios.put(SELECTED + api, data, {...config, headers: headers()})
}

export function destroy(api, config = {}) {
    return axios.delete(SELECTED + api, {...config, headers: headers()})
}