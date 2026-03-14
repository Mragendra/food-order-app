import React, { useState } from 'react';
import s from './AddDish.module.css';

const EMOJI_OPTIONS = ['🍔','🍕','🍣','🌮','🥗','🍮','🍦','🍗','🍜','🍝','🌯','🥙','🍱','🥩','🥘','🍲','🌽','🥪','🧆','🫔'];
const INITIAL = { name: '', category: '', newCategory: '', price: '', calories: '', time: '', desc: '', emoji: '🍔', popular: false };

export default function AddDish({ categories, onSubmit, onCancel }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [addingNewCat, setAddingNewCat] = useState(false);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Dish name is required';
    const cat = addingNewCat ? form.newCategory.trim() : form.category;
    if (!cat) e.category = 'Please select or enter a category';
    if (!form.price || isNaN(form.price) || +form.price <= 0) e.price = 'Enter a valid price';
    if (!form.calories || isNaN(form.calories) || +form.calories <= 0) e.calories = 'Enter valid calories';
    if (!form.time || isNaN(form.time) || +form.time <= 0) e.time = 'Enter valid prep time';
    if (!form.desc.trim()) e.desc = 'Add a short description';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const category = addingNewCat ? form.newCategory.trim() : form.category;
    onSubmit({ name: form.name.trim(), category, price: parseFloat(form.price), calories: parseInt(form.calories), time: parseInt(form.time), desc: form.desc.trim(), emoji: form.emoji, popular: form.popular, rating: 4.5 });
    setForm(INITIAL);
    setErrors({});
  }

  const previewCategory = addingNewCat ? (form.newCategory || 'Category') : (form.category || 'Category');

  return (
    <div className={s.page}>
      <div className={s.inner}>
        <div className={s.formCol}>
          <div className={s.pageHeader}>
            <button className={s.backBtn} onClick={onCancel}>← Back to Menu</button>
            <h1 className={s.title}>Add New<br /><em>Dish</em></h1>
            <p className={s.subtitle}>Fill in the details and your dish goes live on the menu instantly.</p>
          </div>
          <form className={s.form} onSubmit={handleSubmit} noValidate>
            <div className={s.fieldGroup}>
              <label className={s.label}>Choose an Emoji</label>
              <div className={s.emojiGrid}>
                {EMOJI_OPTIONS.map(em => (
                  <button type="button" key={em} className={`${s.emojiBtn} ${form.emoji === em ? s.emojiActive : ''}`} onClick={() => set('emoji', em)}>{em}</button>
                ))}
              </div>
            </div>
            <div className={s.fieldGroup}>
              <label className={s.label} htmlFor="name">Dish Name <span className={s.req}>*</span></label>
              <input id="name" className={`${s.input} ${errors.name ? s.inputError : ''}`} type="text" placeholder="e.g. Truffle Royale" value={form.name} onChange={e => set('name', e.target.value)} />
              {errors.name && <span className={s.errMsg}>{errors.name}</span>}
            </div>
            <div className={s.fieldGroup}>
              <label className={s.label}>Category <span className={s.req}>*</span></label>
              <div className={s.catRow}>
                {!addingNewCat ? (
                  <>
                    <select className={`${s.select} ${errors.category ? s.inputError : ''}`} value={form.category} onChange={e => set('category', e.target.value)}>
                      <option value="">Select category…</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button type="button" className={s.newCatBtn} onClick={() => setAddingNewCat(true)}>+ New</button>
                  </>
                ) : (
                  <>
                    <input className={`${s.input} ${errors.category ? s.inputError : ''}`} type="text" placeholder="New category name…" value={form.newCategory} onChange={e => set('newCategory', e.target.value)} autoFocus />
                    <button type="button" className={s.newCatBtn} onClick={() => { setAddingNewCat(false); set('newCategory', ''); }}>Cancel</button>
                  </>
                )}
              </div>
              {errors.category && <span className={s.errMsg}>{errors.category}</span>}
            </div>
            <div className={s.threeCol}>
              <div className={s.fieldGroup}>
                <label className={s.label} htmlFor="price">Price ($) <span className={s.req}>*</span></label>
                <input id="price" className={`${s.input} ${errors.price ? s.inputError : ''}`} type="number" step="0.01" min="0" placeholder="18.50" value={form.price} onChange={e => set('price', e.target.value)} />
                {errors.price && <span className={s.errMsg}>{errors.price}</span>}
              </div>
              <div className={s.fieldGroup}>
                <label className={s.label} htmlFor="calories">Calories <span className={s.req}>*</span></label>
                <input id="calories" className={`${s.input} ${errors.calories ? s.inputError : ''}`} type="number" min="0" placeholder="620" value={form.calories} onChange={e => set('calories', e.target.value)} />
                {errors.calories && <span className={s.errMsg}>{errors.calories}</span>}
              </div>
              <div className={s.fieldGroup}>
                <label className={s.label} htmlFor="time">Prep Time (min) <span className={s.req}>*</span></label>
                <input id="time" className={`${s.input} ${errors.time ? s.inputError : ''}`} type="number" min="1" placeholder="12" value={form.time} onChange={e => set('time', e.target.value)} />
                {errors.time && <span className={s.errMsg}>{errors.time}</span>}
              </div>
            </div>
            <div className={s.fieldGroup}>
              <label className={s.label} htmlFor="desc">Description <span className={s.req}>*</span></label>
              <textarea id="desc" className={`${s.textarea} ${errors.desc ? s.inputError : ''}`} placeholder="Short, enticing description of the dish…" rows={3} value={form.desc} onChange={e => set('desc', e.target.value)} />
              {errors.desc && <span className={s.errMsg}>{errors.desc}</span>}
            </div>
            <div className={s.fieldGroup}>
              <label className={s.toggleRow}>
                <div className={`${s.toggle} ${form.popular ? s.toggleOn : ''}`} onClick={() => set('popular', !form.popular)} role="switch" aria-checked={form.popular} tabIndex={0} onKeyDown={e => e.key === ' ' && set('popular', !form.popular)}>
                  <span className={s.toggleThumb} />
                </div>
                <span className={s.toggleLabel}>Mark as <strong>Popular</strong><span className={s.toggleHint}> — shows an orange badge on the card</span></span>
              </label>
            </div>
            <div className={s.actions}>
              <button type="button" className={s.cancelBtn} onClick={onCancel}>Cancel</button>
              <button type="submit" className={s.submitBtn}>Add to Menu</button>
            </div>
          </form>
        </div>
        <div className={s.previewCol}>
          <p className={s.previewLabel}>Live Preview</p>
          <div className={s.previewCard}>
            {form.popular && <span className={s.previewBadge}>Popular</span>}
            <div className={s.previewEmoji}>{form.emoji}</div>
            <div className={s.previewMeta}>
              <span className={s.previewCat}>{previewCategory}</span>
              <span className={s.previewRating}>★ 4.5</span>
            </div>
            <h3 className={s.previewName}>{form.name || 'Dish Name'}</h3>
            <p className={s.previewDesc}>{form.desc || 'Your description will appear here…'}</p>
            <div className={s.previewStats}>
              {form.time && <span>⏱ {form.time}m</span>}
              {form.calories && <span>🔥 {form.calories} cal</span>}
            </div>
            <div className={s.previewFooter}>
              <span className={s.previewPrice}>{form.price ? `$${parseFloat(form.price).toFixed(2)}` : '$0.00'}</span>
              <button className={s.previewAddBtn} disabled>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
