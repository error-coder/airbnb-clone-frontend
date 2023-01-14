import axios from "axios";

const instance = axios.create({
    baseURL : "http://127.0.0.1:8000/api/v3/"
})

export const getRooms = () => instance.get("rooms/").then(response => response.data);

export const getRoom = () => instance.get(`rooms/9`).then(response => response.data);