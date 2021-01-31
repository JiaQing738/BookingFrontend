import { restRequest } from '../Common/Utils';
import { MAX_BOOKINGS_PER_CALL } from '../Common/Constant';

export async function getBookings(userId=null) {
    try {
        var allResult = [];
        const recordCount = await fetch(`http://localhost:8000/bookingsCount${(userId)?`?user_id=${userId}`:''}`).then((response)=>{
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
                const result = await fetch(`http://localhost:8000/bookings?start=${index}&count=${MAX_BOOKINGS_PER_CALL}${(userId)?`&user_id=${userId}`:''}`).then((response)=>{
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
        const response = await restRequest(`http://localhost:8000/booking`, newBooking, "post");
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

export async function deleteBooking(id) {
    try {
        const response = await restRequest(`http://localhost:8000/booking/${id}`, {}, "delete");
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