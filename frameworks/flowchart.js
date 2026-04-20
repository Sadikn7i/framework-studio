function renderFlowchart(blocks, theme, title, subtitle, meta) {
  const t = getTheme(theme);
  return header(title, subtitle, meta, t) + `
  <div style="padding:44px 80px;background:#f4f1ec;display:flex;flex-direction:column;align-items:center;gap:0;">
    ${blocks.map((b,i) => `
      <div style="width:100%;max-width:720px;background:#fff;border-left:5px solid ${i%2===0?t.primary:t.secondary};box-shadow:0 2px 12px rgba(0,0,0,0.06);border-radius:0 4px 4px 0;overflow:hidden;">
        <div style="background:${i%2===0?t.primary:t.secondary};padding:16px 28px;display:flex;align-items:center;gap:20px;">
          <div style="font-family:'DM Mono',monospace;font-size:28px;font-weight:500;color:rgba(255,255,255,0.25);min-width:44px;">${String(i+1).padStart(2,'0')}</div>
          <div style="flex:1;">
            <div style="font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:#fff;">${b.title}</div>
            <div style="font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,0.45);letter-spacing:0.10em;text-transform:uppercase;margin-top:3px;">${b.sub}</div>
          </div>
        </div>
        <div style="padding:16px 28px 16px 28px;display:flex;flex-wrap:wrap;gap:8px;">
          ${b.sections.flatMap(s=>s.items).map(it=>`
            <div style="display:inline-flex;align-items:center;gap:7px;background:#f4f1ec;padding:6px 14px;border-radius:3px;font-size:13px;color:#2a2a2a;font-family:'DM Sans',sans-serif;">
              <div style="width:5px;height:5px;border-radius:50%;background:${t.bullet};flex-shrink:0;"></div>${it}
            </div>`).join('')}
        </div>
      </div>
      ${i<blocks.length-1?`
        <div style="display:flex;flex-direction:column;align-items:center;padding:4px 0;">
          <div style="width:2px;height:16px;background:${t.gold};"></div>
          <div style="font-size:12px;color:${t.gold};">▼</div>
          <div style="width:2px;height:8px;background:${t.gold};"></div>
        </div>` : ''}
    `).join('')}
  </div>`;
}