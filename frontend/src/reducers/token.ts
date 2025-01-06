import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AccessTokenState {
    accessToken: string
  }

  
const initialState: AccessTokenState = {
    accessToken: ""
}

export const accessTokenSliceName = "accessToken"
export const accessTokenSlice = createSlice(
    {
        name: accessTokenSliceName,
        initialState: initialState,
        reducers:{
            setAccessToken: (state, action: PayloadAction<string>) => {
                console.log("action payload", action.payload)
                state.accessToken = action.payload
            }
        }

    }
)

export const { setAccessToken } = accessTokenSlice.actions
export const selectAccessToken = (state: RootState) => state.accessToken
export const accessTokenReducer = accessTokenSlice.reducer
