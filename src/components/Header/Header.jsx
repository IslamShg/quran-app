import React, { useState } from 'react'
import QuranIcon from '../../assets/images/icons8-quran-64.png'
import SearchIcon from '@mui/icons-material/Search'

import styles from './header.module.scss'

const Header = () => {
  const [searchInput, setSearchInput] = useState(null)

  const handleSearch = () => {}

  return (
    <div className={styles.container}>
      <div className={styles.leftSquare}>
        <img src={QuranIcon} alt='' />
      </div>
      <div className={styles.changeLangBlock}>
        <div className={styles.inputBlock}>
          <SearchIcon onClick={handleSearch} className={styles.searchIcon} />
          <input
            value={searchInput}
            onChange={({ target }) => setSearchInput(target.value)}
            placeholder={'Search here for surah, ayah'}
          />
        </div>
        <span>EN</span>
      </div>
    </div>
  )
}

export default Header
