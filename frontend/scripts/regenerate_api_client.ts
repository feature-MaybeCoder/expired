import { createClient } from "@hey-api/openapi-ts"
import { Axios } from "axios"

const axios = new Axios()
try {

    const response = await axios.get("http://0.0.0.0:8010/openapi.json")
    const openapi = response.data
    

    await createClient(
        {
            client: "@hey-api/client-fetch",
            input: openapi,
            output: "../src/api"
        }
    )
} catch(error) {
    console.log(error) 
}