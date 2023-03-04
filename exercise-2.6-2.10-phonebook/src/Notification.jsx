import styles from "./assets/notification.module.css";

const Notification = ({ noti }) => {
  if (noti === null) {
    return;
  }
  return (
    <div className={noti.style ? `${styles.greennoti}` : `${styles.rednoti}`}>
      {noti.text}
    </div>
  );
};

export default Notification;
