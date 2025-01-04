import { createClient } from '@hey-api/client-fetch';
import { store } from "@/redux/store";

const current_state = store.getState()

export const apiClient = createClient({
            baseUrl: 'http://0.0.0.0:8010',
        }
    );

apiClient.interceptors.request.use((request, options) => {
request.headers.set('Authorization', 'Bearer ' + current_state.accessToken );
return request;
});
