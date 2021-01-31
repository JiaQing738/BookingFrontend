import { restRequest } from '../Common/Utils';

export async function authenticate(token) {
    try {
        const response = await restRequest(`http://localhost:8000/login`, token, "post");
        return response;

    } catch (error) {
        console.log(error);
        return false;
    }
}