const LOCALHOST_URL = 'https://localhost:44339/';

const AUTH = 'api/Authentication/';
const PROJECT = 'api/Project/';
const USER = 'api/User/';

const API_AUTH_REG = LOCALHOST_URL + AUTH + 'registration';
const API_AUTH_LOGIN = LOCALHOST_URL + AUTH + 'login';
const API_AUTH_LOGOUT = LOCALHOST_URL + AUTH + 'logout';

const API_USER_INFO = LOCALHOST_URL + USER + 'info';
const API_USER_EDIT = LOCALHOST_URL + USER + 'edit';

const API_PROJECT_CREATE = LOCALHOST_URL + PROJECT + 'create';

export default {
    LOCALHOST_URL, 
    API_AUTH_REG, 
    API_AUTH_LOGIN, 
    API_AUTH_LOGOUT, 
    API_USER_INFO,
    API_USER_EDIT,
    API_PROJECT_CREATE,
};