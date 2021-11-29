import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'

import QuranIcon from '../../../assets/images/icons8-quran-64.png'
import SettingsModal from '../SettingsModal/SettingsModal'
import styles from './header.module.scss'
import { CommonActionCreators } from '../../../store/commonSlice'

const Header = () => {
  const [searchInput, setSearchInput] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const { fetchReciters } = CommonActionCreators()

  useEffect(() => {
    fetchReciters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = () => {}
  return (
    <div className={styles.container}>
      {modalVisible && <SettingsModal close={() => setModalVisible(false)} />}

      <div className={styles.leftSquare}>
        <img src={QuranIcon} alt='' />
      </div>

      <div className={styles.headerRight}>
        <div className={styles.inputBlock}>
          <SearchIcon onClick={handleSearch} className={styles.searchIcon} />
          <input
            value={searchInput}
            onChange={({ target }) => setSearchInput(target.value)}
            placeholder={'Search here for surah, ayah'}
          />
        </div>

        <div className={styles.settings}>
          <SettingsIcon
            onClick={() => setModalVisible((prev) => !prev)}
            className={styles.settingsIcon}
          />
          <span>EN</span>
        </div>
      </div>
    </div>
  )
}

export default Header
