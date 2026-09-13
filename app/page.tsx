import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={`${styles.hero} animate-fade-in`}>
        <h1 className={styles.title}>
          <span className="gradient-text">How to Hackathon !!</span>
        </h1>
        <p className={styles.description}>
          Unite with creative thinkers and aspiring technologists. Learn the dynamics of tech competitions, networking, and modern trends.
        </p>
        <Link href="/register" className="btn btn-primary">
          Register Now
        </Link>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.card} glass animate-fade-in`} style={{ animationDelay: '0.1s' }}>
          <h2 className={styles.cardTitle}>About the Event</h2>
          <p className={styles.cardText}>
            Inspired by the comprehensive vision of larger events, this session aims to introduce participants to hackathons. From ideation to execution, we've got you covered.
          </p>
        </div>

        <div className={`${styles.card} glass animate-fade-in`} style={{ animationDelay: '0.2s' }}>
          <h2 className={styles.cardTitle}>Event Flow</h2>
          <ul className={styles.flowList}>
            <li className={styles.flowItem}>
              <span className={styles.flowTime}>~30 mins: Introduction</span>
              <span className={styles.flowDesc}>President's address & event preview</span>
            </li>
            <li className={styles.flowItem}>
              <span className={styles.flowTime}>Main Session</span>
              <span className={styles.flowDesc}>Insights on hackathons, tech trends, and networking</span>
            </li>
            <li className={styles.flowItem}>
              <span className={styles.flowTime}>1 hour: Mini Idea Challenge</span>
              <span className={styles.flowDesc}>Mentored ideation for software solutions</span>
            </li>
            <li className={styles.flowItem}>
              <span className={styles.flowTime}>~30 mins: Judging & Conclusion</span>
              <span className={styles.flowDesc}>Result declaration & future event promotion</span>
            </li>
          </ul>
        </div>
        
        <div className={`${styles.card} glass animate-fade-in`} style={{ animationDelay: '0.3s' }}>
          <h2 className={styles.cardTitle}>Details</h2>
          <p className={styles.cardText}>
            <strong>Team Size:</strong> 1 to 3 members<br/>
            <strong>Pre-requisites:</strong> None<br/>
            <strong>Tools:</strong> AI tools are encouraged!<br/>
            <strong>Prizes:</strong> Goodies for the best ideas.
          </p>
        </div>
      </div>
    </main>
  );
}
