import { restRequest } from '../Common/Utils';
import { BOOKING_CONFIG, BACKEND_HOST, BACKEND_PORT } from '../Common/Constant';

export async function getBookingSettings() {
    try {
        const result = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/bookingConfigs`).then((response)=>{
            return response.json();
        });
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function updateBookingSettings(newConfig) {
    try {
        BOOKING_CONFIG.forEach(async (config,index)=>{
            const body = {
                key:config,
                value:newConfig[config]
            }
            const response = await restRequest(`http://${BACKEND_HOST}:${BACKEND_PORT}/bookingConfig/${index+1}`, body, "put");
            if(response.error)
            {
                console.log(response.error);
                return false;
            }
        });
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}