import { createClient } from '@hey-api/client-fetch';
import { authService } from '@/services/auth';
import { getAuth } from 'firebase/auth';
import { BEARER_AUTHORIZATION_PREFIX, HEADERS } from '@/constants/http';


export const apiClient = createClient({
            baseUrl: 'http://0.0.0.0:8010',

        }
    );

apiClient.interceptors.response.use((response) => {
    if (
        response.status == 401

    ){
        authService.processNotLoggedInUser()
    }
    
    return response;
});

apiClient.interceptors.request.use((request) => {
    const currentUser = getAuth().currentUser
    let accessToken = ""
    if (currentUser){
        const getIdToken = currentUser.getIdToken()
        getIdToken.then((idToken) => {
            accessToken = idToken
            console.log("Got token", idToken)
        })
        getIdToken.catch((error) => {
            console.error("Error getting id token: ", error)
        })
    }

    request.headers.set(
        HEADERS.authorization, 
        BEARER_AUTHORIZATION_PREFIX + accessToken
    )
    return request;
});
