import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import styles from './Footer.module.sass';

function Footer () {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGroup}>
        © 2026 Bilous Oleh. All rights reserved.
      </div>
      <div className={styles.footerGroup}>
        <a
          href='https://github.com/BilousOleg/cinema_manager_project.git'
          target='_blank'
        >
          <GitHubIcon />
        </a>
        <a href='https://www.google.com/' target='_blank'>
          <LinkedInIcon />
        </a>
        <a href='https://t.me/bilous_0leh' target='_blank'>
          <TelegramIcon />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
