import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { I18N, LANGS, TranslationDict } from './data/i18nData';
import { LanguageModal } from './components/LanguageModal';
import { UpiCard } from './components/UpiCard';
import { AmountSelector } from './components/AmountSelector';
import { PaymentModal } from './components/PaymentModal';
import { ToolsSuite } from './components/ToolsSuite';
import { AboutMe } from './components/AboutMe';
import { ProjectItem } from './data/projectsData';

export default function App() {
  const UPI_ID = 'rakshitdhakariya6@oksbi';
  const PAYEE_NAME = 'Rakshittips';

  // Language state
  const [currentLang, setCurrentLang] = useState<string>(() => {
    try {
      return localStorage.getItem('rakshittips-lang') || 'en';
    } catch {
      return 'en';
    }
  });
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  // Theme state: dark / light
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('rakshittips-theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  // Amount state
  const [selectedAmount, setSelectedAmount] = useState<number>(20);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customInputValue, setCustomInputValue] = useState<string>('');

  // Project sponsorship selection
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Payment modal state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Success toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Apply language settings (dir and lang attribute)
  useEffect(() => {
    const langMeta = LANGS.find((l) => l.code === currentLang) || LANGS[0];
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', langMeta.rtl ? 'rtl' : 'ltr');
    try {
      localStorage.setItem('rakshittips-lang', currentLang);
    } catch {}
  }, [currentLang]);

  // Apply theme to document element
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem('rakshittips-theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const dict: TranslationDict = I18N[currentLang] || I18N.en;

  const handleSelectPreset = (amt: number) => {
    setIsCustom(false);
    setSelectedAmount(amt);
    setCustomInputValue('');
  };

  const handleCustomInputChange = (val: string) => {
    setIsCustom(true);
    setCustomInputValue(val);
    const num = Number(val);
    if (!isNaN(num) && num > 0) {
      setSelectedAmount(num);
    } else {
      setSelectedAmount(20);
    }
  };

  const handleSetAmountDirect = (amt: number) => {
    setIsCustom(false);
    setSelectedAmount(amt);
    setCustomInputValue('');
  };

  // Open direct UPI scheme intent
  const triggerOpenUpi = (amount?: number) => {
    const amt = amount || selectedAmount || 20;
    const note = selectedProject
      ? `Support for ${selectedProject.name} - Rakshittips`
      : 'Support Rakshittips Solo Development';

    const url = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(PAYEE_NAME)}&cu=INR&am=${amt}&tn=${encodeURIComponent(note)}`;

    try {
      if (window.top && window.top !== window) {
        window.top.location.href = url;
      } else {
        window.location.href = url;
      }
    } catch {
      window.location.href = url;
    }

    // Also open the helper modal so user is guided seamlessly
    setIsPaymentModalOpen(true);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handlePaymentCompleted = () => {
    showToast('❤️ Thank you so much for supporting Rakshittips solo projects!');
  };

  return (
    <div className="wrap">
      {/* Toast Notice */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'rgba(17, 23, 40, 0.95)',
            border: '1px solid #ec4899',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
            zIndex: 99999,
            backdropFilter: 'blur(10px)',
          }}
        >
          <i className="fa-solid fa-heart" style={{ color: '#ec4899' }}></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Row */}
      <div className="header-row">
        <a href="/" className="brand">
          <span className="dot"></span>
          <span>Rakshittips!</span>
          <span className="by-developer-tag">
            <i className="fa-solid fa-code"></i> by developer
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href="#about"
            className="lang-btn"
            style={{
              width: 'auto',
              padding: '0 14px',
              borderRadius: '999px',
              fontSize: '12.5px',
              fontWeight: 700,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            title="About Developer Rakshit Dhakariya"
          >
            <i className="fa-solid fa-circle-user" style={{ color: '#ec4899', fontSize: '14px' }}></i>
            <span>About</span>
          </a>

          <button
            className="lang-btn"
            id="themeToggleBtn"
            aria-label="Toggle theme"
            title="Switch Theme (Dark / High-Contrast Light)"
            onClick={toggleTheme}
            type="button"
          >
            <i
              className={theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}
              id="themeIcon"
              style={{ color: theme === 'light' ? '#d97706' : '#b794f6' }}
            ></i>
          </button>

          <button
            className="lang-btn"
            id="langBtn"
            aria-haspopup="dialog"
            aria-label="Switch language"
            title="Switch language"
            onClick={() => setIsLangModalOpen(true)}
            type="button"
          >
            <i className="fa-solid fa-language"></i>
          </button>
        </div>
      </div>

      {/* Hero Section - Rakshittips Support & Donate */}
      <div className="hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '12px',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'rgba(236, 72, 153, 0.15)',
              border: '1px solid rgba(236, 72, 153, 0.4)',
              color: '#ec4899',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <i className="fa-solid fa-heart" style={{ fontSize: '11px' }}></i>
            Rakshittips Support &bull; Donate
          </span>
          <span
            style={{
              fontSize: '11.5px',
              padding: '4px 10px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-dim)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <i className="fa-solid fa-bolt" style={{ color: '#22c55e', fontSize: '10px' }}></i>
            0% Platform Fees
          </span>
        </div>
        <h1 data-i18n="heroTitle">{dict.heroTitle || 'Rakshittips Support & Donate'}</h1>
        <p data-i18n="heroP">
          {dict.heroP ||
            'Directly support solo developer Rakshit Dhakariya to fuel new Android mods, updates, and open-source utilities.'}
        </p>
      </div>

      {/* Rakshittips by Developer Profile Card */}
      <div className="developer-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'var(--grad)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '19px',
              flexShrink: 0,
              boxShadow: '0 4px 16px rgba(236, 72, 153, 0.4)',
            }}
          >
            <i className="fa-solid fa-user-astronaut"></i>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px' }}>
                Rakshittips by Developer
              </span>
              <span
                style={{
                  fontSize: '11px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#22c55e',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '999px',
                  padding: '1px 8px',
                  fontWeight: 700,
                }}
              >
                ✓ Rakshit Dhakariya
              </span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '2px' }}>
              Solo Developer &bull; Android Mods, iOS Experience Ports &amp; Open Utilities
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <a
            href="#about"
            className="copy-btn"
            style={{
              padding: '7px 14px',
              fontSize: '12.5px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <i className="fa-solid fa-user" style={{ color: '#ec4899' }}></i>
            <span>About Me</span>
          </a>
          <a
            href="https://t.me/RakshittipsDeveloper"
            target="_blank"
            rel="noopener noreferrer"
            className="copy-btn"
            style={{
              padding: '7px 14px',
              fontSize: '12.5px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <i className="fa-brands fa-telegram" style={{ color: '#2AABEE' }}></i>
            <span>Developer DM</span>
          </a>
          <a
            href="https://www.instagram.com/mr._rakshit_2.0"
            target="_blank"
            rel="noopener noreferrer"
            className="copy-btn"
            style={{
              padding: '7px 14px',
              fontSize: '12.5px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <i className="fa-brands fa-instagram" style={{ color: '#E1306C' }}></i>
            <span>Instagram</span>
          </a>
          <a
            href="https://youtube.com/@mr._rakshit_2.0"
            target="_blank"
            rel="noopener noreferrer"
            className="copy-btn"
            style={{
              padding: '7px 14px',
              fontSize: '12.5px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <i className="fa-brands fa-youtube" style={{ color: '#FF0000' }}></i>
            <span>YouTube</span>
          </a>
          <a
            href="https://github.com/Rakshittips"
            target="_blank"
            rel="noopener noreferrer"
            className="copy-btn"
            style={{
              padding: '7px 14px',
              fontSize: '12.5px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <i className="fa-brands fa-github"></i>
            <span>GitHub</span>
          </a>
        </div>
      </div>


      {/* Ways to Support */}
      <div className="section-label" data-i18n="waysToSupport">
        {dict.waysToSupport || 'Ways to support'}
      </div>

      <div className="methods">
        <a className="method" href="#upi">
          <div className="icon">
            <i className="fa-solid fa-indian-rupee-sign"></i>
          </div>
          <div className="body">
            <div className="name">UPI</div>
            <div className="desc" data-i18n="upiDesc">
              {dict.upiDesc || 'Instant, no fees — scan below or use the ID'}
            </div>
          </div>
          <span className="go">
            <i className="fa-solid fa-arrow-down"></i>
          </span>
        </a>

        <a
          className="method"
          href="https://t.me/RakshittipsDeveloper"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="icon">
            <i className="fa-brands fa-telegram"></i>
          </div>
          <div className="body">
            <div className="name" data-i18n="telegramName">
              {dict.telegramName || 'Telegram DM'}
            </div>
            <div className="desc" data-i18n="telegramDesc">
              {dict.telegramDesc || 'Message the developer directly'}
            </div>
          </div>
          <span className="go">
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </span>
        </a>
      </div>

      {/* Interactive UPI Card */}
      <UpiCard
        upiId={UPI_ID}
        payeeName={PAYEE_NAME}
        amount={selectedAmount}
        note={selectedProject ? `Backing ${selectedProject.name}` : undefined}
        dict={dict}
        onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
      />

      {/* Choose an Amount */}
      <AmountSelector
        selectedAmount={selectedAmount}
        isCustom={isCustom}
        customInputValue={customInputValue}
        onSelectPreset={handleSelectPreset}
        onCustomInputChange={handleCustomInputChange}
        dict={dict}
      />

      {/* Big Action Donate Button */}
      <button
        className="donate-btn"
        id="donateBtn"
        type="button"
        onClick={() => triggerOpenUpi(selectedAmount)}
      >
        <i className="fa-solid fa-bolt"></i>{' '}
        <span id="donateLabel" data-i18n="donate">
          {dict.donate || 'Donate'}
        </span>{' '}
        <span id="donateAmt">₹{selectedAmount}</span>
      </button>

      {/* Project Backing Indicator if selected */}
      {selectedProject && (
        <div
          style={{
            marginTop: '14px',
            textAlign: 'center',
            fontSize: '13px',
            color: '#ec4899',
            fontWeight: 600,
          }}
        >
          ❤️ Thank you for fueling: {selectedProject.name}
        </div>
      )}

      {/* Note Banner */}
      <div className="note">
        <i className="fa-solid fa-circle-info" style={{ marginRight: '6px' }}></i>
        <span data-i18n="noteText">
          {dict.noteText ||
            'The QR code and UPI deep links are generated live from the official UPI ID. Works seamlessly with Google Pay, PhonePe, Paytm, BHIM and all Indian bank UPI apps.'}
        </span>
      </div>

      {/* Rakshittips About Me Section */}
      <AboutMe />

      {/* Comprehensive Supporter Suite & Tools */}
      <ToolsSuite
        currentAmount={selectedAmount}
        onSetAmount={handleSetAmountDirect}
        upiId={UPI_ID}
        payeeName={PAYEE_NAME}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
      />

      {/* Footer */}
      <div className="footer">
        <div>
          <span>&copy; {new Date().getFullYear()} Rakshittips</span>
          <span style={{ margin: '0 8px', opacity: 0.5 }}>&bull;</span>
          <span style={{ color: 'var(--text-dim)' }}>
            Crafted solo by developer <strong>Rakshit Dhakariya</strong>
          </span>
        </div>
        <div className="socials">
          <a
            href="https://t.me/Rakshittips"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            title="Join Telegram Channel"
          >
            <i className="fa-brands fa-telegram"></i>
          </a>
          <a
            href="https://www.instagram.com/mr._rakshit_2.0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Follow on Instagram"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a
            href="https://youtube.com/@mr._rakshit_2.0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="Watch on YouTube"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>
          <a
            href="https://github.com/Rakshittips"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="Explore GitHub Repositories"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>

      {/* Language Switcher Modal */}
      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLang={currentLang}
        onSelectLang={(code) => setCurrentLang(code)}
        dict={dict}
      />

      {/* Payment Dispatcher Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={selectedAmount}
        upiId={UPI_ID}
        payeeName={PAYEE_NAME}
        selectedProjectName={selectedProject?.name}
        onPaymentCompleted={handlePaymentCompleted}
      />
    </div>
  );
}
