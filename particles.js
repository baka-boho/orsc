/**
 * ORSC Website - Animated Background Particles
 * Floating math symbols and dots animation for hero section
 */

class ParticleSystem {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mathSymbols = [
            'x','∑','∫','≤','≥','∞','∇','λ','μ','σ','π','∂','≈','≠','+','√',
            'α','β','γ','θ','Δ','Ω','φ','ψ','χ','ω','ε','δ','κ','ζ','η','ι',
            'τ','ρ','Γ','Θ','Λ','Π','Φ','Ψ',
            '→','←','⇒','⇔',
            '∈','∉','∅','∩','∪','⊂','⊆','∖',
            '∀','∃','∴','∏',
            '⊥','∧','¬','≅','∝','∠'
        ];
        this.animationId = null;
        this.mouse = { x: null, y: null };
        this.init();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        
        // Find slogan section and prepend canvas
        const sloganSection = document.querySelector('section.slogan');
        if (sloganSection) {
            sloganSection.insertBefore(this.canvas, sloganSection.firstChild);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            this.createParticles();
            this.animate();
            
            // Handle window resize
            window.addEventListener('resize', () => this.resize());
            
            // Track mouse position
            sloganSection.addEventListener('mousemove', (e) => {
                const rect = sloganSection.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });
            
            // Reset mouse position when leaving section
            sloganSection.addEventListener('mouseleave', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }
    }

    resize() {
        const sloganSection = document.querySelector('section.slogan');
        if (sloganSection) {
            this.canvas.width = sloganSection.offsetWidth;
            this.canvas.height = sloganSection.offsetHeight;
        }
    }

    createParticles() {
        // Fixed particle count for optimal performance
        const dotCount = 0;
        const symbolCount = 20;
        
        // Create dot particles
        for (let i = 0; i < dotCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 3,
                speedX: (Math.random() - 0.4) * 0.6 +0.1,
                speedY: (Math.random() - 0.4) * 0.6 +0.1,
                opacity: Math.random() * 0.3 + 0.1,
                type: 'dot',
                color: this.getRandomColor()
            });
        }
        
        // Create math symbol particles
        for (let i = 0; i < symbolCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 30 + 30,
                speedX: (Math.random() - 0.5) * 0.6 + 0.1,
                speedY: (Math.random() - 0.5) * 0.6 + 0.1,
                opacity: Math.random() * 0.15 + 0.10,
                type: 'symbol',
                // symbol: this.mathSymbols[Math.floor(Math.random() * this.mathSymbols.length)],
                symbol: this.mathSymbols[i],
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(20, 172, 183, ', // Primary cyan
            'rgba(255, 255, 255, ', // white
            'rgba(245, 158, 11, ',  // Secondary orange/yellow
            'rgba(59, 130, 246, ',  // Blue
            'rgba(139, 92, 246, '   // Purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Apply mouse repulsion
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const repulsionRadius = 150;
                
                if (distance < repulsionRadius) {
                    const force = (repulsionRadius - distance) / repulsionRadius;
                    const angle = Math.atan2(dy, dx);
                    const repulsionStrength = particle.type === 'dot' ? 3 : 2;
                    
                    particle.x += Math.cos(angle) * force * repulsionStrength;
                    particle.y += Math.sin(angle) * force * repulsionStrength;
                }
            }
            
            // Move particle
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < -50) particle.x = this.canvas.width + 50;
            if (particle.x > this.canvas.width + 50) particle.x = -50;
            if (particle.y < -50) particle.y = this.canvas.height + 50;
            if (particle.y > this.canvas.height + 50) particle.y = -50;
            
            // Draw particle
            if (particle.type === 'dot') {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = particle.color + particle.opacity + ')';
                this.ctx.fill();
            } else if (particle.type === 'symbol') {
                // Update rotation
                particle.rotation += particle.rotationSpeed;
                
                this.ctx.save();
                this.ctx.translate(particle.x, particle.y);
                this.ctx.rotate(particle.rotation);
                this.ctx.font = `${particle.size}px "Computer Modern", "Latin Modern Math", serif`;
                this.ctx.fillStyle = particle.color + particle.opacity + ')';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                
                // Add slight blur to symbols
                this.ctx.filter = 'blur(1px)';
                this.ctx.fillText(particle.symbol, 0, 0);
                this.ctx.filter = 'none';
                
                this.ctx.restore();
            }
        });
        
        // Draw connections between nearby dots
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        const maxDistance = 120;
        const dots = this.particles.filter(p => p.type === 'dot');
        
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                const dx = dots[i].x - dots[j].x;
                const dy = dots[i].y - dots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.15;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(20, 172, 183, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(dots[i].x, dots[i].y);
                    this.ctx.lineTo(dots[j].x, dots[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        window.removeEventListener('resize', () => this.resize());
    }
}

// Initialize particle system when idle to avoid blocking main thread
const initParticles = () => {
    // Use requestIdleCallback for non-critical initialization
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            new ParticleSystem();
        }, { timeout: 2000 });
    } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
            new ParticleSystem();
        }, 1000);
    }
};

// Wait for page to be interactive
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
} else {
    initParticles();
}
