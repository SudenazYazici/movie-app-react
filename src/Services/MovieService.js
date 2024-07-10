import axios from "axios";

const baseURL = 'https://localhost:3000/api/Movie';
const MovieService = {
    GetMovies: async() => {
        const response = await axios.get(baseURL);
        return response.data;
    },
    CreateMovie: async(movie) => {
        const response = await axios.post(baseURL, movie);
        return response.data;
    },
    UpdateMovie: async(id, movie) => {
        const response = await axios.put(`${baseURL}/${id}`, movie);
        return response.data;
    },
    DeleteMovie: async(id) => {
        const response = await axios.delete(`${baseURL}/${id}`);
        return response.data;
    }
}

export default MovieService;