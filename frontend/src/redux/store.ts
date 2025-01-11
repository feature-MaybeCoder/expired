import { configureStore } from "@reduxjs/toolkit";
import { Store } from "redux";
import { accessTokenReducer } from "@/reducers/token";


export const store: Store = configureStore(
    {
        reducer: {
            accessToken: accessTokenReducer,
          },
    },
)

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


