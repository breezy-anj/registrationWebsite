import Link from 'next/link';
import styles from './page.module.css';

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const team = resolvedParams.team as string;
  const m1 = resolvedParams.m1 as string;
  const m2 = resolvedParams.m2 as string;
  const m3 = resolvedParams.m3 as string;
  const p1 = resolvedParams.p1 as string;
  const p2 = resolvedParams.p2 as string;
  const p3 = resolvedParams.p3 as string;

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

      {(team || m1) && (
        <div className={`${styles.detailsCard} glass animate-fade-in`} style={{ animationDelay: '0.3s' }}>
          <h2 className={styles.detailsTitle}>Team: {team || 'Individual Registration'}</h2>
          <ul className={styles.detailsList}>
            {m1 && <li><strong>Leader:</strong> {m1} ({p1})</li>}
            {m2 && <li><strong>Member 2:</strong> {m2} ({p2})</li>}
            {m3 && <li><strong>Member 3:</strong> {m3} ({p3})</li>}
          </ul>
        </div>
      )}

      <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
      </div>
    </main>
  );
}
