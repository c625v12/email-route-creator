import styles from './header.module.scss';

export function Header({content}: {content: {title:string}}) {
  return (
    <h1 className={styles.header}>{content.title}</h1>
  );
}

export default Header;
