const themes = {
  navy:     { primary:'#0a1f35', secondary:'#14345a', tertiary:'#1e5080', gold:'#c8922a', gold2:'#e8b84b', accent:'#6b1414', bullet:'#1e5080' },
  forest:   { primary:'#1a3328', secondary:'#2d5a3d', tertiary:'#3a7a4a', gold:'#8fbc5a', gold2:'#b8d87a', accent:'#5a3a1a', bullet:'#3a7a4a' },
  midnight: { primary:'#1e1024', secondary:'#2d1b40', tertiary:'#4a2d6a', gold:'#c8922a', gold2:'#e8b84b', accent:'#6b1450', bullet:'#7a4aaa' },
  obsidian: { primary:'#141414', secondary:'#222222', tertiary:'#333333', gold:'#c8922a', gold2:'#e8b84b', accent:'#5a0000', bullet:'#555' },
  crimson:  { primary:'#6b1414', secondary:'#8b2020', tertiary:'#ab3030', gold:'#c8922a', gold2:'#e8b84b', accent:'#1414aa', bullet:'#c84040' },
  slate:    { primary:'#1a2e4a', secondary:'#243f66', tertiary:'#2e5080', gold:'#7ab8d4', gold2:'#a0d0e8', accent:'#4a3000', bullet:'#4a80aa' },
};

function getTheme(n) { return themes[n] || themes.navy; }

const styleLabels = {
  analytical: 'Analytical Stages',
  flowchart:  'Process Flowchart',
  matrix:     '2×2 Matrix',
  timeline:   'Timeline',
  comparison: 'Side-by-Side Comparison',
  hexagon:    'Pillar Framework',
};

let currentStyle = 'analytical';
let currentTheme = 'navy';

const defaultBlocks = [
  { title:'Data & Sample',    sub:'Survey Construction',  stageNum:'I',   sections:[{label:'Dataset',items:['39,862 observations','Multi-country, developing economies','Unregistered firms only']},{label:'Variable Construction',items:['Country population reweighting','PCA-based capital index','Standardised management score']}] },
  { title:'Productivity Gap', sub:'Output Premium',       stageNum:'II',  sections:[{label:'Performance Metrics',items:['Log output by financing source','Labour productivity (revenue per worker)']},{label:'Financial Status Groups',items:['Has formal bank loan','Credit constrained','Sufficient / no need']}] },
  { title:'OLS & HDFE',       sub:'Baseline Regression',  stageNum:'III', sections:[{label:'Specifications',items:['Bivariate baseline (Col. 1)','Year / Sector / Size FE (Col. 2)','Country FE + Firm-clustered SE (Col. 3)']},{label:'Controls',items:['Bank financing treatment dummy','Log labour, capital PCA, management','Identification within country-sector-size-year cells']}] },
  { title:'Logit',            sub:'Credit Determinants',  stageNum:'IV',  sections:[{label:'Firm-Level Predictors',items:['Productivity (log output)','Tangible assets (building, machinery)','Management quality (z-score)','Digital payment adoption']},{label:'Owner Demographics',items:['Education, experience, gender','Firm age, size class, location']}] },
  { title:'BMA Logit',        sub:'Model Averaging',      stageNum:'V',   sections:[{label:'Specifications',items:['Spec 1: Full model','Spec 2: Excl. prior banking','Spec 3: Disaggregated management','Sub-sample: credit-demanding firms']},{label:'Method',items:['MCMC 10,000 iter · uniform prior','PIP as evidence metric']}] },
];

let blocks = JSON.parse(JSON.stringify(defaultBlocks));

function selectStyle(s) {
  currentStyle = s;
  document.querySelectorAll('.scard').forEach(c => c.classList.remove('active'));
  document.getElementById('card-' + s).classList.add('active');
  document.getElementById('style-label').textContent = styleLabels[s];
  buildFramework();
}

function setTheme(t, el) {
  currentTheme = t;
  document.querySelectorAll('.swatch').forEach(d => d.classList.remove('active'));
  el.classList.add('active');
  buildFramework();
}

function addBlock() {
  const n = blocks.length + 1;
  blocks.push({ title:'New Block', sub:'Description', stageNum: n.toString(), sections:[{label:'Content',items:['First item','Second item','Third item']}] });
  renderBlockList();
}

function removeBlock(i) {
  if (blocks.length <= 1) return;
  blocks.splice(i, 1);
  renderBlockList();
}

function renderBlockList() {
  const el = document.getElementById('block-list');
  el.innerHTML = blocks.map((b, i) => `
    <div class="block-item">
      <div class="block-item-header">
        <span class="block-num">${String(i+1).padStart(2,'0')}</span>
        <input class="block-title-inp" value="${b.title}" oninput="blocks[${i}].title=this.value" placeholder="Block title">
        <button class="block-remove" onclick="removeBlock(${i})">×</button>
      </div>
      <input class="block-sub-inp" value="${b.sub}" oninput="blocks[${i}].sub=this.value" placeholder="Subtitle / category">
      <textarea class="block-bullets-inp" oninput="updateBullets(${i}, this.value)" placeholder="One bullet per line">${b.sections.flatMap(s=>s.items).join('\n')}</textarea>
    </div>
  `).join('');
}

function updateBullets(i, val) {
  const items = val.split('\n').filter(l => l.trim());
  blocks[i].sections = [{ label: 'Content', items }];
}

function buildFramework() {
  const title    = document.getElementById('cfg-title').value || 'Framework';
  const subtitle = document.getElementById('cfg-subtitle').value || '';
  const meta     = document.getElementById('cfg-meta').value || '';
  const out      = document.getElementById('output');
  const renders  = { analytical, flowchart:renderFlowchart, matrix:renderMatrix, timeline:renderTimeline, comparison:renderComparison, hexagon:renderHexagon };
  const fn = renders[currentStyle] || analytical;
  out.innerHTML = fn(blocks, currentTheme, title, subtitle, meta);
}

function showToast(m) {
  const t = document.getElementById('toast');
  t.textContent = m; t.style.display = 'block';
  setTimeout(() => t.style.display = 'none', 2800);
}

function exportAs(fmt) {
  const el = document.getElementById('output');
  showToast('Rendering…');
  setTimeout(() => {
    html2canvas(el, { scale: 2.5, useCORS: true, backgroundColor: '#f4f1ec', logging: false }).then(canvas => {
      const name = `framework-${currentStyle}.${fmt}`;
      if (fmt === 'svg') {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${canvas.width}" height="${canvas.height}"><image href="${canvas.toDataURL('image/png')}" width="${canvas.width}" height="${canvas.height}"/></svg>`;
        trigger(URL.createObjectURL(new Blob([svg], {type:'image/svg+xml'})), name);
      } else {
        canvas.toBlob(blob => trigger(URL.createObjectURL(blob), name), fmt==='jpg'?'image/jpeg':'image/png', 0.97);
      }
      showToast('Saved to Downloads ✓');
    });
  }, 200);
}

function trigger(url, name) {
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 5000);
}

// shared header helper
function header(title, subtitle, meta, t) {
  return `
  <div style="background:${t.primary};padding:28px 44px 24px;display:flex;align-items:center;justify-content:space-between;">
    <div style="font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:700;color:#fff;letter-spacing:0.01em;">${title}</div>
    <div style="font-family:'DM Mono',monospace;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.10em;text-transform:uppercase;text-align:right;line-height:2;">${subtitle}<br>${meta}</div>
  </div>
  <div style="height:4px;background:linear-gradient(90deg,${t.gold},${t.gold2},${t.gold});"></div>`;
}

renderBlockList();
buildFramework();