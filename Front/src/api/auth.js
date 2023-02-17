import axios from 'axios';

import jwt_decode from "jwt-decode";
import * as SecureStore from 'expo-secure-store';

async function register(data) {

    const res = await axios({
        method: 'post',
        url: `http://10.10.2.156:3000/auth/register`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    })

    return res;
}

async function login (data) {
    const res = await axios({
        method: 'post',
        url: `http://10.10.2.156:3000/auth`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data),
    });

    const token = res.data.token;
    console.log(token,'je suis log!')

    return res;
}

async function logOut (callback) {
    SecureStore.deleteItemAsync('token').then(() => {
        SecureStore.deleteItemAsync('authtoken').then(() => {
            SecureStore.deleteItemAsync('user_id').then(() => {
                SecureStore.deleteItemAsync('username').then(res => {
                    callback(res);
                })
            })
        });
    });
}

async function checkLoggedIn(callback) {

    getAuthToken().then(auth => {

        if (auth != null)
        {
            let now = Date.now().toString().slice(0, -3);
            now = parseInt(now);

            if (jwt_decode(auth).iat + 604800 <= now) {
                logOut(() => {
                    callback(false);
                });
            } else {
                callback(true);
            }
        } else {
            callback(false);
        }
    })
}

async function saveCredentials (token, authtoken, user_id, username, callback) {
    
    SecureStore.setItemAsync('token', token).then(() => {
        SecureStore.setItemAsync('authtoken', authtoken).then(res => {
            SecureStore.setItemAsync('user_id', user_id.toString()).then(res => {
                SecureStore.setItemAsync('username', username).then(res => {
                    callback(res);
                });
            });
        });
    });
}

async function getUserInfos (callback) {
    SecureStore.getItemAsync('user_id').then(id => {
        SecureStore.getItemAsync('username').then(username => {
            console.log("user_id:", id, "username:", username);
            callback({
                id: id,
                username: username
            })
        })
    })
}


async function refreshToken (token, callback) {
    SecureStore.setItemAsync('token', token).then(res => {
        callback(res);
    });
}

async function getToken() {
    return await SecureStore.getItemAsync('token');
}

async function getAuthToken () {
    return await SecureStore.getItemAsync('authtoken');
}

module.exports = {
    login, register, logOut, checkLoggedIn, saveCredentials, getUserInfos,refreshToken, getToken, getAuthToken
}