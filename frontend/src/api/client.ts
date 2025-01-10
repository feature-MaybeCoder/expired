import { createClient } from '@hey-api/client-fetch';
import { authService } from '@/services/auth';
import { BEARER_AUTHORIZATION_PREFIX, HEADERS } from '@/constants/http';
import { ROUTES_ALLOWED_WITHOUT_LOGIN } from '@/constants/auth';
import { sessionAccessTokenName } from '@/constants/security';


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
    const accessToken = localStorage.getItem(sessionAccessTokenName)

    if (location.pathname in ROUTES_ALLOWED_WITHOUT_LOGIN) {
        return request
    }
    
    if (accessToken){
        request.headers.set(
            HEADERS.authorization, 
            BEARER_AUTHORIZATION_PREFIX + accessToken
        )
    }
    
    return request
}
)

    
