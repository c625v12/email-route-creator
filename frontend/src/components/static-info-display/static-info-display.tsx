import styles from './static-info-display.module.scss';

export function StaticInfoDisplay({
  item,
}: {
  item: { title: string; info: string };
}) {
  return (
    <div className={styles.staticInfo}>
      <div>{item.title}</div>
      <div className={styles.info}>{item.info}</div>
    </div>
  );
}

export default StaticInfoDisplay;
