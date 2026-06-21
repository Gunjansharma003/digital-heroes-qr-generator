import { useState, useRef, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';
import './App.css';

/* ── Constants ────────────────────────────────────────────── */
const MAX_CHARS = 2048;
const QR_SIZE = 220;

/* ── App Component ────────────────────────────────────────── */
function App() {
  /* State */
  const [inputValue, setInputValue] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [error, setError] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastFading, setToastFading] = useState(false);

  /* Refs */
  const qrRef = useRef(null);
  const toastTimer = useRef(null);

  /* ── Validation ──────────────────────────────────────────── */
  const validate = useCallback((value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Please enter text or a URL to generate a QR code.';
    }
    if (trimmed.length > MAX_CHARS) {
      return `Input exceeds the maximum of ${MAX_CHARS} characters.`;
    }
    return '';
  }, []);

  /* ── Generate QR ─────────────────────────────────────────── */
  const handleGenerate = useCallback(() => {
    const validationError = validate(inputValue);
    if (validationError) {
      setError(validationError);
      setQrValue('');
      return;
    }
    setError('');
    setQrValue(inputValue.trim());
  }, [inputValue, validate]);

  /* ── Clear ───────────────────────────────────────────────── */
  const handleClear = useCallback(() => {
    setInputValue('');
    setQrValue('');
    setError('');
  }, []);

  /* ── Download PNG ────────────────────────────────────────── */
  const handleDownload = useCallback(async () => {
    if (!qrRef.current) return;
    try {
      const dataUrl = await toPng(qrRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      });

      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = dataUrl;
      link.click();

      /* Show toast */
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToastFading(false);
      setToastVisible(true);

      toastTimer.current = setTimeout(() => {
        setToastFading(true);
        setTimeout(() => {
          setToastVisible(false);
          setToastFading(false);
        }, 350);
      }, 2200);
    } catch {
      setError('Failed to download QR code. Please try again.');
    }
  }, []);

  /* ── Input change ────────────────────────────────────────── */
  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
    if (error) setError('');
  }, [error]);

  /* ── Keyboard shortcut: Enter → Generate ─────────────────── */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleGenerate();
      }
    },
    [handleGenerate]
  );

  /* ── Derived state ───────────────────────────────────────── */
  const charCount = inputValue.length;
  const charWarning = charCount > MAX_CHARS * 0.9;
  const charDanger = charCount > MAX_CHARS;

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="logo-icon" aria-hidden="true">⚡</div>
        <h1>QR Code Generator</h1>
        <p className="subtitle">
          Generate QR codes instantly from any text or URL
        </p>
      </header>

      {/* Main Card */}
      <main className="app-container">
        <div className="main-card">
          {/* Left — Input Panel */}
          <section className="input-panel" aria-label="QR Code input">
            <h2>
              <span className="icon" aria-hidden="true">✏️</span>
              Enter Content
            </h2>

            <div className="input-group">
              <label htmlFor="qr-input">Text or URL</label>
              <textarea
                id="qr-input"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="e.g. https://example.com or any text…"
                className={error ? 'error' : ''}
                spellCheck="false"
                aria-describedby={error ? 'input-error' : undefined}
                aria-invalid={!!error}
              />
              <div
                className={`char-count${charDanger ? ' danger' : charWarning ? ' warning' : ''}`}
              >
                <span>Press Enter to generate</span>
                <span>{charCount} / {MAX_CHARS}</span>
              </div>
              {error && (
                <p id="input-error" className="error-message" role="alert">
                  <span aria-hidden="true">⚠️</span> {error}
                </p>
              )}
            </div>

            <div className="button-group">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleGenerate}
                disabled={!inputValue.trim()}
                id="generate-btn"
              >
                <span className="icon" aria-hidden="true">🔲</span>
                Generate
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClear}
                disabled={!inputValue && !qrValue}
                id="clear-btn"
              >
                <span className="icon" aria-hidden="true">✕</span>
                Clear
              </button>
            </div>
          </section>

          {/* Right — Preview Panel */}
          <section className="preview-panel" aria-label="QR Code preview">
            <h2>
              <span className="icon" aria-hidden="true">📱</span>
              Preview
            </h2>

            <div className={`qr-display${qrValue ? ' has-qr' : ''}`}>
              {qrValue ? (
                <div className="qr-wrapper" ref={qrRef}>
                  <QRCodeCanvas
                    value={qrValue}
                    size={QR_SIZE}
                    level="H"
                    marginSize={2}
                    bgColor="#ffffff"
                    fgColor="#1e1b4b"
                  />
                </div>
              ) : (
                <div className="qr-placeholder">
                  <span className="placeholder-icon" aria-hidden="true">📷</span>
                  <p>Your QR code will appear here</p>
                </div>
              )}
            </div>

            {qrValue && (
              <div className="download-btn-wrapper">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleDownload}
                  id="download-btn"
                  style={{ width: '100%' }}
                >
                  <span className="icon" aria-hidden="true">⬇️</span>
                  Download PNG
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="credit">
          <span className="name">Gunjan Sharma</span>
          <a
            className="email"
            href="mailto:gunjansharma9971@gmail.com"
          >
            gunjansharma9971@gmail.com
          </a>
        </div>
        <a
          className="hero-btn"
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>🚀 Built for Digital Heroes</span>
        </a>
      </footer>

      {/* Toast */}
      {toastVisible && (
        <div className={`toast${toastFading ? ' toast-out' : ''}`} role="status">
          <span aria-hidden="true">✅</span> QR code downloaded successfully!
        </div>
      )}
    </div>
  );
}

export default App;
