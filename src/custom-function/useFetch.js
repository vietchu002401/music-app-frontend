import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import api from "./axios"

export let useFetch = (url, method, body, again) => {
    let [apiData, setApiData] = useState(null)
    let [serverError, setServerError] = useState(null)
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        const ourRequest = axios.CancelToken.source()
        setLoading(true)
        let fetchData = async () => {
            try {
                let resp = await api({
                    method: method,
                    url: url,
                    data: body
                }, { cancelToken: ourRequest.token });
                let data = await resp.data;

                setApiData(data);
                setLoading(false);
            } catch (error) {
                setServerError(error);
                setLoading(false);
            }
        };
        fetchData()
        return () => {
            ourRequest.cancel()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, method, again])

    return useMemo(() => ([apiData, serverError, loading]), [loading, serverError, apiData])
}