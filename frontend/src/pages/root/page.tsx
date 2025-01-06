import { apiClient } from "@/api/client";
import { testAuthApiV1AuthPasswordTestGet } from "@/api/sdk.gen";
import { selectAccessToken } from "@/reducers/token";
import { store } from "@/redux/store";
import { useState } from "react";


export default function RootPage() {
    const state = testAuthApiV1AuthPasswordTestGet(
        {
            client: apiClient
        })

    const [dummyState, dummySetState] = useState("Initial state")
    
    let display = "Error"
    state.then((value) => {
        if (value.response.status != 401) {
            const state = store.getState()
            const accessToken = selectAccessToken(
                state
            )

            display = accessToken.accessToken
        } else{
            display = "Problem with token"
        }
        
    })
    state.catch((error: Error) => {
        display = error.message
        console.log(error)
    })
    state.finally(() => {
        if (display) {
            dummySetState(display)
        }
    })
    
    
    
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
            <h1>{dummyState}</h1>
            
        </div>
        </div>
    )
}
