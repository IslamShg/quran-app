import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import ImportContactsIcon from '@mui/icons-material/ImportContacts'
import FavoriteIcon from '@mui/icons-material/Favorite'

import styles from './navMenu.module.scss'

const NavMenu = () => {
  const { pathname } = useLocation()

  return (
    <nav className={styles.sidebarMenu}>
      <NavLink
        className={() =>
          pathname.includes('/chapters') ? styles.activeLink : styles.link
        }
        to='/chapters/1?page=1'
      >
        <ImportContactsIcon className={styles.icon} />
      </NavLink>
      <NavLink
        to='/savedAyahs'
        className={({ isActive }) =>
          isActive ? styles.activeLink : styles.link
        }
      >
        <FavoriteIcon className={styles.icon} />
      </NavLink>
    </nav>
  )
}

export default NavMenu
