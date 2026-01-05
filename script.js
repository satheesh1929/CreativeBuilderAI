/**
 * Retail Media Creative Builder - Core Logic
 */

// State Management
const state = {
    file: null,
    imageSrc: null,
    brandName: '',
    tagline: '',
    cta: 'Shop Now',
    retailer: 'amazon',
    colors: {
        primary: '#4f46e5', // Default before detection
        secondary: '#ffffff'
    },
    isProcessing: false,
    // EDITOR STATE
    editor: {
        active: false,
        template: null, // Copy of template object
        config: {} // Current edits
    },
    // Store customization per template format
    customConfigs: {} // format: { '9:16 Story': { brandAlign: 'center', ctaAlign: 'center', ... } }
};

// DOM Elements
const elements = {
    dropzone: document.getElementById('dropzone'),
    fileInput: document.getElementById('imageUpload'),
    brandInput: document.getElementById('brandName'),
    taglineInput: document.getElementById('tagline'),
    ctaInput: document.getElementById('ctaText'),
    colorInput: document.getElementById('brandColor'),
    retailerSelect: document.getElementById('retailerSelect'),
    generateBtn: document.getElementById('generateBtn'),
    canvasArea: document.getElementById('canvasArea'),
    // Editor
    editorModal: document.getElementById('editorModal'),
    editModeLabel: document.getElementById('editModeLabel'),
    editorCanvasWrapper: document.getElementById('editorCanvasWrapper')
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initDropzone();
    initInputs();
});

function initInputs() {
    // Live Edit Listeners
    const inputs = [
        elements.brandInput,
        elements.taglineInput,
        elements.ctaInput,
        elements.colorInput,
        elements.retailerSelect
    ];

    inputs.forEach(input => {
        input.addEventListener('input', updateStateAndRefresh);
    });

    elements.generateBtn.addEventListener('click', startGenerationWorkflow);
}

function updateStateAndRefresh(e) {
    // Update State
    state.brandName = elements.brandInput.value;
    state.tagline = elements.taglineInput.value;
    state.cta = elements.ctaInput.value;
    state.colors.primary = elements.colorInput.value;
    state.retailer = elements.retailerSelect.value;

    // Valid image? Re-render immediately (Live Preview)
    if (state.imageSrc && !state.isProcessing && !state.editor.active) {
        // Skip loading animation, just draw
        requestAnimationFrame(() => renderResults());
    }
}

// --- Drag & Drop ---
function initDropzone() {
    const dz = elements.dropzone;

    dz.addEventListener('click', () => elements.fileInput.click());

    elements.fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

    dz.addEventListener('dragover', (e) => {
        e.preventDefault();
        dz.classList.add('dragover');
    });

    dz.addEventListener('dragleave', () => dz.classList.remove('dragover'));

    dz.addEventListener('drop', (e) => {
        e.preventDefault();
        dz.classList.remove('dragover');
        handleFile(e.dataTransfer.files[0]);
    });
}

function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;

    state.file = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        state.imageSrc = e.target.result;
        // Update Dropzone visual
        elements.dropzone.innerHTML = `
            <img src="${state.imageSrc}" style="max-height: 150px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--success); font-weight: 600;">✓ Image Loaded</p>
        `;
    };
    reader.readAsDataURL(file);
}

// --- AI Workflow Simulation ---
async function startGenerationWorkflow() {
    if (!state.imageSrc) {
        alert('Please upload a product image first.');
        return;
    }
    if (!state.brandName) {
        // Optional: warn or just use default
        if (!confirm('No brand name entered. Use "Brand" as default?')) return;
        state.brandName = 'Brand Name';
    }

    showLoader(true);

    // Step 1: Simulated Background Removal
    await updateLoaderText('AI: Analyzing object boundaries...', 800);
    await updateLoaderText('AI: Removing background...', 1200);

    // Step 2: Simulated Color Detection
    await updateLoaderText('AI: Extracting brand DNA...', 1000);
    detectDominantColor(state.imageSrc); // This is real(ish) logic

    // Step 3: Layout Generation
    await updateLoaderText('Engine: Composing retailer-ready assets...', 1000);

    renderResults();

    showLoader(false);
}

// Helper: Loader
function showLoader(show) {
    let loader = document.getElementById('app-loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'app-loader';
        loader.className = 'loader-overlay';
        loader.innerHTML = `
            <div class="spinner"></div>
            <div class="loading-text" id="loader-msg">Initializing AI...</div>
            <div class="loading-subtext">This uses browser-local processing.</div>
        `;
        document.body.appendChild(loader);
    }
    loader.style.display = show ? 'flex' : 'none';
}

function updateLoaderText(text, delayMs) {
    return new Promise(resolve => {
        const msg = document.getElementById('loader-msg');
        if (msg) msg.textContent = text;
        setTimeout(resolve, delayMs);
    });
}

// --- Logic: Color Detection ---
function detectDominantColor(imageSrc) {
    // We create an invisible canvas to sample the center pixel or average
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
        const cvs = document.createElement('canvas');
        const ctx = cvs.getContext('2d');
        cvs.width = 100;
        cvs.height = 100;
        ctx.drawImage(img, 0, 0, 100, 100);

        // Sample center
        const p = ctx.getImageData(50, 50, 1, 1).data;

        // If white/transparent, find first colorful pixel
        // A simple heuristic for demo:
        // Convert rgb to hex
        const hex = `#${((1 << 24) + (p[0] << 16) + (p[1] << 8) + p[2]).toString(16).slice(1)}`;
        state.colors.primary = hex;
        // Update Color Input UI
        elements.colorInput.value = hex;
        console.log('Detected Color:', hex);
    };
}

// --- Logic: Rendering Creatives ---
function renderResults() {
    const area = elements.canvasArea;
    area.innerHTML = ''; // Clear previous

    // Header
    const header = document.createElement('div');
    header.className = 'results-header';
    header.innerHTML = `
        <div>
            <h2>Generated Creatives</h2>
            <p>Optimized for ${state.retailer.charAt(0).toUpperCase() + state.retailer.slice(1)}</p>
        </div>
        <button class="btn btn-outline" onclick="alert('Batch download started!')">Download All (Zip)</button>
    `;
    area.appendChild(header);

    // Compliance Report (Simulated Dynamic Check)
    const complianceDiv = document.createElement('div');
    complianceDiv.style.marginBottom = '2rem';
    complianceDiv.style.padding = '1rem';
    complianceDiv.style.background = '#f0fdf4';
    complianceDiv.style.border = '1px solid #bbf7d0';
    complianceDiv.style.borderRadius = '8px';
    // Initial Loading State
    complianceDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; color: #166534;">
            <div class="spinner" style="width: 16px; height: 16px; border-width: 2px; margin: 0;"></div>
            <strong>AI Compliance Check Running...</strong>
        </div>
    `;
    area.appendChild(complianceDiv);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'creative-grid';
    area.appendChild(grid);

    // Define Templates/Sizes
    const templates = [
        { name: 'Instagram Story', width: 1080, height: 1920, label: '9:16 Story' },
        { name: 'Instagram Feed', width: 1080, height: 1080, label: '1:1 Square' },
        { name: 'Facebook Ad', width: 1080, height: 1350, label: '4:5 Feed' },
    ];

    templates.forEach(t => {
        const card = createCreativeCard(t);
        grid.appendChild(card);
    });

    // Simulate Check Completion
    setTimeout(() => {
        complianceDiv.innerHTML = `
            <h4 style="color: #166534; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Retailer Compliance Passed
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; color: #15803d; font-size: 0.9rem;">
                <span>✓ Product fully visible (No Crop)</span>
                <span>✓ Safe zones enforced</span>
                <span>✓ Text density < 20%</span>
                <span>✓ High contrast CTA</span>
            </div>
        `;
    }, 1200);
}

// --- Canvas Generation Logic ---
function createCreativeCard(template) {
    const card = document.createElement('div');
    card.className = 'creative-card';

    // 1. Create a unique Canvas for this creative
    const canvas = document.createElement('canvas');
    canvas.width = template.width;
    canvas.height = template.height;
    // Scale down for visual preview in CSS
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    canvas.style.display = 'block';

    // 2. Draw to Canvas
    // Pass custom config if any
    const config = state.customConfigs[template.label] || {};
    drawTemplate(canvas, template, config);

    // 3. Wrapper
    const preview = document.createElement('div');
    preview.className = 'card-preview';
    preview.appendChild(canvas);

    // 4. Footer info
    const footer = document.createElement('div');
    footer.className = 'card-footer';
    // Stringify template to pass safely
    const tmplStr = encodeURIComponent(JSON.stringify(template));

    // Initial Loading State for Card Footer
    footer.innerHTML = `
        <div class="card-info">
            <span class="size-tag">${template.label}</span>
            <span class="compliance-status compliance-tooltip" id="status-${template.label.replace(/\s/g, '')}">
                 <span class="spinner" style="width: 12px; height: 12px; border-width: 2px; border-color: #cbd5e1; border-top-color: #64748b; margin:0 display: inline-block;"></span>
                 <span style="color: var(--text-muted); font-weight: 500;">Verifying...</span>
            </span>
        </div>
        <div class="action-row">
            <button class="btn btn-primary btn-sm" onclick="downloadCanvas(this)" disabled>Download PNG</button>
            <button class="btn btn-outline btn-sm" onclick="openEditor(decodeURIComponent('${tmplStr}'))">Edit</button>
        </div>
    `;

    // Simulate individual card check
    setTimeout(() => {
        const statusEl = footer.querySelector('.compliance-status');
        const btn = footer.querySelector('.btn-primary');
        if (statusEl) {
            statusEl.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Retailer Approved
            `;
            statusEl.setAttribute('data-tooltip', "Safe margins, readable text, brand color contrast verified");
        }
        if (btn) btn.disabled = false;
    }, 800 + Math.random() * 800); // Random delay to feel authentic

    card.appendChild(preview);
    card.appendChild(footer);

    // Store canvas ref on button for download
    footer.querySelector('.btn-primary').canvasRef = canvas;

    return card;
}

// --- EDITOR FUNCTIONS ---

// NOTE: 'template' comes in as a string from the onclick, we need to handle it carefully
window.openEditor = function (templateStr) {
    let template;
    if (typeof templateStr === 'string') {
        template = JSON.parse(templateStr);
    } else {
        template = templateStr;
    }

    state.editor.active = true;
    state.editor.template = template;

    // Load existing config or defaults
    const currentConfig = state.customConfigs[template.label] || {
        brandAlign: 'center',
        ctaAlign: 'center',
        ctaStyle: 'pill',
        showTagline: true
    };
    state.editor.config = { ...currentConfig }; // Clone

    // Update UI controls to match state
    updateEditorControlsStart();

    // Show Modal
    elements.editorModal.style.display = 'flex';
    elements.editModeLabel.textContent = `— ${template.label}`;

    // Initial render
    updateEditorPreview();
};

window.closeEditor = function () {
    state.editor.active = false;
    elements.editorModal.style.display = 'none';
};

window.resetEditor = function () {
    // Restore defaults for this creative
    state.editor.config = {
        brandAlign: 'center',
        ctaAlign: 'center',
        ctaStyle: 'pill',
        showTagline: true
    };
    updateEditorControlsStart();
    updateEditorPreview();
};

window.updateConfig = function (key, value) {
    state.editor.config[key] = value;
    updateEditorControlsStart(); // Update active states of buttons
    updateEditorPreview();
};

window.saveEditor = function () {
    // Commit to customConfigs
    const label = state.editor.template.label;
    state.customConfigs[label] = { ...state.editor.config };

    closeEditor();

    // Simulate re-verification (refresh grid with check effect)
    renderResults();
};

function updateEditorControlsStart() {
    const cfg = state.editor.config;
    // Helper to toggle active class
    const setActive = (attr, val) => {
        document.querySelectorAll(`[data-${attr}]`).forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute(`data-${attr}`) === val);
        });
    };

    setActive('align', cfg.brandAlign);
    setActive('cta-layout', cfg.ctaAlign);

    const tog = document.getElementById('taglineToggle');
    if (tog) tog.checked = cfg.showTagline;
}

function updateEditorPreview() {
    // Clear wrapper but keep overlays
    // We actually want to replace the CANVAS inside wrapper
    const wrapper = elements.editorCanvasWrapper;
    // Remove old canvas if exists
    const oldCanvas = wrapper.querySelector('canvas');
    if (oldCanvas) oldCanvas.remove();

    const template = state.editor.template;
    const canvas = document.createElement('canvas');
    canvas.width = template.width;
    canvas.height = template.height;

    // Fit canvas in wrapper visually
    const aspect = template.width / template.height;
    if (aspect > 1) {
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
    } else {
        canvas.style.height = '400px';
        canvas.style.width = 'auto';
    }
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto';

    // Insert as first child so overlays stay on top
    wrapper.insertBefore(canvas, wrapper.firstChild);

    drawTemplate(canvas, template, state.editor.config);
}


// --- MAIN DRAWING LOGIC ---
// Added 'config' parameter with defaults
function drawTemplate(canvas, template, config = {}, callback) {
    // Defaults if undefined
    const brandAlign = config.brandAlign || 'center';
    const ctaAlign = config.ctaAlign || 'center';
    const ctaStyle = config.ctaStyle || 'pill';
    const showTagline = config.showTagline !== false; // default true

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Clear
    ctx.clearRect(0, 0, w, h);

    // --- 1. BACKGROUNDS (Minimal & Clean) ---
    const retailer = state.retailer;
    const primaryColor = state.colors.primary;

    if (retailer === 'amazon') {
        // Amazon: Pure White, Clean
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);

    } else if (retailer === 'meta') {
        // Meta: Soft, Elevated Gradient (Very subtle)
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, '#f9fafb');
        grad.addColorStop(1, '#f3f4f6');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Very subtle glow behind product center
        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = 0.05;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, w * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

    } else {
        // Flipkart/General: Soft Warmth, but minimal
        ctx.fillStyle = '#fffdf5'; // Very light cream
        ctx.fillRect(0, 0, w, h);

        // Extremely subtle burst (almost invisible pattern)
        ctx.save();
        ctx.translate(w / 2, h / 2);
        ctx.strokeStyle = '#fef3c7';
        ctx.lineWidth = 40; // thick soft lines
        ctx.globalAlpha = 0.4;
        for (let i = 0; i < 6; i++) {
            ctx.rotate(Math.PI / 3);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(w, 0);
            ctx.stroke();
        }
        ctx.restore();
        ctx.globalAlpha = 1.0;
    }

    // --- 2. IMAGE COMPOSITION (Hero Rule: Contain, No Crop) ---
    const img = new Image();
    img.src = state.imageSrc;

    const render = () => {
        // --- SAFE ZONES ---
        // Header Zone: Top 20% (Reserved for Brand)
        // Footer Zone: Bottom 25% (Reserved for CTA)

        const topZoneLimit = h * 0.20;
        const bottomZoneStart = h * 0.75;
        const productZoneHeight = bottomZoneStart - topZoneLimit;

        // Target: Occupy 40-60% of total canvas
        // Constraints: Padding 8-12% on sides
        const safePadding = w * 0.12;
        const maxImgW = w - (safePadding * 2);
        const maxImgH = productZoneHeight;

        // Calculate Scale to FIT (Contain)
        const imgAspect = img.width / img.height;
        let drawW = maxImgW;
        let drawH = drawW / imgAspect;

        if (drawH > maxImgH) {
            drawH = maxImgH;
            drawW = drawH * imgAspect;
        }

        // Center Horizontally
        let x = (w - drawW) / 2;

        // Center Vertically within Product Zone
        let y = topZoneLimit + (productZoneHeight - drawH) / 2;

        // Draw Shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 20;

        ctx.drawImage(img, x, y, drawW, drawH);

        // Reset Shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // --- 3. TYPOGRAPHY & CTA (Strict Hierarchy) ---
        renderStrictHierarchy(ctx, w, h, template, { brandAlign, ctaAlign, ctaStyle, showTagline });

        if (callback) callback(); // Notify that drawing is complete
    };

    if (img.complete) {
        render();
    } else {
        img.onload = render;
    }
}

function renderStrictHierarchy(ctx, w, h, template, config) {
    const brand = state.brandName.toUpperCase();
    const tagline = state.tagline || "Authorized Retailer";
    const cta = state.cta.toUpperCase() || "SHOP NOW";

    const retailer = state.retailer;

    // --- BRAND HEADER (Top Center) ---
    const brandY = h * 0.10; // Top 10%

    // Calculate X based on Alignment
    let brandX = w / 2;
    if (config.brandAlign === 'left') {
        brandX = w * 0.08; // Left padding
        ctx.textAlign = 'left';
    } else if (config.brandAlign === 'right') {
        brandX = w * 0.92; // Right padding
        ctx.textAlign = 'right';
    } else {
        ctx.textAlign = 'center';
    }

    // Brand Name
    ctx.fillStyle = '#1e293b'; // Slate 800 (Clean Dark)
    const brandSize = template.height > template.width ? w * 0.10 : w * 0.09;
    ctx.font = `800 ${brandSize}px Inter, sans-serif`;
    ctx.fillText(brand, brandX, brandY);

    // Tagline (Below Brand)
    if (config.showTagline) {
        const taglineSize = brandSize * 0.45;
        ctx.fillStyle = '#64748b'; // Slate 500 (Muted)
        ctx.font = `600 ${taglineSize}px Inter, sans-serif`;
        ctx.fillText(tagline, brandX, brandY + (brandSize * 0.8));
    }

    // --- CTA (Bottom Center) ---
    const ctaY = h * 0.88; // Bottom 12% from edge roughly

    const btnW = w * 0.5;
    const btnH = template.height > template.width ? 140 : w * 0.14;

    // CTA Alignment
    let btnX = (w - btnW) / 2;
    if (config.ctaAlign === 'left') {
        btnX = w * 0.08;
    } else if (config.ctaAlign === 'right') {
        btnX = w * 0.92 - btnW;
    }

    const btnTop = ctaY - (btnH / 2);

    // Shadows for Lift
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 5;

    // CTA Background
    ctx.fillStyle = state.colors.primary;
    if (state.colors.primary === '#ffffff' || state.colors.primary === '#f0fdf4') {
        ctx.fillStyle = '#000000'; // Fallback if brand color is too light
    }

    // Buttons Shape
    const radius = config.ctaStyle === 'pill' ? btnH / 2 : 12; // 12px for Rect
    roundRect(ctx, btnX, btnTop, btnW, btnH, radius);
    ctx.fill();

    // Reset Shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // CTA Text
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${btnH * 0.4}px Inter, sans-serif`;
    ctx.textAlign = 'center'; // Button text always centered inside button
    ctx.textBaseline = 'middle';
    ctx.fillText(cta, btnX + (btnW / 2), btnTop + btnH / 2);
    ctx.textBaseline = 'alphabetic'; // Reset
}

function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

// Global scope for onclick
window.downloadCanvas = function (btn) {
    const canvas = btn.canvasRef;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `creative-ad-${Date.now()}.jpg`; // Changed to JPG
    link.href = canvas.toDataURL('image/jpeg', 0.85); // Optimized for size
    link.click();
};
