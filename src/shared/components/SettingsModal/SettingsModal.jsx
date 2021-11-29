import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import { CommonActionCreators } from '../../../store/commonSlice'
import styles from './settingsModal.module.scss'

const SettingsModal = ({ close }) => {
  const [reciterDropdownOpened, setReciterDropdownOpened] = useState()
  const [, setSearchParams] = useSearchParams()

  const { selectReciter } = CommonActionCreators()
  const { reciters, selectedReciterId } = useSelector((s) => s.common)
  const selectedReciter =
    reciters.find((rec) => rec.id === selectedReciterId) || null

  const setReciter = (id) => {
    setSearchParams({ page: 1 })
    selectReciter(id)
    localStorage.setItem('reciterId', id)
  }

  return (
    <>
      <div className={styles.modalOverlay} onClick={close} />
      <div className={styles.container}>
        <div className={styles.modalHeader}>
          <span>Settings</span>
          <CloseIcon className={styles.closeIcon} onClick={close} />
        </div>

        <div className={styles.modalBody}>
          <div className={styles.reciter}>
            <span className={styles.reciterTitle}>RECITER</span>
            <div
              className={styles.reciterSelect}
              onClick={() => setReciterDropdownOpened((prev) => !prev)}
            >
              <span className={styles.selectedReciterName}>
                {selectedReciter?.reciter_name}
              </span>
              <span>
                {reciterDropdownOpened ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </span>

              {reciterDropdownOpened && (
                <div className={styles.recitersList}>
                  {reciters.map((rec) => (
                    <div
                      onClick={() => setReciter(rec.id)}
                      className={styles.reciterItem}
                      key={rec.id}
                    >
                      {rec.reciter_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsModal
