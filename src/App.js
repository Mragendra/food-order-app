import React, { useState, useMemo } from 'react';
import { menuItems as initialItems, categories as initialCategories } from './data';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import MenuCard from './components/MenuCard';
import Cart from './components/Cart';
import AddDish from './pages/AddDish';
import KidsMenu from './pages/KidsMenu';
import s from './App.module.css';

export default function App() {
  const [page, setPage] = useState('menu');
  const [dishes, setDishes] = useState(initialItems);
  const [cats, setCats] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  const filtered = useMemo(() => {
    return dishes.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [dishes, activeCategory, search]);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  function addToCart(item) {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter(i => i.id !== id);
      return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
    });
  }

  function getQty(id) {
    return cart.find(i => i.id === id)?.qty || 0;
  }

  function handleAddDish(newDish) {
    const id = dishes.length ? Math.max(...dishes.map(d => d.id)) + 1 : 1;
    setDishes(prev => [...prev, { ...newDish, id }]);
    if (!cats.includes(newDish.category)) {
      setCats(prev => [...prev, newDish.category]);
    }
    showToast(`"${newDish.name}" added to the menu!`);
    setPage('menu');
    setActiveCategory(newDish.category);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className={s.app}>
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} page={page} onNav={setPage} />

      {page === 'add-dish' && (
        <AddDish categories={cats.filter(c => c !== 'All')} onSubmit={handleAddDish} onCancel={() => setPage('menu')} />
      )}

      {page === 'kids' && (
        <KidsMenu onAddToCart={addToCart} onRemoveFromCart={removeFromCart} getQty={getQty} onBack={() => setPage('menu')} />
      )}

      {page === 'menu' && (
        <>
          <section className={s.hero}>
            <div className={s.heroText}>
              <p className={s.heroEyebrow}>Fresh · Fast · Fearless</p>
              <h1 className={s.heroTitle}>What are you<br /><em>craving?</em></h1>
            </div>
            <div className={s.heroRight}>
              <div className={s.searchWrap}>
                <span className={s.searchIcon}>🔍</span>
                <input className={s.search} type="text" placeholder="Search dishes..." value={search} onChange={e => setSearch(e.target.value)} />
                {search && <button className={s.clearBtn} onClick={() => setSearch('')}>✕</button>}
              </div>
              <button className={s.kidsPromo} onClick={() => setPage('kids')}>
                <span className={s.kidsPromoEmoji}>🕷️</span>
                <div className={s.kidsPromoText}>
                  <span className={s.kidsPromoTitle}>Kids Menu</span>
                  <span className={s.kidsPromoBadge}>Spidey Special →</span>
                </div>
              </button>
            </div>
          </section>

          <CategoryBar categories={cats} active={activeCategory} onSelect={setActiveCategory} />

          <main className={s.main}>
            {filtered.length === 0 ? (
              <div className={s.noResults}>
                <span>😶</span>
                <p>No dishes found</p>
                <span className={s.noHint}>Try a different search or category</span>
              </div>
            ) : (
              <div className={s.grid}>
                {filtered.map(item => (
                  <MenuCard key={item.id} item={item} quantity={getQty(item.id)} onAdd={addToCart} onRemove={removeFromCart} />
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {cartOpen && <Cart items={cart} onAdd={addToCart} onRemove={removeFromCart} onClose={() => setCartOpen(false)} />}
      {toast && <div className={s.toast}><span>✅</span> {toast}</div>}
    </div>
  );
}
