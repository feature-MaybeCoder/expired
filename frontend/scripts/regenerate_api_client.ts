import { createClient } from "@hey-api/openapi-ts"
import fetch from 'node-fetch';
import axios, {isCancel, AxiosError} from 'axios';



try {

    const response = await axios.get("http://0.0.0.0:8010/openapi.json")
    const openapi = response.data
    

    await createClient(
        {
            client: "@hey-api/client-fetch",
            input: openapi,
            output: "./src/api"
        }
    )
} catch(error) {
    console.log(error) 
}