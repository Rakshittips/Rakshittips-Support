import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TranslationDict } from '../data/i18nData';

interface UpiCardProps {
  upiId: string;
  payeeName: string;
  amount: number;
  note?: string;
  dict: TranslationDict;
  onOpenPaymentModal: () => void;
}

export const UpiCard: React.FC<UpiCardProps> = ({
  upiId,
  payeeName,
  amount,
  note = 'Support Rakshittips solo developer',
  dict,
  onOpenPaymentModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [enlargeQr, setEnlargeQr] = useState(false);

  // Build standard UPI URI
  const encodedPa = encodeURIComponent(upiId);
  const encodedPn = encodeURIComponent(payeeName);
  const encodedNote = encodeURIComponent(note);
  const upiUri = `upi://pay?pa=${encodedPa}&pn=${encodedPn}&cu=INR${amount > 0 ? `&am=${amount}` : ''}${note ? `&tn=${encodedNote}` : ''}`;
  
  // Dynamic QR Code URL
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=10&data=${encodeURIComponent(upiUri)}`;

  const handleCopy = () => {
    const finish = () => {
      setCopied(true);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
      });
      setTimeout(() => setCopied(false), 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(upiId).then(finish).catch(() => {
        fallbackCopy(upiId);
        finish();
      });
    } else {
      fallbackCopy(upiId);
      finish();
    }
  };

  const fallbackCopy = (text: string) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (e) {
      console.error(e);
    }
    document.body.removeChild(ta);
  };

  const handleOpenUpi = (customScheme?: string) => {
    const targetUrl = customScheme || upiUri;
    try {
      if (window.top && window.top !== window) {
        window.top.location.href = targetUrl;
      } else {
        window.location.href = targetUrl;
      }
    } catch {
      window.location.href = targetUrl;
    }
  };

  const downloadQr = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `Rakshittips-UPI-QR-${amount}INR.png`;
    link.target = '_blank';
    link.click();
  };

  return (
    <>
      <div className="upi-card" id="upi">
        <div
          className="upi-qr"
          onClick={() => setEnlargeQr(true)}
          style={{ cursor: 'pointer' }}
          title="Click to enlarge QR code"
        >
          <img
            src={qrUrl}
            alt="UPI QR code"
            loading="lazy"
            onError={(e) => {
              // Fallback to quick Google Charts QR if network issue
              (e.target as HTMLImageElement).src = `https://chart.googleapis.com/chart?chs=256x256&cht=qr&chl=${encodeURIComponent(upiUri)}`;
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              right: '4px',
              background: 'rgba(0,0,0,0.6)',
              borderRadius: '6px',
              padding: '2px 5px',
              fontSize: '10px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <i className="fa-solid fa-expand"></i>
          </div>
        </div>

        <div className="upi-info">
          <div className="label">{dict.upiIdLabel || 'UPI ID'}</div>
          <div className="upi-id" id="upiId">
            {upiId}
          </div>

          <div className="upi-apps">
            <span className="apps-label">{dict.worksWith || 'Supported by'}</span>
            <span
              className="app-badge phonepe"
              onClick={() => handleOpenUpi(`phonepe://pay?pa=${encodedPa}&pn=${encodedPn}&am=${amount}&cu=INR`)}
              title="Launch PhonePe"
            >
              PhonePe
            </span>
            <span
              className="app-badge gpay"
              onClick={() => handleOpenUpi(`tez://upi/pay?pa=${encodedPa}&pn=${encodedPn}&am=${amount}&cu=INR`)}
              title="Launch Google Pay"
            >
              GPay
            </span>
            <span
              className="app-badge bhim"
              onClick={() => handleOpenUpi(`bhim://upi/pay?pa=${encodedPa}&pn=${encodedPn}&am=${amount}&cu=INR`)}
              title="Launch BHIM"
            >
              BHIM
            </span>
            <span
              className="app-badge paytm"
              onClick={() => handleOpenUpi(`paytmmp://pay?pa=${encodedPa}&pn=${encodedPn}&am=${amount}&cu=INR`)}
              title="Launch Paytm"
            >
              Paytm
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
            <button
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              id="copyBtn"
              type="button"
            >
              <i className={copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'}></i>
              <span>{copied ? 'Copied' : (dict.copyId || 'Copy ID')}</span>
            </button>

            <button
              className="copy-btn"
              onClick={() => handleOpenUpi()}
              type="button"
              style={{
                background: 'var(--grad-soft)',
                borderColor: 'var(--glass-border-hi)',
              }}
            >
              <i className="fa-solid fa-bolt" style={{ color: '#ec4899' }}></i>
              <span>{dict.openUpiApp || 'Open in UPI app'}</span>
            </button>

            <button
              className="copy-btn"
              onClick={onOpenPaymentModal}
              type="button"
              title="View all payment methods"
            >
              <i className="fa-solid fa-qrcode"></i>
              <span>Scan / Pay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enlarged QR Modal */}
      {enlargeQr && (
        <div
          className="lang-overlay"
          style={{ zIndex: 110 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setEnlargeQr(false);
          }}
        >
          <div
            className="lang-modal"
            style={{
              maxWidth: '380px',
              textAlign: 'center',
              alignItems: 'center',
              padding: '28px 24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '18px' }}>
                Scan to Donate ₹{amount}
              </h3>
              <button
                className="lang-close"
                onClick={() => setEnlargeQr(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div
              style={{
                background: '#fff',
                padding: '16px',
                borderRadius: '20px',
                width: '260px',
                height: '260px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                margin: '0 auto',
              }}
            >
              <img
                src={qrUrl}
                alt="Enlarged UPI QR code"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <div style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-dim)' }}>
              Payee: <strong style={{ color: 'var(--text)' }}>Rakshittips</strong>
              <div style={{ fontSize: '13px', marginTop: '2px', wordBreak: 'break-all' }}>
                {upiId}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', width: '100%' }}>
              <button
                className="copy-btn"
                onClick={downloadQr}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <i className="fa-solid fa-download"></i> Save QR
              </button>
              <button
                className="copy-btn"
                onClick={() => handleOpenUpi()}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  background: 'var(--grad)',
                  color: '#fff',
                }}
              >
                <i className="fa-solid fa-bolt"></i> Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
