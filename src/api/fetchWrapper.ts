import { toast } from 'react-toastify';

export const BASE_URL = 'http://localhost:8080/api/';


const fetchWrapper = async (url: string, options: RequestInit = {}) => {
    try {
        const response = await fetch(`${BASE_URL}${url}`, options);
        console.log(response);

        if (!response.ok) {
           
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred');
        }

        return response.json(); 
    } catch (error) {
       
        toast.error('An unexpected error occurred');
        throw error;
    }
};

export default fetchWrapper;