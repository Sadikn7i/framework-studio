function renderHexagon(blocks, theme, title, subtitle, meta) {
  const t = getTheme(theme);
  const colors = [t.primary, t.secondary, t.tertiary, t.accent, t.primary, t.secondary];
  return header(title, subtitle, meta, t) + `
  <div style="background:#f4f1ec;padding:50px 40px;">
    <div style="display:grid;grid-template-columns:repeat(${Math.min(blocks.length,3)},1fr);gap:20px;">
      ${blocks.map((b,i) => `
        <div style="background:#fff;border-top:5px solid ${colors[i%colors.length]};box-shadow:0 2px 16px rgba(0,0,0,0.07);border-radius:0 0 4px 4px;overflow:hidden;">
          <div style="background:${colors[i%colors.length]};padding:20px 22px 16px;">
            <div style="font-family:'DM Mono',monospace;font-size:32px;font-weight:500;color:rgba(255,255,255,0.15);margin-bottom:6px;">${String(i+1).padStart(2,'0')}</div>
            <div style="font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;color:#fff;line-height:1.2;">${b.title}</div>
            <div style="font-family:'DM Mono',monospace;font-size:9.5px;color:rgba(255,255,255,0.45);letter-spacing:0.12em;text-transform:uppercase;margin-top:6px;">${b.sub}</div>
          </div>
          <div style="height:2px;background:linear-gradient(90deg,${t.gold},${t.gold2});"></div>
          <div style="padding:14px 22px;">
            ${b.sections.flatMap(s=>s.items).map(it=>`
              <div style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid #f0ece3;font-size:13px;color:#2a2a2a;font-family:'DM Sans',sans-serif;line-height:1.5;">
                <div style="width:5px;height:5px;border-radius:50%;background:${colors[i%colors.length]};flex-shrink:0;margin-top:6px;"></div>${it}
              </div>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}