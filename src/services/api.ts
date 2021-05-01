import axios from 'axios'

const api = axios.create({
  baseURL: 'http://<insira o ip de sua maquina>:3333',
})

export default api