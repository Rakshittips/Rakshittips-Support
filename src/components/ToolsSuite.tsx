import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RAKSHITTIPS_PROJECTS, ProjectItem } from '../data/projectsData';
import { INITIAL_SUPPORTERS, SupporterEntry } from '../data/supporterWallData';

interface ToolsSuiteProps {
  currentAmount: number;
  onSetAmount: (amt: number) => void;
  upiId: string;
  payeeName: string;
  selectedProject: ProjectItem | null;
  onSelectProject: (p: ProjectItem | null) => void;
}

export const ToolsSuite: React.FC<ToolsSuiteProps> = ({
  currentAmount,
  onSetAmount,
  upiId,
  payeeName,
  selectedProject,
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<'certificate' | 'qr_studio' | 'currency' | 'wall' | 'projects'>('projects');

  // Certificate generator state
  const [certName, setCertName] = useState('Valued Supporter');
  const [certRef, setCertRef] = useState('UPI-' + Math.floor(100000 + Math.random() * 900000));
  const [certGenerated, setCertGenerated] = useState(false);

  // QR Studio state
  const [customStudioAmt, setCustomStudioAmt] = useState(currentAmount.toString());
  const [customStudioNote, setCustomStudioNote] = useState('Supporting Rakshittips Solo Development');

  // Currency Converter state
  const [currencyAmount, setCurrencyAmount] = useState('5');
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'AED' | 'SAR' | 'THB'>('USD');

  // Wall of love state
  const [supporters, setSupporters] = useState<SupporterEntry[]>(() => {
    try {
      const saved = localStorage.getItem('rakshittips-supporters');
      return saved ? JSON.parse(saved) : INITIAL_SUPPORTERS;
    } catch {
      return INITIAL_SUPPORTERS;
    }
  });
  const [newDonorName, setNewDonorName] = useState('');
  const [newDonorMsg, setNewDonorMsg] = useState('');
  const [newDonorAmount, setNewDonorAmount] = useState('99');
  const [newDonorProject, setNewDonorProject] = useState('instaGram Pro');

  // Currency rates to INR (approximate realistic rates)
  const rates: Record<string, number> = {
    USD: 87.5,
    EUR: 95.2,
    GBP: 111.4,
    AED: 23.8,
    SAR: 23.3,
    THB: 2.65,
  };

  const convertedInr = Math.round(Number(currencyAmount || 0) * (rates[selectedCurrency] || 87.5));

  const handleApplyConverted = () => {
    onSetAmount(convertedInr > 0 ? convertedInr : 99);
    confetti({ particleCount: 30, spread: 50 });
  };

  const handleGenerateCertificate = () => {
    setCertGenerated(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleAddSupporterMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonorName.trim() || !newDonorMsg.trim()) return;

    const amt = Number(newDonorAmount) || 99;
    const badgeTier: 'Diamond' | 'Gold' | 'Silver' | 'Bronze' =
      amt >= 799 ? 'Diamond' : amt >= 299 ? 'Gold' : amt >= 99 ? 'Silver' : 'Bronze';

    const newEntry: SupporterEntry = {
      id: 'sup-' + Date.now(),
      name: newDonorName.trim(),
      amount: amt,
      project: newDonorProject,
      message: newDonorMsg.trim(),
      date: 'Just now',
      badge: badgeTier,
      verified: true,
    };

    const updated = [newEntry, ...supporters];
    setSupporters(updated);
    try {
      localStorage.setItem('rakshittips-supporters', JSON.stringify(updated));
    } catch {}

    setNewDonorName('');
    setNewDonorMsg('');
    confetti({
      particleCount: 50,
      spread: 60,
    });
  };

  // Studio QR URI
  const studioUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${customStudioAmt || 20}&cu=INR&tn=${encodeURIComponent(customStudioNote)}`;
  const studioQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=8&data=${encodeURIComponent(studioUri)}`;

  return (
    <div style={{ marginTop: '48px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <div className="section-label" style={{ marginBottom: 0 }}>
          Supporter Suite & Mod Tools
        </div>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--text-dim)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
          100% Real-time Utilities
        </div>
      </div>

      {/* Tools Nav Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '20px',
        }}
      >
        <button
          type="button"
          className={`tool-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <i className="fa-solid fa-shapes"></i>
          Choose Mod Project
        </button>

        <button
          type="button"
          className={`tool-tab-btn ${activeTab === 'certificate' ? 'active' : ''}`}
          onClick={() => setActiveTab('certificate')}
        >
          <i className="fa-solid fa-award"></i>
          Backer Certificate & Receipt
        </button>

        <button
          type="button"
          className={`tool-tab-btn ${activeTab === 'qr_studio' ? 'active' : ''}`}
          onClick={() => setActiveTab('qr_studio')}
        >
          <i className="fa-solid fa-qrcode"></i>
          UPI QR Studio
        </button>

        <button
          type="button"
          className={`tool-tab-btn ${activeTab === 'currency' ? 'active' : ''}`}
          onClick={() => setActiveTab('currency')}
        >
          <i className="fa-solid fa-globe"></i>
          Global Currency ($/€/£)
        </button>

        <button
          type="button"
          className={`tool-tab-btn ${activeTab === 'wall' ? 'active' : ''}`}
          onClick={() => setActiveTab('wall')}
        >
          <i className="fa-solid fa-heart"></i>
          Supporter Wall ({supporters.length})
        </button>
      </div>

      {/* TAB 1: MOD PROJECTS SELECTOR */}
      {activeTab === 'projects' && (
        <div
          style={{
            background: 'var(--glass)',
            backdropFilter: 'var(--blur)',
            WebkitBackdropFilter: 'var(--blur)',
            border: '1px solid var(--glass-border)',
            borderRadius: '22px',
            padding: '24px',
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700 }}>
              Direct Your Contribution
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-dim)', marginTop: '2px' }}>
              Select which Rakshittips project you are actively using or want prioritized:
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
            }}
          >
            {RAKSHITTIPS_PROJECTS.map((proj) => {
              const isSelected = selectedProject?.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(isSelected ? null : proj)}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    background: isSelected ? 'var(--grad-soft)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1.5px solid var(--glass-border-hi)' : '1px solid var(--glass-border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className={proj.icon} style={{ fontSize: '16px', color: '#ec4899' }}></i>
                      <span style={{ fontWeight: 700, fontSize: '14.5px' }}>{proj.name}</span>
                    </div>
                    <span
                      style={{
                        fontSize: '10.5px',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.08)',
                        color: 'var(--text-dim)',
                        fontWeight: 600,
                      }}
                    >
                      {proj.category}
                    </span>
                  </div>

                  <p style={{ fontSize: '12.5px', color: 'var(--text-dim)', lineHeight: 1.45 }}>
                    {proj.tagline}
                  </p>

                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', color: isSelected ? '#ec4899' : 'var(--text-dim)', fontWeight: 600 }}>
                      {isSelected ? '✓ Selected to Back' : 'Click to sponsor'}
                    </span>
                    <i
                      className={`fa-solid ${isSelected ? 'fa-circle-check' : 'fa-circle-plus'}`}
                      style={{ color: isSelected ? '#ec4899' : 'var(--text-dim)', fontSize: '14px' }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {selectedProject && (
            <div
              style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '14px',
                background: 'rgba(236,72,153,0.1)',
                border: '1px solid rgba(236,72,153,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '13px' }}>
                🎉 You are sponsoring: <strong>{selectedProject.name}</strong>. This note will be automatically attached to your UPI transaction.
              </div>
              <button
                type="button"
                onClick={() => onSelectProject(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  textDecoration: 'underline',
                }}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CERTIFICATE GENERATOR */}
      {activeTab === 'certificate' && (
        <div
          style={{
            background: 'var(--glass)',
            backdropFilter: 'var(--blur)',
            WebkitBackdropFilter: 'var(--blur)',
            border: '1px solid var(--glass-border)',
            borderRadius: '22px',
            padding: '24px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700 }}>
              Verified Supporter Certificate & Digital Receipt
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-dim)', marginTop: '2px' }}>
              Create an official recognized digital certificate acknowledging your contribution to Rakshittips.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
              marginBottom: '20px',
            }}
          >
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dim)' }}>
                Your Name / Supporter Handle:
              </label>
              <input
                type="text"
                value={certName}
                onChange={(e) => setCertName(e.target.value)}
                placeholder="e.g. Aman Sharma"
                style={{
                  width: '100%',
                  marginTop: '6px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: 'var(--text)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dim)' }}>
                Transaction / UTR Reference (Optional):
              </label>
              <input
                type="text"
                value={certRef}
                onChange={(e) => setCertRef(e.target.value)}
                placeholder="e.g. UPI-58921473"
                style={{
                  width: '100%',
                  marginTop: '6px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: 'var(--text)',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <button
              type="button"
              onClick={handleGenerateCertificate}
              className="copy-btn"
              style={{
                background: 'var(--grad)',
                color: '#fff',
                borderColor: 'transparent',
                padding: '10px 20px',
              }}
            >
              <i className="fa-solid fa-certificate"></i>
              Generate Certificate
            </button>
            {certGenerated && (
              <button
                type="button"
                onClick={handlePrintCertificate}
                className="copy-btn"
                style={{ padding: '10px 18px' }}
              >
                <i className="fa-solid fa-print"></i>
                Print / Save PDF
              </button>
            )}
          </div>

          {/* Rendered Certificate Card */}
          <div
            id="backer-certificate-print"
            style={{
              background: 'linear-gradient(135deg, rgba(25, 18, 42, 0.95), rgba(12, 10, 25, 0.98))',
              border: '2px solid rgba(236, 72, 153, 0.45)',
              borderRadius: '20px',
              padding: '32px 28px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
            }}
          >
            {/* Holographic accent glow */}
            <div
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: 'var(--grad)',
                filter: 'blur(50px)',
                opacity: 0.25,
                pointerEvents: 'none',
              }}
            ></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="dot" style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--grad)', display: 'inline-block' }}></span>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', letterSpacing: '0.02em' }}>
                  RAKSHITTIPS
                </span>
              </div>
              <div
                style={{
                  background: 'rgba(236,72,153,0.15)',
                  border: '1px solid rgba(236,72,153,0.3)',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#ec4899',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Official Patron Seal
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '24px 0 16px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-dim)' }}>
                Certificate of Independent Support
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '26px', color: '#fff', marginTop: '6px' }}>
                {certName || 'Anonymous Supporter'}
              </div>
              <div style={{ fontSize: '14px', color: '#c9b8e8', marginTop: '6px', maxWidth: '440px', margin: '6px auto 0', lineHeight: 1.5 }}>
                has contributed <strong>₹{currentAmount}</strong> to support 100% ad-free, solo open-source software and Android modding tools.
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
                background: 'rgba(255,255,255,0.03)',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.06)',
                marginTop: '12px',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Tier</div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#ec4899' }}>
                  {currentAmount >= 799 ? 'Diamond Patron' : currentAmount >= 299 ? 'Gold Supporter' : 'Core Backer'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Date Issued</div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>
                  {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Verified ID</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#6ea8fe' }}>
                  {certRef}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Developer</div>
                <div style={{ fontWeight: 600, fontSize: '13px' }}>Rakshit Dhakariya</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOM QR STUDIO */}
      {activeTab === 'qr_studio' && (
        <div
          style={{
            background: 'var(--glass)',
            backdropFilter: 'var(--blur)',
            WebkitBackdropFilter: 'var(--blur)',
            border: '1px solid var(--glass-border)',
            borderRadius: '22px',
            padding: '24px',
          }}
        >
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700 }}>
              Live UPI Intent & QR Studio
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-dim)', marginTop: '2px' }}>
              Customize amount and transaction note to generate a personalized payment QR code.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dim)' }}>
                  Amount in INR (₹):
                </label>
                <input
                  type="number"
                  value={customStudioAmt}
                  onChange={(e) => {
                    setCustomStudioAmt(e.target.value);
                    if (Number(e.target.value) > 0) {
                      onSetAmount(Number(e.target.value));
                    }
                  }}
                  min="1"
                  style={{
                    width: '100%',
                    marginTop: '6px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    color: 'var(--text)',
                    fontSize: '15px',
                    fontWeight: 700,
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dim)' }}>
                  Transaction Memo / Note:
                </label>
                <input
                  type="text"
                  value={customStudioNote}
                  onChange={(e) => setCustomStudioNote(e.target.value)}
                  placeholder="e.g. Thanks for instaGram Pro mod"
                  style={{
                    width: '100%',
                    marginTop: '6px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    color: 'var(--text)',
                    fontSize: '13.5px',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(studioUri);
                      confetti({ particleCount: 20 });
                    }
                  }}
                >
                  <i className="fa-regular fa-copy"></i> Copy Raw URI
                </button>
                <a
                  href={studioQrUrl}
                  download="Rakshittips-Custom-QR.png"
                  target="_blank"
                  rel="noreferrer"
                  className="copy-btn"
                  style={{ textDecoration: 'none' }}
                >
                  <i className="fa-solid fa-download"></i> Download PNG
                </a>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-block',
                  background: '#fff',
                  padding: '14px',
                  borderRadius: '18px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                }}
              >
                <img
                  src={studioQrUrl}
                  alt="Custom Studio QR"
                  style={{ width: '180px', height: '180px', objectFit: 'contain' }}
                />
              </div>
              <div style={{ marginTop: '8px', fontSize: '12.5px', color: 'var(--text-dim)' }}>
                Targeting: <strong>₹{customStudioAmt || '20'}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CURRENCY CONVERTER */}
      {activeTab === 'currency' && (
        <div
          style={{
            background: 'var(--glass)',
            backdropFilter: 'var(--blur)',
            WebkitBackdropFilter: 'var(--blur)',
            border: '1px solid var(--glass-border)',
            borderRadius: '22px',
            padding: '24px',
          }}
        >
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700 }}>
              International Supporter Currency Converter
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-dim)', marginTop: '2px' }}>
              Calculate how much your international currency equals in Indian Rupees (INR) for instant UPI equivalence.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              alignItems: 'center',
            }}
          >
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dim)' }}>
                Amount:
              </label>
              <input
                type="number"
                value={currencyAmount}
                onChange={(e) => setCurrencyAmount(e.target.value)}
                min="1"
                style={{
                  width: '100%',
                  marginTop: '6px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: 'var(--text)',
                  fontSize: '16px',
                  fontWeight: 700,
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dim)' }}>
                Currency:
              </label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value as any)}
                style={{
                  width: '100%',
                  marginTop: '6px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  color: 'var(--text)',
                  fontSize: '15px',
                  outline: 'none',
                }}
              >
                <option value="USD" style={{ color: '#000' }}>USD ($) United States</option>
                <option value="EUR" style={{ color: '#000' }}>EUR (€) European Union</option>
                <option value="GBP" style={{ color: '#000' }}>GBP (£) United Kingdom</option>
                <option value="AED" style={{ color: '#000' }}>AED (د.إ) UAE Dirham</option>
                <option value="SAR" style={{ color: '#000' }}>SAR (﷼) Saudi Riyal</option>
                <option value="THB" style={{ color: '#000' }}>THB (฿) Thai Baht</option>
              </select>
            </div>

            <div
              style={{
                background: 'var(--grad-soft)',
                border: '1px solid var(--glass-border-hi)',
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Equivalent in INR</div>
              <div
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: '26px',
                  color: '#fff',
                }}
              >
                ₹{convertedInr}
              </div>
              <button
                type="button"
                onClick={handleApplyConverted}
                className="copy-btn"
                style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  padding: '6px 14px',
                  background: 'var(--grad)',
                  color: '#fff',
                  border: 'none',
                }}
              >
                Apply to Donation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SUPPORTER WALL */}
      {activeTab === 'wall' && (
        <div
          style={{
            background: 'var(--glass)',
            backdropFilter: 'var(--blur)',
            WebkitBackdropFilter: 'var(--blur)',
            border: '1px solid var(--glass-border)',
            borderRadius: '22px',
            padding: '24px',
          }}
        >
          <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '18px', fontWeight: 700 }}>
              Community Wall of Love
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-dim)', marginTop: '2px' }}>
              Shoutouts from enthusiasts supporting Rakshittips solo mods and tools.
            </p>
          </div>

          {/* Form to leave shoutout */}
          <form
            onSubmit={handleAddSupporterMessage}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: '20px',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: '13.5px', marginBottom: '10px' }}>
              Leave a Supporter Note / Shoutout:
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                value={newDonorName}
                onChange={(e) => setNewDonorName(e.target.value)}
                required
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  color: 'var(--text)',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
              <input
                type="number"
                placeholder="Amount (₹)"
                value={newDonorAmount}
                onChange={(e) => setNewDonorAmount(e.target.value)}
                min="1"
                required
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  color: 'var(--text)',
                  fontSize: '13px',
                  outline: 'none',
                }}
              />
              <select
                value={newDonorProject}
                onChange={(e) => setNewDonorProject(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  color: 'var(--text)',
                  fontSize: '13px',
                  outline: 'none',
                }}
              >
                <option value="instaGram Pro" style={{ color: '#000' }}>instaGram Pro</option>
                <option value="MRGram iPhone!" style={{ color: '#000' }}>MRGram iPhone!</option>
                <option value="MRTune" style={{ color: '#000' }}>MRTune</option>
                <option value="MRiOS Launcher" style={{ color: '#000' }}>MRiOS Launcher</option>
                <option value="MRiMods Launcher" style={{ color: '#000' }}>MRiMods Launcher</option>
              </select>
            </div>
            <textarea
              placeholder="Your encouraging words for Rakshit..."
              value={newDonorMsg}
              onChange={(e) => setNewDonorMsg(e.target.value)}
              rows={2}
              required
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--glass-border)',
                borderRadius: '10px',
                padding: '8px 12px',
                color: 'var(--text)',
                fontSize: '13px',
                outline: 'none',
                resize: 'none',
                marginBottom: '10px',
              }}
            />
            <button
              type="submit"
              className="copy-btn"
              style={{
                background: 'var(--grad)',
                color: '#fff',
                border: 'none',
                fontSize: '13px',
                padding: '8px 16px',
              }}
            >
              <i className="fa-solid fa-paper-plane"></i> Post Shoutout
            </button>
          </form>

          {/* List of shoutouts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {supporters.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '14px 16px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '14px' }}>{item.name}</span>
                    <span
                      style={{
                        fontSize: '10.5px',
                        padding: '1px 7px',
                        borderRadius: '999px',
                        background: 'rgba(236,72,153,0.15)',
                        color: '#ec4899',
                        fontWeight: 600,
                      }}
                    >
                      {item.project}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                      • {item.date}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '4px' }}>
                    "{item.message}"
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '15px',
                      color: '#22c55e',
                    }}
                  >
                    ₹{item.amount}
                  </span>
                  <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>
                    {item.badge}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
