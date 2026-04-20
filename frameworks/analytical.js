function analytical(blocks, theme, title, subtitle, meta) {
  const t = getTheme(theme);
  const row1 = blocks.slice(0, 3);
  const row2 = blocks.slice(3);

  function col(b, i, total, altColor) {
    const bg = altColor || (i % 2 === 0 ? t.primary : t.secondary);
    const isLast = i === total - 1;
    return `
    <div style="display:flex;flex-direction:column;border-right:${!isLast?'2px solid #e8e4dc':'none'};position:relative;">
      <div style="padding:24px 26px 20px;background:${bg};">
        <div style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:5px;">Stage ${b.stageNum}</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:#fff;line-height:1.15;">${b.title}</div>
        <div style="font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,0.45);letter-spacing:0.10em;text-transform:uppercase;margin-top:5px;">${b.sub}</div>
      </div>
      <div style="height:3px;background:${t.gold};"></div>
      <div style="flex:1;background:#fff;padding:20px 26px;">
        ${b.sections.map((s,si) => `
          <div style="font-family:'DM Mono',monospace;font-size:9.5px;letter-spacing:0.16em;text-transform:uppercase;color:#999;${si>0?'margin-top:16px;':''}margin-bottom:8px;padding-bottom:6px;border-bottom:1.5px solid #ede9e0;">${s.label}</div>
          ${s.items.map(it=>`
            <div style="display:flex;align-items:flex-start;gap:10px;padding:6px 0;border-bottom:1px solid #f0ece3;font-size:14px;color:#2a2a2a;line-height:1.5;font-family:'DM Sans',sans-serif;">
              <div style="width:6px;height:6px;border-radius:50%;background:${t.bullet};flex-shrink:0;margin-top:7px;"></div>
              <span>${it}</span>
            </div>`).join('')}
        `).join('')}
      </div>
      ${!isLast ? `<div style="position:absolute;right:-18px;top:50%;transform:translateY(-50%);font-size:24px;color:${t.gold};z-index:10;font-family:'Cormorant Garamond',serif;line-height:1;">→</div>` : ''}
    </div>`;
  }

  function row(items, cols) {
    return `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);border-left:4px solid ${t.primary};border-right:4px solid ${t.primary};position:relative;">
      ${items.map((b,i) => col(b, i, items.length)).join('')}
    </div>`;
  }

  return header(title, subtitle, meta, t)
    + row(row1, 3)
    + (row2.length ? `<div style="text-align:center;background:#f4f1ec;padding:5px;font-size:20px;color:${t.gold};border-left:4px solid ${t.primary};border-right:4px solid ${t.primary};">↓</div>${row(row2, row2.length)}` : '');
}