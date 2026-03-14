import React from 'react';
import s from './Cart.module.css';

export default function Cart({ items, onAdd, onRemove, onClose }) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + delivery;

  return (
    <div className={s.overlay} onClick={onClose}>
      <aside className={s.panel} onClick={e => e.stopPropagation()}>
        <div className={s.header}>
          <h2 className={s.title}>Your Order</h2>
          <button className={s.close} onClick={onClose}>✕</button>
        </div>
        {items.length === 0 ? (
          <div className={s.empty}>
            <span className={s.emptyIcon}>🍽️</span>
            <p>Nothing here yet</p>
            <span className={s.emptyHint}>Add something delicious from the menu</span>
          </div>
        ) : (
          <>
            <div className={s.items}>
              {items.map(item => (
                <div key={item.id} className={s.item}>
                  <span className={s.itemEmoji}>{item.emoji}</span>
                  <div className={s.itemInfo}>
                    <span className={s.itemName}>{item.name}</span>
                    <span className={s.itemPrice}>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                  <div className={s.itemControls}>
                    <button className={s.qBtn} onClick={() => onRemove(item.id)}>−</button>
                    <span className={s.qNum}>{item.qty}</span>
                    <button className={s.qBtn} onClick={() => onAdd(item)}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className={s.summary}>
              <div className={s.row}><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className={s.row}><span>Delivery</span><span>${delivery.toFixed(2)}</span></div>
              <div className={`${s.row} ${s.total}`}><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button className={s.checkoutBtn}>Place Order — ${total.toFixed(2)}</button>
          </>
        )}
      </aside>
    </div>
  );
}
