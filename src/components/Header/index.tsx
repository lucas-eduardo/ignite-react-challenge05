import Link from 'next/link';

import commonStyles from '../../styles/common.module.scss';
import styles from './header.module.scss';

export function Header(): JSX.Element {
  return (
    <header className={`${commonStyles.container} ${styles.header}`}>
      <div className={commonStyles.maxWrapper}>
        <Link href="/">
          <a>
            <img loading="lazy" src="/logo.svg" alt="SpaceTraveling" />
          </a>
        </Link>
      </div>
    </header>
  );
}
