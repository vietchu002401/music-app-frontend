import axios from "axios"
import { useEffect, useState } from "react"

export let useFetch = (url, method, body, again) => {
    let [apiData, setApiData] = useState(null)
    let [serverError, setServerError] = useState(null)
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        let fetchData = async () => {
            try {
                let resp = await axios({
                    method: method,
                    url: url,
                    data: body
                });
                let data = await resp.data;

                setApiData(data);
                setLoading(false);
            } catch (error) {
                setServerError(error);
                setLoading(false);
            }
        };
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, method, again])

    return [apiData, serverError, loading]
}