import styles from "./footbarTyping.module.css";

const FootBar: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <a className={styles.typingFirstDiv}>人</a>
      <a className={styles.typingSecondDiv}>生</a>
      <a className={styles.typingThirdDiv}>若</a>
      <a className={styles.typingFourthDiv}>梦</a>
      <a className={styles.typingFifthDiv}>&nbsp;&nbsp;</a>
      <a className={styles.typingSixthDiv}>为</a>
      <a className={styles.typingSeventhDiv}>欢</a>
      <a className={styles.typingEighthDiv}>几</a>
      <a className={styles.typingNinthDiv}>何</a>
    </div>
  );
};

export default FootBar;
