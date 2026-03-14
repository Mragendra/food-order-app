import React, { useState } from 'react';
import { kidsMenuItems } from '../kidsData';
import s from './KidsMenu.module.css';

function WebCorner({ flip }) {
  return (
    <svg className={`${s.webCorner} ${flip ? s.webCornerFlip : ''}`} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.18" stroke="#e03030" strokeWidth="1.5">
        {[0,18,36,54,72,90].map(deg => (
          <line key={deg} x1="0" y1="0" x2={160 * Math.cos(deg * Math.PI / 180)} y2={160 * Math.sin(deg * Math.PI / 180)} />
        ))}
        {[30,60,90,120,150].map(r => <circle key={r} cx="0" cy="0" r={r} />)}
      </g>
    </svg>
  );
}

function SpiderIcon() {
  return (
    <svg viewBox="0 0 64 64" className={s.spiderSvg} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="36" rx="10" ry="12" fill="#e03030"/>
      <circle cx="32" cy="20" r="9" fill="#e03030"/>
      <ellipse cx="28" cy="19" rx="3.5" ry="2.5" fill="white" transform="rotate(-15 28 19)"/>
      <ellipse cx="36" cy="19" rx="3.5" ry="2.5" fill="white" transform="rotate(15 36 19)"/>
      {[[-12,-2,-28,-14],[12,-2,28,-14],[-11,4,-28,2],[11,4,28,2],[-10,10,-26,16],[10,10,26,16]].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={32+x1} y1={32+y1} x2={32+x2} y2={32+y2} stroke="#e03030" strokeWidth="2.5" strokeLinecap="round"/>
      ))}
      <line x1="22" y1="36" x2="42" y2="36" stroke="#8b0000" strokeWidth="0.8" opacity="0.5"/>
      <line x1="23" y1="30" x2="41" y2="30" stroke="#8b0000" strokeWidth="0.8" opacity="0.5"/>
      <line x1="32" y1="24" x2="32" y2="48" stroke="#8b0000" strokeWidth="0.8" opacity="0.5"/>
    </svg>
  );
}

function WebLineDecor() {
  return (
    <svg className={s.webLine} viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 20 Q50 5 100 20 Q150 35 200 20 Q250 5 300 20 Q350 35 400 20" stroke="#e03030" strokeWidth="1.5" opacity="0.3" fill="none"/>
      {[50,100,150,200,250,300,350].map(x => (
        <circle key={x} cx={x} cy={x % 100 === 0 ? 20 : x % 100 < 50 ? 5 : 35} r="3" fill="#e03030" opacity="0.25"/>
      ))}
    </svg>
  );
}

function KidsCard({ item, quantity, onAdd, onRemove }) {
  const isRed = item.color === '#e03030';
  return (
    <div className={`${s.card} ${isRed ? s.cardRed : s.cardBlue}`}>
      <div className={s.cardWebTL}><WebCorner /></div>
      <div className={s.cardWebBR}><WebCorner flip /></div>
      <div className={s.cardTop}>
        <span className={s.cardEmoji}>{item.emoji}</span>
        <div className={s.cardBadge}><span>🕷️</span></div>
      </div>
      <h3 className={s.cardName}>{item.name}</h3>
      <p className={s.cardTagline}>{item.tagline}</p>
      <p className={s.cardDesc}>{item.desc}</p>
      {item.allergens.length > 0 && (
        <div className={s.allergens}>
          {item.allergens.map(a => <span key={a} className={s.allergen}>{a}</span>)}
        </div>
      )}
      <div className={s.cardStats}>
        <span>⏱ {item.time}m</span>
        <span>🔥 {item.calories} cal</span>
      </div>
      <div className={s.cardFooter}>
        <span className={s.cardPrice}>${item.price.toFixed(2)}</span>
        <div className={s.cardControls}>
          {quantity > 0 ? (
            <>
              <button className={s.qBtn} onClick={() => onRemove(item.id)}>−</button>
              <span className={s.qNum}>{quantity}</span>
              <button className={s.qBtn} onClick={() => onAdd(item)}>+</button>
            </>
          ) : (
            <button className={s.addBtn} onClick={() => onAdd(item)}>Add 🕸️</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function KidsMenu({ onAddToCart, onRemoveFromCart, getQty, onBack }) {
  const [swinging, setSwinging] = useState(false);

  function handleAdd(item) {
    onAddToCart(item);
    setSwinging(true);
    setTimeout(() => setSwinging(false), 600);
  }

  return (
    <div className={s.page}>
      <div className={s.bgWebs} aria-hidden>
        {[...Array(6)].map((_, i) => <div key={i} className={s.bgWeb} style={{ '--i': i }} />)}
      </div>
      <section className={s.hero}>
        <div className={s.heroLeft}>
          <button className={s.backBtn} onClick={onBack}>← Back to Menu</button>
          <div className={s.heroEyebrow}>
            <span className={s.eyebrowWeb}>🕸️</span>
            <span>KIDS MENU</span>
            <span className={s.eyebrowWeb}>🕸️</span>
          </div>
          <h1 className={s.heroTitle}>
            <span className={s.heroLine1}>With Great</span>
            <span className={s.heroLine2}>Food Comes</span>
            <span className={s.heroLine3}>Great <em>Power!</em></span>
          </h1>
          <p className={s.heroSub}>Specially crafted meals for little heroes aged 3–12.<br/>Every dish is a new adventure!</p>
          <div className={s.heroTags}>
            <span className={s.tag}>🥦 Kid-Friendly</span>
            <span className={s.tag}>⚡ Quick Prep</span>
            <span className={s.tag}>😊 Fun Shapes</span>
          </div>
        </div>
        <div className={s.heroRight}>
          <div className={`${s.spiderWrap} ${swinging ? s.swing : ''}`}><SpiderIcon /></div>
          <WebLineDecor />
        </div>
      </section>
      <div className={s.divider}>
        <WebLineDecor />
        <span className={s.dividerText}>🕷️ TODAY'S HERO MEALS 🕷️</span>
        <WebLineDecor />
      </div>
      <main className={s.grid}>
        {kidsMenuItems.map(item => (
          <KidsCard key={item.id} item={item} quantity={getQty(item.id)} onAdd={handleAdd} onRemove={onRemoveFromCart} />
        ))}
      </main>
      <section className={s.cta}>
        <div className={s.ctaInner}>
          <span className={s.ctaEmoji}>🕸️</span>
          <div>
            <h3 className={s.ctaTitle}>Every hero deserves a full meal!</h3>
            <p className={s.ctaSub}>All kids meals come with a free Spidey sticker. Ask your server!</p>
          </div>
          <span className={s.ctaEmoji}>🕸️</span>
        </div>
      </section>
    </div>
  );
}
