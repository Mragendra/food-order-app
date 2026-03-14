import React from 'react';
import s from './CategoryBar.module.css';

export default function CategoryBar({ categories, active, onSelect }) {
  return (
    <div className={s.bar}>
      <div className={s.inner}>
        {categories.map(cat => (
          <button key={cat} className={`${s.btn} ${active === cat ? s.active : ''}`} onClick={() => onSelect(cat)}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
