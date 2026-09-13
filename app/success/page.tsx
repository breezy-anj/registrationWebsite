import Link from 'next/link';
import styles from './page.module.css';

export default function Success() {
  return (
    <main className={styles.container}>
      <div className={`${styles.icon} animate-fade-in`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h1 className={`${styles.title} animate-fade-in`} style={{ animationDelay: '0.1s' }}>
        Registration <span className="gradient-text">Complete!</span>
      </h1>
      <p className={`${styles.message} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
        Thank you for registering for the "How to Hackathon !!" event. We've successfully saved your details and you're all set. Keep an eye on your email or college groups for further updates!
      </p>
      <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    </main>
  );
}
