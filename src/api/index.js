import axios from 'axios'

export const AUDIOS_URL = 'https://verses.quran.com/'

export const QuranApiInstance = axios.create({
  baseURL: 'https://api.quran.com/api/v4/',
})
