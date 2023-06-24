import axios from "axios";
import { WEB_API_KEY } from "../constants/webapikey";


const SIGN_UP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
const SIGN_IN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
const URL_ROOT = "https://identitytoolkit.googleapis.com/v1/accounts:";

export function createUser(email, password) {
    return authenticate("signUp", email, password); 
}
 
export function login(email, password) {
    return authenticate("signInWithPassword", email, password);
}

async function authenticate(mode, email, password) {
    const url = `${URL_ROOT}${mode}?key=${WEB_API_KEY}`;

    
    const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true
    });

    const token = response.data.idToken;

    return token; 
}