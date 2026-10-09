import React, { useRef } from 'react';
import { TranslationDict } from '../data/i18nData';

interface AmountSelectorProps {
  selectedAmount: number;
  isCustom: boolean;
  customInputValue: string;
  onSelectPreset: (amount: number) => void;
  onCustomInputChange: (val: string) => void;
  dict: TranslationDict;
}

export const AmountSelector: React.FC<AmountSelectorProps> = ({
  selectedAmount,
  isCustom,
  customInputValue,
  onSelectPreset,
  onCustomInputChange,
  dict,
}) => {
  const customInputRef = useRef<HTMLInputElement>(null);

  const presets = [
    { value: 99, label: '₹99', desc: 'Coffee & Server Fuel' },
    { value: 299, label: '₹299', desc: 'Mod Tool Maintenance' },
    { value: 799, label: '₹799', desc: 'Full Feature Patron' },
  ];

  const quickPills = [20, 50, 100, 500, 1000];

  const handleCustomFocus = () => {
    onCustomInputChange(customInputValue || '20');
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <div className="section-label">
        {dict.chooseAmount || 'Choose an amount'}
      </div>

      {/* Quick chips */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '14px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            color: 'var(--text-dim)',
            alignSelf: 'center',
            marginRight: '4px',
          }}
        >
          Quick:
        </span>
        {quickPills.map((amt) => {
          const isCurrent = !isCustom && selectedAmount === amt;
          return (
            <button
              key={amt}
              type="button"
              onClick={() => onSelectPreset(amt)}
              style={{
                background: isCurrent ? 'var(--grad)' : 'rgba(255, 255, 255, 0.06)',
                border: isCurrent ? '1px solid rgba(255,255,255,0.4)' : '1px solid var(--glass-border)',
                color: isCurrent ? '#fff' : 'var(--text-dim)',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '12px',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            >
              ₹{amt}
            </button>
          );
        })}
      </div>

      <div className="amounts" id="amounts">
        {presets.map((p) => {
          const isChecked = !isCustom && selectedAmount === p.value;
          return (
            <label
              key={p.value}
              className={`amount-card ${isChecked ? 'active' : ''}`}
              onClick={() => onSelectPreset(p.value)}
            >
              <input
                type="radio"
                name="amt"
                value={p.value}
                checked={isChecked}
                onChange={() => onSelectPreset(p.value)}
              />
              <div className="amount-main">
                <span className="amount-value">{p.label}</span>
                <span className="amount-desc">{p.desc}</span>
              </div>
              <span className="radio-dot"></span>
            </label>
          );
        })}

        {/* Custom amount card */}
        <label
          className={`amount-card custom ${isCustom ? 'active' : ''}`}
          onClick={() => {
            customInputRef.current?.focus();
            if (!isCustom) {
              onCustomInputChange(customInputValue || '20');
            }
          }}
        >
          <input
            type="radio"
            name="amt"
            value="custom"
            id="customRadio"
            checked={isCustom}
            onChange={() => {
              customInputRef.current?.focus();
              onCustomInputChange(customInputValue || '20');
            }}
          />
          <div className="amount-main custom-main">
            <span className="rupee">₹</span>
            <input
              ref={customInputRef}
              type="number"
              id="customAmt"
              className="custom-input"
              placeholder="Enter custom amount"
              min="1"
              value={customInputValue}
              onFocus={handleCustomFocus}
              onChange={(e) => onCustomInputChange(e.target.value)}
            />
          </div>
          <span className="radio-dot"></span>
        </label>
      </div>
    </div>
  );
};
