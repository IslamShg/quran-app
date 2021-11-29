import { createAsyncThunk } from '@reduxjs/toolkit'
import { QuranApiInstance } from '../../../api'

const fetchChapters = createAsyncThunk(
  'chapters/fetchChapters',
  async ({ lang }) => {
    const { data } = await QuranApiInstance.get(`chapters?language=${lang}`)
    return data.chapters
  }
)

const fetchVersesByChapter = createAsyncThunk(
  'chapters/fetchVersesByChapter',
  async ({ id, lang, page }, { getState }) => {
    const { selectedReciterId } = getState().common
    const per_page = getState().chapters.pagination.per_page

    const { data } = await QuranApiInstance.get(`verses/by_chapter/${id}`, {
      params: {
        language: lang,
        words: true,
        per_page,
        page,
        word_fields: 'text_uthmani, text_indopak, text_uhtimani_tajweed',
        audio: selectedReciterId,
        tafsirs: '169',
      },
    })
    return { ...data, page }
  }
)

const fetchSingleTafsir = createAsyncThunk(
  'chapters/fetchSingleTafsir',
  async ({ verse_key }) => {
    const { data } = await QuranApiInstance.get(`quran/tafsirs/169`, {
      params: {
        language: 'en',
        verse_key,
      },
    })
    return data.tafsirs[0].text
  }
)

export const asyncActionCreators = {
  fetchChapters,
  fetchVersesByChapter,
  fetchSingleTafsir,
}
