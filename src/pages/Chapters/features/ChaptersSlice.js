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
  async ({ id, lang }, { dispatch, getState }) => {
    const { data } = await QuranApiInstance.get(
      `verses/by_chapter/${id}?language=${lang}&words=true`
    )
    return { ...data, chapterId: id }
  }
)

const asyncActionCreators = {
  fetchChapters,
  fetchVersesByChapter,
}

const initialState = {
  chapters: [],
  status: 'idle',
  pagination: {},
  selectedChapter: null,
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
      state.chapterVerses = payload.verses
      state.selectedChapter = state.chapters.find(
        (chapter) => chapter.id === payload.chapterId
      )
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
