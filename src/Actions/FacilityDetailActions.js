import { restRequest } from '../Common/Utils';
import { MAX_FACILITY_DETAILS_PER_CALL } from '../Common/Constant';

export async function getFacilityDetails() {
    try {
        var allResult = [];
        const recordCount = await fetch("http://localhost:8000/facilityDetailsCount").then((response)=>{
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
                const result = await fetch(`http://localhost:8000/facilityDetails?start=${index}&count=${MAX_FACILITY_DETAILS_PER_CALL}`).then((response)=>{
                    return response.json();
                });
                allResult = allResult.concat(result);
                index = index + MAX_FACILITY_DETAILS_PER_CALL;
            } while(index < recordCount);
        }

        return allResult;

    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function updateFacilityDetail(updateDetail) {
    if(!updateDetail.id)
    {
        return false;
    }
    try {
        const response = await restRequest(`http://localhost:8000/facilityDetail/${updateDetail.id}`, updateDetail, "put")
        if(response.error)
        {
            return false;
        }
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function createFacilityDetail(newFacility) {
    try {
        const response = await restRequest(`http://localhost:8000/facilityDetail`, newFacility, "post");
        if(response.error)
        {
            return false;
        }
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function deleteFacilityDetail(id) {
    try {
        const response = await restRequest(`http://localhost:8000/facilityDetail/${id}`, {}, "delete");
        if(response.error)
        {
            return false;
        }
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}