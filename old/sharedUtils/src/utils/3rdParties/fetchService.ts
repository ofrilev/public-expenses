import axios from 'axios';

export const fetchService = async (endpoint: string, method: string = "GET"): Promise<any> => {
    return await axios.get(endpoint)
}



