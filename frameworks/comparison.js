function renderComparison(blocks, theme, title, subtitle, meta) {
  const t = getTheme(theme);
  const left  = blocks.slice(0, Math.ceil(blocks.length/2));
  const right = blocks.slice(Math.ceil(blocks.length/2));

  function side(items, bg, align) {
    return `<div style="display:flex;flex-direction:column;gap:0;">
      ${items.map((b,i) => `
        <div style="border-bottom:${i<items.length-1?'2px solid #e8e4dc':'none'};">
          <div style="background:${bg};padding:16px 28px;display:flex;align-items:center;gap:14px;${align==='right'?'flex-direction:row-reverse;':''}" >
            <div style="font-family:'DM Mono',monospace;font-size:22px;font-weight:500;color:rgba(255,255,255,0.2);">${String(i+1).padStart(2,'0')}</div>
            <div>
              <div style="font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:700;color:#fff;${align==='right'?'text-align:right;':''}">${b.title}</div>
              <div style="font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,0.4);letter-spacing:0.10em;text-transform:uppercase;margin-top:3px;${align==='right'?'text-align:right;':''}">${b.sub}</div>
            </div>
          </div>
          <div style="background:#fff;padding:14px 28px;">
            ${b.sections.flatMap(s=>s.items).map(it=>`
              <div style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid #f0ece3;font-size:13px;color:#2a2a2a;font-family:'DM Sans',sans-serif;${align==='right'?'flex-direction:row-reverse;text-align:right;':''}">
                <div style="width:5px;height:5px;border-radius:50%;background:${bg};flex-shrink:0;margin-top:6px;"></div>${it}
              </div>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>`;
  }

  return header(title, subtitle, meta, t) + `
  <div style="display:grid;grid-template-columns:1fr 4px 1fr;border:4px solid ${t.primary};">
    ${side(left, t.primary, 'left')}
    <div style="background:linear-gradient(180deg,${t.gold},${t.gold2},${t.gold});"></div>
    ${side(right, t.secondary, 'right')}
  </div>`;
}