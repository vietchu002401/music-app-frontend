import axios from "axios";
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
    maxAge: 10 * 60 * 1000
})

const api = axios.create({
    adapter: cache.adapter
})

export default api