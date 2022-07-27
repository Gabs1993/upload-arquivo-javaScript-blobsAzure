import axios from "axios";



const api = axios.create({
  baseURL: 'https://csfgrupoeconomicodev.azurewebsites.net/'
});



export const upload = async (fileName) => api.post('/FileDocuments/upload', fileName);

export const read = async (fileName) => api.get(`/FileDocuments/read?fileName=${fileName}`);

export const download = async (fileName) => api.get(`/FileDocuments/Download?fileName=${fileName}`);

export const deletar = async (fileName) => api.delete(`FileDocuments/delete?fileName=${fileName}`);