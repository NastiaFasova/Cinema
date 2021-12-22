import React from 'react'
import styles from './Navigation.module.scss';
import clsx from 'clsx';
import Link from 'next/link'
import { selectUser } from '../../globalStore/slices/authSlice';
import { useAppSelector } from '../../globalStore/hooks';

const Navigation = () => {
  const user = useAppSelector(selectUser);
  return (
    <div className={styles.navigation}>
      <nav>
        <ul style={{ display: 'flex' }} className={clsx(styles.navigation__list)}>
          {!user.blocked && <li><Link href="/">{user.email ? 'Movie Sessions' : 'Home'}</Link></li>}
          <li><Link href="/films">Films</Link></li>
          {user.email && !user.blocked && <li><Link href="/cinema-halls">Cinema Halls</Link></li>}
        </ul>
      </nav>
    </div>
  )
}

export default Navigation