/* eslint-disable import/no-anonymous-default-export */
import config from "./config";

export default {
    login: ({ username, password, captchaResult }: { username: string, password: string, captchaResult: string }) => {
        const request = new Request(config.authUrl, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json', 'CaptchaResponse': captchaResult }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error('Неправильный логин или пароль');
                }
                return response.json();
            })
            .then(({ data: { accessToken, roles } }) => {
                setAuthData(accessToken, roles);
            });
    },
    logout: () => {
        clearAuthData();
        return Promise.resolve();
    },
    checkError: (error: any) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            clearAuthData();
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return getToken() ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => {
        const roles = getPermissions();
        return roles ? Promise.resolve(JSON.parse(roles)) : Promise.resolve([]);
    }
};

const getToken = () => localStorage.getItem('token');
const getPermissions = () => localStorage.getItem('permissions');

const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
}

const setAuthData = (token: string, permissions: string[]) => {
    localStorage.setItem('token', token);
    localStorage.setItem('permissions', JSON.stringify(permissions));
}
