import React from 'react'
import styles from './Navigation.module.scss';
import clsx from 'clsx';
import Link from 'next/link'

const Navigation = () => {
  return (
    <div className={styles.navigation}>
      <nav>
        <ul style={{ display: 'flex' }} className={clsx(styles.navigation__list)}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/films">Films</Link></li>
          <li><Link href="/">Movie Sessions</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation