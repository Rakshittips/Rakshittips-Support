import React, { useState, useEffect } from 'react';
import { LANGS, LanguageItem, TranslationDict } from '../data/i18nData';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: string;
  onSelectLang: (code: string) => void;
  dict: TranslationDict;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onSelectLang,
  dict,
}) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredLangs = LANGS.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="lang-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="langModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lang-modal">
        <div className="lang-modal-head">
          <div>
            <h2 id="langModalTitle">{dict.switchLanguage || 'Switch Language'}</h2>
            <p>{dict.switchLanguageDesc || "Change the website's display language"}</p>
          </div>
          <button
            className="lang-close"
            onClick={onClose}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div style={{ marginTop: '14px' }}>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <i
              className="fa-solid fa-magnifying-glass"
              style={{
                position: 'absolute',
                left: '12px',
                color: 'var(--text-dim)',
                fontSize: '13px',
              }}
            ></i>
            <input
              type="text"
              placeholder="Search language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '9px 12px 9px 34px',
                color: 'var(--text)',
                fontSize: '13.5px',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div className="lang-list">
          {filteredLangs.map((l: LanguageItem) => {
            const isActive = l.code === currentLang;
            return (
              <button
                key={l.code}
                className={`lang-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectLang(l.code);
                  onClose();
                }}
              >
                <span className="lang-flag">{l.flag}</span>
                <span style={{ fontWeight: isActive ? 600 : 400 }}>{l.name}</span>
                <i className="fa-solid fa-check check"></i>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
