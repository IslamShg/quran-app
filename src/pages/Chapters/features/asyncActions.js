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
    const per_page = getState().chapters.pagination.per_page
    const { data } = await QuranApiInstance.get(`verses/by_chapter/${id}`, {
      params: {
        language: lang,
        words: true,
        per_page,
        page,
        word_fields: 'text_uthmani, text_indopak, text_uhtimani_tajweed',
      },
    })
    return { ...data, page }
  }
)

export const asyncActionCreators = {
  fetchChapters,
  fetchVersesByChapter,
}
