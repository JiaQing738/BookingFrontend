import { restRequest } from '../Common/Utils';
import { MAX_BOOKINGS_PER_CALL, BACKEND_HOST, BACKEND_PORT } from '../Common/Constant';

export async function getBookings(userId=null) {
    try {
        var allResult = [];
        const recordCount = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/bookingsCount${(userId)?`?user_id=${userId}`:''}`).then((response)=>{
            return response.json();
        });
        if(recordCount===0)
        {
            return [];
        }
        else
        {
            var index = 0;
            do{
                const result = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/bookings?start=${index}&count=${MAX_BOOKINGS_PER_CALL}${(userId)?`&user_id=${userId}`:''}`).then((response)=>{
                    return response.json();
                });
                allResult = allResult.concat(result);
                index = index + MAX_BOOKINGS_PER_CALL;
            } while(index < recordCount);
        }

        return allResult;

    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function createBooking(newBooking) {
    try {
        const response = await restRequest(`http://${BACKEND_HOST}:${BACKEND_PORT}/booking`, newBooking, "post");
        if(response.error)
        {
            return response.error;
        }
        return '';

    } catch (error) {
        return error;
    }
}

export async function deleteBooking(id) {
    try {
        const response = await restRequest(`http://${BACKEND_HOST}:${BACKEND_PORT}/booking/${id}`, {}, "delete");
        if(response.error)
        {
            console.log(response.error);
            return false;
        }
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}