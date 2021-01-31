import { restRequest } from '../Common/Utils';
import { BOOKING_CONFIG } from '../Common/Constant';

export async function getBookingSettings() {
    try {
        const result = await fetch("http://localhost:8000/bookingConfigs").then((response)=>{
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
            const response = await restRequest(`http://localhost:8000/bookingConfig/${index+1}`, body, "put");
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