class ZoomController {
    constructor() {
        this.zoomLevel = 1;
        this.minZoom = 0.5;
        this.maxZoom = 2;
        this.step = 0.1;
        
        this.createControls();
        this.bindEvents();
    }

    createControls() {
        const controls = document.createElement('div');
        controls.className = 'zoom-controls';
        
        const zoomOutBtn = document.createElement('button');
        zoomOutBtn.className = 'zoom-button zoom-out';
        zoomOutBtn.textContent = '−';
        
        const zoomLevel = document.createElement('span');
        zoomLevel.className = 'zoom-level';
        zoomLevel.textContent = '100%';
        
        const zoomInBtn = document.createElement('button');
        zoomInBtn.className = 'zoom-button zoom-in';
        zoomInBtn.textContent = '+';
        
        controls.appendChild(zoomOutBtn);
        controls.appendChild(zoomLevel);
        controls.appendChild(zoomInBtn);
        
        document.body.appendChild(controls);
        
        this.zoomLevel = zoomLevel;
        this.zoomInBtn = zoomInBtn;
        this.zoomOutBtn = zoomOutBtn;
    }

    bindEvents() {
        this.zoomInBtn.addEventListener('click', () => this.zoom(1));
        this.zoomOutBtn.addEventListener('click', () => this.zoom(-1));
        
        // キーボードショートカット
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === '=' || e.key === '+') {
                    e.preventDefault();
                    this.zoom(1);
                } else if (e.key === '-') {
                    e.preventDefault();
                    this.zoom(-1);
                }
            }
        });
    }

    zoom(direction) {
        const currentZoom = parseFloat(getComputedStyle(document.documentElement)
            .getPropertyValue('--zoom-level'));
        let newZoom = currentZoom + (direction * this.step);
        
        newZoom = Math.min(Math.max(newZoom, this.minZoom), this.maxZoom);
        
        document.documentElement.style.setProperty('--zoom-level', newZoom);
        this.zoomLevel.textContent = `${Math.round(newZoom * 100)}%`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ZoomController();
}); 