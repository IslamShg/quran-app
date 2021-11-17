import { createSlice, bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { asyncActionCreators } from './asyncActions'

const { fetchReciters } = asyncActionCreators

const initialState = {
  lang: 'en',
  selectedReciterId: 7,
  reciters: [],
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLang(state, { payload }) {
      state.lang = payload
    },
    selectReciter(state, { payload }) {
      state.selectedReciterId = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReciters.fulfilled, (state, { payload }) => {
      state.reciters = payload
    })
  },
})

export const CommonActionCreators = () => {
  const dispatch = useDispatch()
  return bindActionCreators(
    { ...commonSlice.actions, ...asyncActionCreators },
    dispatch
  )
}
