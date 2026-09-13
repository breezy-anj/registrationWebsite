import Link from 'next/link';
import styles from './page.module.css';

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const team = resolvedParams.team as string;
  const count = resolvedParams.count as string;

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
        Thank you for registering for the "How to Hackathon !!" event. We've successfully saved your details.
      </p>

      {team && (
        <div className={`${styles.detailsCard} glass animate-fade-in`} style={{ animationDelay: '0.3s' }}>
          <h2 className={styles.detailsTitle}>Team: {team}</h2>
          <ul className={styles.detailsList}>
            <li><strong>Members Registered:</strong> {count || 1}</li>
            <li>Your information has been successfully secured.</li>
          </ul>
        </div>
      )}

      <div className="animate-fade-in" style={{ animationDelay: '0.4s', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link href="/register" className="btn btn-primary">
          View QR Passes
        </Link>
        <Link href="/" className="btn" style={{ backgroundColor: 'var(--secondary)', border: '1px solid var(--border)', color: '#fff' }}>
          Return Home
        </Link>
      </div>
    </main>
  );
}
