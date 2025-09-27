import React from 'react';
import { useNavigate } from 'react-router-dom';

type LearnTagColor = 1 | 2 | 3 | 4 | 5 | 6;
type LearnTag = { label: string; to: string; color: LearnTagColor };

/* Control tag order, links, and colors here (code-driven, not UI) */
const tags: LearnTag[] = [
  { label: 'Assessments', to: '/panel/learn/assessments', color: 1 },
  { label: 'Ground Work', to: '/panel/learn/ground-work', color: 1 },
  { label: 'Self-Care', to: '/panel/learn/self-care', color: 4 },
  { label: 'REST Programme', to: '/panel/learn/rest', color: 6 },
  { label: 'Diet and Nutrition', to: '/panel/learn/diet', color: 2 },
  { label: 'EAT Programme', to: '/panel/learn/eat', color: 2 },
  { label: 'MEAL Programme', to: '/panel/learn/meal', color: 3 },
  { label: 'Exercise and Movement', to: '/panel/learn/exercise-move', color: 3 },
  { label: 'Exercise Library', to: '/panel/learn/exercise-library', color: 3 },
  { label: 'Maintaining Success', to: '/panel/learn/success', color: 1 },
  { label: 'Managing Finance', to: '/panel/learn/finance', color: 6 },
  { label: 'Chronic Care', to: '/panel/learn/chronic', color: 1 },
];

const LearnPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="learn">
      <h1 className="learn__title">Learn</h1>

      <section className="learn__section">
        <h2 className="learn__heading">For You</h2>
        <div className="learn__banner">
          <div className="learn__banner-text">
            <div className="learn__banner-title">Explore MagiQ Community Resources</div>
            <div className="learn__banner-sub">Check out on-demand videos, articles, webinars, and workouts</div>
          </div>
        </div>
      </section>

      <section className="learn__section">
        <h2 className="learn__heading">Explore</h2>
        <div className="learn__grid">
          {tags.map((t) => (
            <button
              key={t.label}
              className={`learn__card learn__card--c${t.color}`}
              onClick={() => navigate(t.to)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearnPage;


