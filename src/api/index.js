import axios from 'axios'

export const QuranApiInstance = axios.create({
  baseURL: 'https://api.quran.com/api/v4/',
})
