import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  upiId: string;
  payeeName: string;
  selectedProjectName?: string;
  onPaymentCompleted: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  upiId,
  payeeName,
  selectedProjectName,
  onPaymentCompleted,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const note = selectedProjectName
    ? `Support for ${selectedProjectName} - Rakshittips`
    : 'Support Rakshittips Solo Dev';

  const encodedPa = encodeURIComponent(upiId);
  const encodedPn = encodeURIComponent(payeeName);
  const encodedTn = encodeURIComponent(note);
  const upiUri = `upi://pay?pa=${encodedPa}&pn=${encodedPn}&am=${amount}&cu=INR&tn=${encodedTn}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(upiUri)}`;

  const apps = [
    {
      name: 'Google Pay',
      icon: 'fa-brands fa-google-pay',
      color: '#4285F4',
      scheme: `tez://upi/pay?pa=${encodedPa}&pn=${encodedPn}&am=${amount}&cu=INR&tn=${encodedTn}`,
    },
    {
      name: 'PhonePe',
      icon: 'fa-solid fa-mobile-screen',
      color: '#5f259f',
      scheme: `phonepe://pay?pa=${encodedPa}&pn=${encodedPn}&am=${amount}&cu=INR&tn=${encodedTn}`,
    },
    {
      name: 'Paytm',
      icon: 'fa-solid fa-wallet',
      color: '#00baf2',
      scheme: `paytmmp://pay?pa=${encodedPa}&pn=${encodedPn}&am=${amount}&cu=INR&tn=${encodedTn}`,
    },
    {
      name: 'BHIM UPI',
      icon: 'fa-solid fa-building-columns',
      color: '#0b4ea2',
      scheme: `bhim://upi/pay?pa=${encodedPa}&pn=${encodedPn}&am=${amount}&cu=INR&tn=${encodedTn}`,
    },
    {
      name: 'Any UPI App',
      icon: 'fa-solid fa-bolt',
      color: '#ec4899',
      scheme: upiUri,
    },
  ];

  const handleLaunchApp = (scheme: string) => {
    try {
      if (window.top && window.top !== window) {
        window.top.location.href = scheme;
      } else {
        window.location.href = scheme;
      }
    } catch {
      window.location.href = scheme;
    }
  };

  const copyUpiLink = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(upiUri);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDone = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    onPaymentCompleted();
    onClose();
  };

  return (
    <div
      className="lang-overlay"
      style={{ zIndex: 120 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="lang-modal"
        style={{
          maxWidth: '520px',
          padding: '28px 24px',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div className="lang-modal-head">
          <div>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-shield-heart" style={{ color: '#ec4899' }}></i>
              Complete Support Payment
            </h2>
            <p>Direct UPI Transfer • 0% Platform Fees • 100% to Developer</p>
          </div>
          <button className="lang-close" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Amount Summary Card */}
        <div
          style={{
            margin: '20px 0 16px',
            padding: '16px 20px',
            background: 'var(--grad-soft)',
            border: '1px solid var(--glass-border-hi)',
            borderRadius: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-dim)' }}>Contribution Amount</div>
            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: '28px',
                color: '#fff',
              }}
            >
              ₹{amount}
            </div>
            {selectedProjectName && (
              <div style={{ fontSize: '12px', color: '#ec4899', marginTop: '2px' }}>
                Backing: <strong>{selectedProjectName}</strong>
              </div>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>UPI VPA</div>
            <div
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                fontWeight: 600,
                color: '#6ea8fe',
              }}
            >
              {upiId}
            </div>
          </div>
        </div>

        {/* Mobile: 1-click app launcher buttons */}
        <div style={{ marginBottom: '18px' }}>
          <div
            style={{
              fontSize: '12.5px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontWeight: 700,
              color: 'var(--text-dim)',
              marginBottom: '10px',
            }}
          >
            Launch UPI App Directly:
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '8px',
            }}
          >
            {apps.map((app) => (
              <button
                key={app.name}
                type="button"
                onClick={() => handleLaunchApp(app.scheme)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                }}
              >
                <i className={app.icon} style={{ color: app.color, fontSize: '16px' }}></i>
                <span>{app.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop / QR Scan option */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--glass-border)',
            borderRadius: '18px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              background: '#fff',
              borderRadius: '12px',
              padding: '6px',
              flexShrink: 0,
            }}
          >
            <img
              src={qrUrl}
              alt="QR Code"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <div style={{ fontWeight: 700, fontSize: '14px' }}>Scan with Any Payment App</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-dim)', marginTop: '4px' }}>
              Open PhonePe, GPay, Paytm, or BHIM camera on your mobile phone to scan instantly.
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={copyUpiLink}
                className="copy-btn"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                <i className={copiedLink ? 'fa-solid fa-check' : 'fa-regular fa-copy'}></i>
                {copiedLink ? 'URI Copied!' : 'Copy UPI Link'}
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            type="button"
            onClick={handleDone}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: '999px',
              background: 'var(--grad)',
              border: 'none',
              color: '#fff',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px -6px rgba(236,72,153,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <i className="fa-solid fa-circle-check"></i>
            I Have Completed Payment
          </button>
          <button
            type="button"
            onClick={onClose}
            className="copy-btn"
            style={{ padding: '14px 20px', borderRadius: '999px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
