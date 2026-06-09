import { useState } from 'react';
import { getStreamingByRegion, regions } from '../data/streaming';
import './StreamingLinks.css';

export default function StreamingLinks({ isModal = false, onClose, region }) {
  const [activeRegionState, setActiveRegionState] = useState('All');
  const isControlled = region !== undefined;
  const activeRegion = isControlled ? region : activeRegionState;
  const platforms = getStreamingByRegion(activeRegion);

  const content = (
    <div className={`streaming ${isModal ? 'streaming--modal' : ''}`}>
      {/* Header */}
      <div className="streaming__header">
        <div>
          <h2 className="streaming__title section-title">
            📺 <span className="gradient-text">Where to Watch</span>
          </h2>
          <p className="streaming__subtitle">Find official broadcasters in your region</p>
        </div>
        {isModal && onClose && (
          <button className="streaming__close" onClick={onClose} aria-label="Close">✕</button>
        )}
      </div>

      {/* Region Tabs */}
      {!isControlled && (
        <div className="streaming__tabs-wrapper">
          <div className="tabs streaming__tabs">
            {regions.map((regionItem) => (
              <button
                key={regionItem}
                className={`tab ${activeRegionState === regionItem ? 'active' : ''}`}
                onClick={() => setActiveRegionState(regionItem)}
              >
                {regionItem}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Platform Grid */}
      <div className="streaming__grid stagger-children">
        {platforms.map((platform, idx) => (
          <article className="streaming__card glass-card" key={`${platform.name}-${idx}`}>
            <div className="streaming__card-header">
              <h3 className="streaming__card-name">{platform.name}</h3>
              <span className={`badge ${platform.free ? 'streaming__badge--free' : 'streaming__badge--paid'}`}>
                {platform.free ? '✓ FREE' : '💰 PAID'}
              </span>
            </div>
            <p className="streaming__card-country">{platform.country}</p>
            <p className="streaming__card-note">{platform.note}</p>
            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm streaming__card-link"
            >
              Visit Platform →
            </a>
          </article>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="streaming__disclaimer">
        <p>
          ⚠️ Streaming availability may vary. Check local listings for confirmation.
          Links open external sites. Some platforms may require paid subscriptions.
        </p>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="streaming__overlay" onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}>
        <div className="streaming__modal-body">
          {content}
        </div>
      </div>
    );
  }

  return content;
}
