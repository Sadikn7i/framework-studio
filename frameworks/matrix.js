function renderMatrix(blocks, theme, title, subtitle, meta) {
  const t = getTheme(theme);
  const bgs = [t.primary, t.accent, t.secondary, t.tertiary];
  const tags = ['Quick Wins', 'Strategic', 'Fill-ins', 'Reconsider'];
  const four = [...blocks.slice(0,4)];
  while (four.length < 4) four.push({ title:'—', sub:'', sections:[{label:'',items:[]}] });
  return header(title, subtitle, meta, t) + `
  <div style="display:grid;grid-template-columns:1fr 1fr;border:4px solid ${t.primary};">
    <div style="grid-column:1/-1;display:grid;grid-template-columns:40px 1fr 1fr;border-bottom:3px solid ${t.primary};">
      <div></div>
      <div style="background:${t.primary};padding:8px 20px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.5);text-align:center;border-right:2px solid rgba(255,255,255,0.1);">Low Effort</div>
      <div style="background:${t.primary};padding:8px 20px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.5);text-align:center;">High Effort</div>
    </div>
    ${four.map((b,i) => `
      <div style="border-right:${i%2===0?'2px solid #e8e4dc':'none'};border-bottom:${i<2?'2px solid #e8e4dc':'none'};">
        <div style="background:${bgs[i]};padding:18px 24px 14px;">
          <div style="display:inline-block;background:rgba(255,255,255,0.15);font-family:'DM Mono',monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.8);padding:3px 10px;border-radius:20px;margin-bottom:8px;">${tags[i]}</div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#fff;">${b.title}</div>
          <div style="font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,0.45);letter-spacing:0.08em;text-transform:uppercase;margin-top:4px;">${b.sub}</div>
        </div>
        <div style="height:2px;background:${t.gold};"></div>
        <div style="background:#fff;padding:14px 24px;">
          ${b.sections.flatMap(s=>s.items).map(it=>`
            <div style="display:flex;align-items:flex-start;gap:8px;padding:5px 0;border-bottom:1px solid #f0ece3;font-size:13px;color:#2a2a2a;font-family:'DM Sans',sans-serif;line-height:1.45;">
              <div style="width:5px;height:5px;border-radius:50%;background:${bgs[i]};flex-shrink:0;margin-top:6px;"></div>${it}
            </div>`).join('')}
        </div>
      </div>
    `).join('')}
  </div>`;
}