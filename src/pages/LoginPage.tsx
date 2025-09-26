import React from 'react';
import '../App.scss';
import Modal from '../components/Modal';
import GoogleIcon from '../assets/Google-icon.png';
import USIcon from '../assets/us.png';
import PHIcon from '../assets/philippines.png';
import { useNavigate } from 'react-router-dom';

const SLIDE_INTERVAL_MS = 6000;
const SLIDE_COUNT = 4;
const SLIDE_TEXTS = [
  'slider 1',
  'slider 2',
  'slider 3',
  'slider 4'
];

type LangKey = 'en' | 'fil' | 'bis';

const LANG_OPTIONS: { key: LangKey; label: string; icon: string }[] = [
  { key: 'en', label: 'English', icon: USIcon },
  { key: 'fil', label: 'Filipino', icon: PHIcon },
  { key: 'bis', label: 'Bisaya', icon: PHIcon }
];

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [dragDelta, setDragDelta] = React.useState<number>(0);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [langOpen, setLangOpen] = React.useState<boolean>(false);
  const [selectedLang, setSelectedLang] = React.useState<LangKey>('en');
  const slidesRef = React.useRef<HTMLDivElement | null>(null);
  const leftRef = React.useRef<HTMLDivElement | null>(null);
  const langRef = React.useRef<HTMLDivElement | null>(null);
  const startXRef = React.useRef<number>(0);
  const timerRef = React.useRef<number | null>(null);

  const clearAuto = React.useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startAuto = React.useCallback(() => {
    clearAuto();
    timerRef.current = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % SLIDE_COUNT);
    }, SLIDE_INTERVAL_MS);
  }, [clearAuto]);

  React.useEffect(() => {
    startAuto();
    return clearAuto;
  }, [startAuto, clearAuto]);

  // close language menu when clicking outside
  React.useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    clearAuto();
    startXRef.current = e.clientX;
    leftRef.current?.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    setDragDelta(delta);
  };

  const endDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    const containerWidth = leftRef.current?.clientWidth || 1;
    const threshold = Math.max(40, containerWidth * 0.08);
    if (Math.abs(dragDelta) > threshold) {
      if (dragDelta < 0) {
        setActiveIndex(prev => (prev + 1) % SLIDE_COUNT);
      } else {
        setActiveIndex(prev => (prev - 1 + SLIDE_COUNT) % SLIDE_COUNT);
      }
    }
    setDragDelta(0);
    startAuto();
    if (e) leftRef.current?.releasePointerCapture?.(e.pointerId);
  };

  const deltaPercent = React.useMemo(() => {
    const width = leftRef.current?.clientWidth || 1;
    return isDragging ? (dragDelta / width) * 100 : 0;
  }, [dragDelta, isDragging]);

  const selected = React.useMemo(() => LANG_OPTIONS.find(l => l.key === selectedLang)!, [selectedLang]);

  return (
    <div className="login-page">
      <div
        ref={leftRef}
        className={`login-page__left${isDragging ? ' dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          ref={slidesRef}
          className={`login-page__slides${isDragging ? ' dragging' : ''}`}
          style={{ transform: `translateX(calc(-${activeIndex * 100}% + ${deltaPercent}%))` }}
        >
          <div className="login-page__slide bg-1" />
          <div className="login-page__slide bg-2" />
          <div className="login-page__slide bg-3" />
          <div className="login-page__slide bg-4" />
        </div>

        <div className="login-page__overlay">
          <div className="login-page__slide-text">{SLIDE_TEXTS[activeIndex]}</div>
        </div>
      </div>
      <div className="login-page__right">
        <div className="lang-dropdown" ref={langRef}>
          <button className="lang-dropdown__button" onClick={() => setLangOpen(o => !o)} aria-haspopup="listbox" aria-expanded={langOpen}>
            <img src={selected.icon} alt="" />
            <span>{selected.label}</span>
          </button>
          {langOpen && (
            <ul className="lang-dropdown__menu" role="listbox">
              {LANG_OPTIONS.map(opt => (
                <li key={opt.key}>
                  <button className="lang-dropdown__item" role="option" aria-selected={selectedLang === opt.key} onClick={() => { setSelectedLang(opt.key); setLangOpen(false); }}>
                    <img src={opt.icon} alt="" />
                    <span>{opt.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="login-page__content">
          <h1>Hello there!</h1>
          <p>How can we help you today?</p>
          <button className="btn btn-primary" onClick={() => navigate('/panel')}>Log in</button>
          <button className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>Sign up</button>
          <div className="login-page__separator">
            <span>or login using gmail</span>
          </div>
          <button className="login-page__google" onClick={() => setIsModalOpen(true)} aria-label="Login with Google">
            <img src={GoogleIcon} alt="Google" />
            <span>Google</span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        title="Heads up!"
        onClose={() => setIsModalOpen(false)}
        actionLabel="Got it"
      >
        <div className="modal__badge">
          <span role="img" aria-label="party">🎉</span>
          <strong>This part is still in development</strong>
          <span role="img" aria-label="sparkles">✨</span>
        </div>
        <div className="modal__confetti" aria-hidden="true"></div>
        We'll notify you once it's ready. Meanwhile, feel free to explore!
      </Modal>
    </div>
  );
};

export default LoginPage;
