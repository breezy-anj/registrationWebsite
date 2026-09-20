import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Trophy, Users, Lightbulb, CheckCircle2 } from 'lucide-react';
import HeroIllustration from '@/components/HeroIllustration';
import TypewriterHeader from '@/components/TypewriterHeader';

export default function Home() {
  return (
    <main style={{ width: '100%', overflow: 'hidden' }}>

      {/* ======================================================== */}
      {/* HERO SECTION */}
      {/* ======================================================== */}
      <section className="bg-contour-hero" style={{
        position: 'relative',
        padding: '4rem 1.5rem 5rem 1.5rem',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <div className="hero-grid" style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}>

          {/* Left Column: Hero Typography & CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

            {/* Small Red Pre-header Tag */}
            <div style={{
              display: 'inline-block',
              color: 'var(--primary-red)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 7vw, 3.15rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '0.5rem',
            }}>
              <span>How to</span>
            </div>

            {/* Animated Typewriter Headline */}
            <TypewriterHeader words={['Hackathon']} />

            {/* Subtext: "From Ideas. To Prototype." with "Ideas" and "Prototype" in red */}
            <p style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.85rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--black)',
              marginBottom: '1.25rem',
              lineHeight: 1.3,
            }}>
              From <span className="text-red">Ideas</span>. To <span className="text-red">Prototype</span>.
            </p>

            {/* Supporting Description */}
            <p style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              maxWidth: '540px',
              marginBottom: '2.25rem',
            }}>
              Unite with creative thinkers, designers, and aspiring technologists. Master competition dynamics, mentored problem solving, and bring your vision to life.
            </p>

            {/* Primary Action Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center',
              width: '100%',
              marginBottom: '3rem',

            }}>
              <Link
                href="/register"
                id="hero-register-cta"
                className="btn btn-primary"
                style={{
                  padding: '0.9rem 2.25rem',
                  fontSize: '1.05rem',
                }}
              >
                <span>Register Now</span>
                <ArrowRight size={20} />
              </Link>


            </div>



          </div>

          {/* Right Column: Lightbulb Puzzle SVG Illustration */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
            <HeroIllustration />
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* EVENT STATS / HIGHLIGHTS BAR */}
      {/* ======================================================== */}
      <section style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-color)',
        padding: '3rem 1.5rem',
      }}>
        <div style={{
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}>
          {/* Card 1 */}
          <div className="card-lift" style={{
            backgroundColor: '#F9FAFB',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.75rem 1.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#ECEEF1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A0A0A',
              marginBottom: '0.85rem',
            }}>
              <Users size={24} color="#0A0A0A" />
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--black)', marginBottom: '0.25rem' }}>
              1 to 3 Members
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Solo or Team Participation
            </div>
          </div>

          {/* Card 2 */}
          <div className="card-lift" style={{
            backgroundColor: '#F9FAFB',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.75rem 1.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#ECEEF1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A0A0A',
              marginBottom: '0.85rem',
            }}>
              <Sparkles size={24} color="#0A0A0A" />
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--black)', marginBottom: '0.25rem' }}>
              No Pre-requisites
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Beginner & Expert Friendly
            </div>
          </div>

          {/* Card 3 */}
          <div className="card-lift" style={{
            backgroundColor: '#F9FAFB',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.75rem 1.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#ECEEF1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A0A0A',
              marginBottom: '0.85rem',
            }}>
              <Trophy size={24} color="#0A0A0A" />
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--black)', marginBottom: '0.25rem' }}>
              Prizes & Goodies
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              For top innovative ideas
            </div>
          </div>

          {/* Card 4 */}
          <div className="card-lift" style={{
            backgroundColor: '#F9FAFB',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '1.75rem 1.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: '#ECEEF1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A0A0A',
              marginBottom: '0.85rem',
            }}>
              <Lightbulb size={24} color="#0A0A0A" />
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--black)', marginBottom: '0.25rem' }}>
              AI Tools Allowed
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Encouraged for ideation
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* ABOUT & EVENT FLOW SECTION */}
      {/* ======================================================== */}
      <section id="about" style={{
        backgroundColor: '#FFFFFF',
        padding: '5rem 1.5rem',
        maxWidth: '1240px',
        margin: '0 auto',
      }}>
        <div className="content-grid">

          {/* About Card */}
          <div className="card-lift" style={{
            backgroundColor: '#F9FAFB',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{
              display: 'inline-block',
              color: 'var(--primary-red)',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              Session Overview
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--black)',
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}>
              About the <span className="text-red">Event</span>
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
            }}>
              Inspired by the comprehensive vision of larger tech competitions,<span className='text-black'> this interactive session is designed to walk participants through every facet of modern hackathons </span>. From formulating high-impact problem statements to leveraging cutting-edge AI toolsets and delivering winning pitches.
            </p>

            {/* Glass KPI Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '1.75rem',
            }}>
              {/* KPI 1 */}
              <div className="glass-kpi-card" style={{ backgroundColor: '#FFFFFF' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--primary-red-light)',
                  color: 'var(--primary-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Lightbulb size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--black)', marginBottom: '0.2rem' }}>
                    Mentored Ideation
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Problem Statements & AI
                  </div>
                </div>
              </div>

              {/* KPI 2 */}
              <div className="glass-kpi-card" style={{ backgroundColor: '#FFFFFF' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--primary-red-light)',
                  color: 'var(--primary-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Users size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--black)', marginBottom: '0.2rem' }}>
                    Networking Dynamics
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Cross-functional Teams
                  </div>
                </div>
              </div>

              {/* KPI 3 */}
              <div className="glass-kpi-card" style={{ backgroundColor: '#FFFFFF' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--primary-red-light)',
                  color: 'var(--primary-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--black)', marginBottom: '0.2rem' }}>
                    Pitch Deck Framing
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    High-impact Storytelling
                  </div>
                </div>
              </div>

              {/* KPI 4 */}
              <div className="glass-kpi-card" style={{ backgroundColor: '#FFFFFF' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: 'var(--primary-red-light)',
                  color: 'var(--primary-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Trophy size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--black)', marginBottom: '0.2rem' }}>
                    Live Evaluation
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Real-time Jury Feedback
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule / Event Flow */}
          <div id="schedule" className="card-lift" style={{
            backgroundColor: '#F9FAFB',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-md)',
          }}>
            <div style={{
              display: 'inline-block',
              color: 'var(--primary-red)',
              fontWeight: 800,
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              Timeline
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--black)',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}>
              Event <span className="text-red">Flow</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Item 1 */}
              <div className="timeline-flow-card" style={{
                display: 'flex',
                gap: '1.25rem',
                padding: '1.25rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                borderLeft: '4px solid var(--black)',
              }}>
                <div style={{
                  minWidth: '90px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: 'var(--primary-red)',
                }}>
                  ~30 mins
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--black)', marginBottom: '0.2rem' }}>
                    Introduction & Address
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    President’s opening address, keynote remarks, and preview of hackathon tracks.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="timeline-flow-card" style={{
                display: 'flex',
                gap: '1.25rem',
                padding: '1.25rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                borderLeft: '4px solid var(--black)',
              }}>
                <div style={{
                  minWidth: '90px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: 'var(--primary-red)',
                }}>
                  Main
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--black)', marginBottom: '0.2rem' }}>
                    Main Session & Tech Trends
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Insights into winning team dynamics, rapid AI prototyping, and modern competitive trends.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="timeline-flow-card" style={{
                display: 'flex',
                gap: '1.25rem',
                padding: '1.25rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                borderLeft: '4px solid var(--primary-red)',
              }}>
                <div style={{
                  minWidth: '90px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: 'var(--primary-red)',
                }}>
                  1 Hour
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--black)', marginBottom: '0.2rem' }}>
                    Mini Idea Challenge
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Hands-on mentored sprint: formulate a problem statement and draft an initial software architecture.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="timeline-flow-card" style={{
                display: 'flex',
                gap: '1.25rem',
                padding: '1.25rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                borderLeft: '4px solid var(--black)',
              }}>
                <div style={{
                  minWidth: '90px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: 'var(--primary-red)',
                }}>
                  ~30 mins
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--black)', marginBottom: '0.2rem' }}>
                    Judging & Conclusion
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    Jury evaluation, result declarations, goodies distribution, and future roadmap sneak peeks.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* FINAL CALL TO ACTION */}
      {/* ======================================================== */}
      <section style={{
        backgroundColor: '#FFFFFF',
        color: 'var(--black)',
        padding: '5rem 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid var(--border-color)',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
            color: 'var(--black)',
          }}>
            Ready to build something <span className="text-red">extraordinary</span>?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
          }}>
            Secure your spot for the How to Hackathon event today. Space is limited, register your team now!
          </p>
          <Link
            href="/register"
            className="btn btn-primary"
            style={{
              padding: '1rem 2.75rem',
              fontSize: '1.1rem',
            }}
          >
            <span>Register Your Team</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
