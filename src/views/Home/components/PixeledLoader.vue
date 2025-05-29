<script setup lang="ts">
import { onMounted } from "vue";

const rand = (min: number, max: number): number => Math.random() * (max - min) + min;

class Pixel {
    x: number;
    y: number;
    color: string;
    speed: number;
    size: number = 0;
    sizeStep: number;
    minSize: number = 0.5;
    maxSizeAvailable: number;
    maxSize: number;
    sizeDirection: number = 1;
    delay: number;
    delayHide: number;
    counter: number = 0;
    counterHide: number = 0;
    counterStep: number;
    isHidden: boolean = false;
    isFlicking: boolean = false;

    constructor(x: number, y: number, color: string, speed: number, delay: number, delayHide: number, step: number, boundSize: number) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = rand(0.1, 0.9) * speed;
        this.sizeStep = rand(0, 0.5);
        this.maxSizeAvailable = boundSize || 2;
        this.maxSize = rand(this.minSize, this.maxSizeAvailable);
        this.delay = delay;
        this.delayHide = delayHide;
        this.counterStep = step;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const offset = this.maxSizeAvailable * 0.5 - this.size * 0.5;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size);
    }

    show() {
        this.isHidden = false;
        this.counterHide = 0;

        if (this.counter <= this.delay) {
            this.counter += this.counterStep;
            return;
        }

        if (this.size >= this.maxSize) {
            this.isFlicking = true;
        }

        this.isFlicking ? this.flicking() : (this.size += this.sizeStep);
    }

    hide() {
        this.counter = 0;
        if (this.counterHide <= this.delayHide) {
            this.counterHide += this.counterStep;
            if (this.isFlicking) this.flicking();
            return;
        }

        this.isFlicking = false;
        this.size = Math.max(0, this.size - 0.05);
        if (this.size === 0) this.isHidden = true;
    }

    flicking() {
        if (this.size >= this.maxSize) this.sizeDirection = -1;
        else if (this.size <= this.minSize) this.sizeDirection = 1;
        this.size += this.sizeDirection * this.speed;
    }
}

const usePixelAnimation = (container: HTMLElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    container.append(canvas);

    let width: number;
    let height: number;
    let pixels: Pixel[] = [];
    let ticker = 0;
    let animationDirection = 1;
    let requestId: number;
    let lastTime = 0;
    const interval = 1000 / 60;
    const maxTicker = 360;

    const getDelay = (x: number, y: number, direction = false) => {
        const dx = x - width * 0.5;
        const dy = direction ? y : y - height;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const createPixels = () => {
        const h = Math.floor(rand(0, 360));
        const colors = Array.from({ length: 5 }, (_, i) =>
            `hsl(${Math.floor(rand(h, h + (i + 1) * 10))} 100% ${rand(50, 100)}%)`
        );
        const gap = 6;
        const step = (width + height) * 0.005;
        const speed = rand(0.008, 0.25);
        const maxSize = Math.floor(gap * 0.5);
        const result: Pixel[] = [];

        for (let x = 0; x < width; x += gap) {
            for (let y = 0; y < height; y += gap) {
                if (x + maxSize > width || y + maxSize > height) continue;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const delay = getDelay(x, y);
                const delayHide = getDelay(x, y);
                result.push(new Pixel(x, y, color, speed, delay, delayHide, step, maxSize));
            }
        }
        pixels = result;
    };

    const animate = () => {
        requestId = requestAnimationFrame(animate);
        const now = performance.now();
        const diff = now - lastTime;
        if (diff < interval) return;
        lastTime = now - (diff % interval);

        ctx.clearRect(0, 0, width, height);
        if (ticker >= maxTicker) animationDirection = -1;
        else if (ticker <= 0) animationDirection = 1;

        let allHidden = true;
        pixels.forEach(pixel => {
            animationDirection > 0 ? pixel.show() : pixel.hide();
            if (!pixel.isHidden) allHidden = false;
            pixel.draw(ctx);
        });

        ticker += animationDirection;
        if (animationDirection < 0 && allHidden) ticker = 0;
    };

    const resize = () => {
        cancelAnimationFrame(requestId);
        const rect = container.getBoundingClientRect();
        width = Math.floor(rect.width);
        height = Math.floor(rect.height);
        canvas.width = width;
        canvas.height = height;
        createPixels();
        ticker = 0;
        animate();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    window.addEventListener("click", resize);

    resize();

    return () => {
        cancelAnimationFrame(requestId);
        resizeObserver.disconnect();
        window.removeEventListener("click", resize);
        canvas.remove();
    };
};

const createObserver = () => {
    const container = document.querySelector("#pixels-container") as HTMLElement;
    if (!container) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cleanup = usePixelAnimation(container);
                obs.disconnect();
            }
        });
    });
    observer.observe(container);
};

onMounted(() => {
    createObserver();
});

</script>

<template>
    <div id="pixels-container"></div>
</template>

<style lang="scss" scoped>
#pixels-container {
    width: 200px;
    height: 120px;
    position: absolute;
    bottom: 32vh;
    left: 50%;
    transform: translateX(-50%);

    :deep(canvas) {
        border-radius: 10px;
    }
}
</style>