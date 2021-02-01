import { BACKEND_HOST, BACKEND_PORT } from '../Common/Constant';
import { restRequest } from '../Common/Utils';

export async function authenticate(token) {
    try {
        const response = await restRequest(`http://${BACKEND_HOST}:${BACKEND_PORT}/login`, token, "post");
        return response;

    } catch (error) {
        console.log(error);
        return ({
            error: "Unable to reach login server"
        });
    }
}