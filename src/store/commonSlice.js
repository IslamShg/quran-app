import { createSlice, bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const initialState = {
  lang: 'en',
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLang(state, action) {
      state.lang = action.payload
    },
  },
})

export const CommonActionCreators = () => {
  const dispatch = useDispatch()
  return bindActionCreators({ ...commonSlice.actions }, dispatch)
}
