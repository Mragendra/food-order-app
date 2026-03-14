import React from 'react';
import s from './Header.module.css';

export default function Header({ cartCount, onCartClick, page, onNav }) {
  return (
    <header className={s.header}>
      <div className={s.logo} onClick={() => onNav('menu')} style={{ cursor: 'pointer' }}>
        <span className={s.logoText}>GRUB</span>
        <span className={s.logoSub}>order something delicious</span>
      </div>
      <nav className={s.nav}>
        <span className={`${s.navItem} ${page === 'menu' ? s.navActive : ''}`} onClick={() => onNav('menu')}>Menu</span>
        <span className={`${s.navItem} ${s.navKids} ${page === 'kids' ? s.navKidsActive : ''}`} onClick={() => onNav('kids')}>🕷️ Kids</span>
        <span className={`${s.navItem} ${page === 'add-dish' ? s.navActive : ''}`} onClick={() => onNav('add-dish')}>+ Add Dish</span>
      </nav>
      <button className={s.cartBtn} onClick={onCartClick}>
        <span className={s.cartIcon}>🛒</span>
        <span className={s.cartLabel}>Cart</span>
        {cartCount > 0 && <span className={s.cartBadge}>{cartCount}</span>}
      </button>
    </header>
  );
}
