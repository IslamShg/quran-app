import {
  createSlice,
  bindActionCreators,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { QuranApiInstance } from '../../../api/index'

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
      },
    })
    return { ...data, page }
  }
)

const asyncActionCreators = {
  fetchChapters,
  fetchVersesByChapter,
}

const initialState = {
  chapters: [],
  status: 'idle',
  pagination: {
    per_page: 50,
    total_records: null,
    total_pages: null,
    next_page: null,
  },
  chapterVerses: [],
}

export const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setChaptersList(state, action) {
      state.chapters = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChapters.pending, (state) => {
      state.status = 'pending'
    })
    builder.addCase(fetchChapters.fulfilled, (state, action) => {
      state.chapters = action.payload
      state.status = 'completed'
    })
    builder.addCase(fetchVersesByChapter.fulfilled, (state, { payload }) => {
      state.chapterVerses =
        +payload.page === 1
          ? payload.verses
          : [...state.chapterVerses, ...payload.verses]

      state.pagination = {
        ...state.pagination,
        total_records: payload.pagination.total_records,
        total_pages: payload.pagination.total_pages,
        next_page: payload.pagination.next_page,
      }
    })
  },
})

export const MainActionCreators = () => {
  const dispatch = useDispatch()
  return bindActionCreators(
    { ...chaptersSlice.actions, ...asyncActionCreators },
    dispatch
  )
}
