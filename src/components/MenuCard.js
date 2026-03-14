import React from 'react';
import s from './MenuCard.module.css';

export default function MenuCard({ item, quantity, onAdd, onRemove }) {
  return (
    <div className={s.card}>
      {item.popular && <span className={s.badge}>Popular</span>}
      <div className={s.emoji}>{item.emoji}</div>
      <div className={s.body}>
        <div className={s.meta}>
          <span className={s.category}>{item.category}</span>
          <span className={s.rating}>★ {item.rating}</span>
        </div>
        <h3 className={s.name}>{item.name}</h3>
        <p className={s.desc}>{item.desc}</p>
        <div className={s.stats}>
          <span className={s.stat}>⏱ {item.time}m</span>
          <span className={s.stat}>🔥 {item.calories} cal</span>
        </div>
      </div>
      <div className={s.footer}>
        <span className={s.price}>${item.price.toFixed(2)}</span>
        <div className={s.controls}>
          {quantity > 0 ? (
            <>
              <button className={s.qtyBtn} onClick={() => onRemove(item.id)}>−</button>
              <span className={s.qty}>{quantity}</span>
              <button className={s.qtyBtn} onClick={() => onAdd(item)}>+</button>
            </>
          ) : (
            <button className={s.addBtn} onClick={() => onAdd(item)}>Add</button>
          )}
        </div>
      </div>
    </div>
  );
}
