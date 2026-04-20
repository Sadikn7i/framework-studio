function renderTimeline(blocks, theme, title, subtitle, meta) {
  const t = getTheme(theme);
  return header(title, subtitle, meta, t) + `
  <div style="background:#f4f1ec;padding:50px 60px;position:relative;">
    <div style="position:absolute;left:50%;top:50px;bottom:50px;width:3px;background:linear-gradient(180deg,${t.gold},${t.gold2},${t.gold});transform:translateX(-50%);"></div>
    <div style="display:flex;flex-direction:column;gap:32px;">
      ${blocks.map((b,i) => {
        const left = i % 2 === 0;
        return `
        <div style="display:grid;grid-template-columns:1fr 60px 1fr;align-items:center;gap:0;position:relative;">
          ${left ? `
            <div style="background:#fff;border-right:4px solid ${t.primary};box-shadow:0 2px 14px rgba(0,0,0,0.07);padding:0;overflow:hidden;border-radius:4px 0 0 4px;">
              <div style="background:${t.primary};padding:14px 20px;">
                <div style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#fff;">${b.title}</div>
                <div style="font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,0.45);letter-spacing:0.10em;text-transform:uppercase;margin-top:3px;">${b.sub}</div>
              </div>
              <div style="padding:12px 20px;">
                ${b.sections.flatMap(s=>s.items).map(it=>`<div style="padding:4px 0;border-bottom:1px solid #f0ece3;font-size:13px;color:#2a2a2a;font-family:'DM Sans',sans-serif;display:flex;gap:8px;align-items:flex-start;"><div style="width:5px;height:5px;border-radius:50%;background:${t.bullet};flex-shrink:0;margin-top:6px;"></div>${it}</div>`).join('')}
              </div>
            </div>
          ` : '<div></div>'}
          <div style="display:flex;align-items:center;justify-content:center;z-index:2;">
            <div style="width:40px;height:40px;border-radius:50%;background:${t.primary};border:4px solid ${t.gold};display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:12px;font-weight:500;color:${t.gold};">${b.stageNum || i+1}</div>
          </div>
          ${!left ? `
            <div style="background:#fff;border-left:4px solid ${t.secondary};box-shadow:0 2px 14px rgba(0,0,0,0.07);overflow:hidden;border-radius:0 4px 4px 0;">
              <div style="background:${t.secondary};padding:14px 20px;">
                <div style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#fff;">${b.title}</div>
                <div style="font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,0.45);letter-spacing:0.10em;text-transform:uppercase;margin-top:3px;">${b.sub}</div>
              </div>
              <div style="padding:12px 20px;">
                ${b.sections.flatMap(s=>s.items).map(it=>`<div style="padding:4px 0;border-bottom:1px solid #f0ece3;font-size:13px;color:#2a2a2a;font-family:'DM Sans',sans-serif;display:flex;gap:8px;align-items:flex-start;"><div style="width:5px;height:5px;border-radius:50%;background:${t.bullet};flex-shrink:0;margin-top:6px;"></div>${it}</div>`).join('')}
              </div>
            </div>
          ` : '<div></div>'}
        </div>`;
      }).join('')}
    </div>
  </div>`;
}