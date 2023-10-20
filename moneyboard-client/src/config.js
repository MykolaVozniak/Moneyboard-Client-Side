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
const API_PROJECT_OWNER_LIST = LOCALHOST_URL + PROJECT + 'owner';
const API_PROJECT_MEMBER_LIST = LOCALHOST_URL + PROJECT + 'member';
const API_PROJECT_INFO = LOCALHOST_URL + PROJECT + 'info' + '/';

const config = {
    LOCALHOST_URL,
    API_AUTH_REG,
    API_AUTH_LOGIN,
    API_AUTH_LOGOUT,
    API_USER_INFO,
    API_USER_EDIT,
    API_PROJECT_CREATE,
    API_PROJECT_OWNER_LIST,
    API_PROJECT_MEMBER_LIST,
    API_PROJECT_INFO
};

export default config;