import styles from '@/app/style/kofi.module.scss';

export function Kofi() {
  return (
    <iframe
      id="kofiframe"
      src="https://ko-fi.com/candyjoy/?hidefeed=true&widget=true&embed=true&preview=true"
      className={styles.kofi}
      height="712"
      title="Support me on Ko-fi"
    />
  );
}