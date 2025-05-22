<script setup lang="ts">
import { onMounted, ref } from 'vue';

const carousel = ref<HTMLDivElement | null>(null);
const carouselContent = ref<HTMLDivElement | null>(null);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hasFinePointer = window.matchMedia('(pointer: fine)');

let isDragging = false;
let lastX: number | null = null;
let scrollDelta = 0;
let lastTimestamp = 0;
let touchCount = 0;

const carouselDuplicates = 3;

const techStack = [
    { name: 'HTML5', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'CSS3', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
    { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
    { name: 'Vue.js', url: 'https://vuejs.org/' },
    { name: 'React', url: 'https://react.dev/' },
    { name: 'Angular', url: 'https://angular.io/' },
    { name: 'Sass', url: 'https://sass-lang.com/' },
    { name: 'TailwindCSS', url: 'https://tailwindcss.com/' },
    { name: 'Webpack', url: 'https://webpack.js.org/' },
];

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

function getTouchMidpoint(touches: TouchList) {
    let midpoint = {
        x: touches[0].clientX,
        y: touches[0].clientY,
    };

    for (let i = 1; i < touches.length; i++) {
        midpoint.x = lerp(midpoint.x, touches[i].clientX, 0.5);
        midpoint.y = lerp(midpoint.y, touches[i].clientY, 0.5);
    }

    return midpoint;
}

function updateScroll(timestamp: number) {
    const deltaTime = timestamp - lastTimestamp;
    if (carousel.value) {
        carousel.value.scrollBy({ left: scrollDelta });
    }

    if (!isDragging && touchCount === 0 && !prefersReducedMotion.matches) {
        scrollDelta = lerp(scrollDelta, 0, 0.075);
    } else {
        scrollDelta = 0;
    }

    lastTimestamp = timestamp;
    requestAnimationFrame(updateScroll);
}

onMounted(() => {
    if (!carousel.value || !carouselContent.value) return;

    for (let i = 0; i < carouselDuplicates; i++) {
        const clone = carouselContent.value.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('a').forEach((el) => el.setAttribute('tabindex', '-1'));
        carousel.value.prepend(clone);
        carousel.value.append(clone.cloneNode(true));
    }

    carousel.value.scrollLeft += carouselContent.value.offsetWidth * carouselDuplicates;

    carousel.value.addEventListener('mousedown', (e) => {
        isDragging = true;
        lastX = e.clientX;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        lastX = null;
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging && lastX !== null) {
            scrollDelta = lastX - e.clientX;
            lastX = e.clientX;
        }
    });

    carousel.value.addEventListener('touchstart', (e) => {
        if (lastX === null) {
            lastX = getTouchMidpoint(e.touches).x;
        }
        touchCount += e.changedTouches.length;
    });

    window.addEventListener('touchmove', (e) => {
        if (lastX !== null) {
            const mid = getTouchMidpoint(e.touches);
            scrollDelta = -(mid.x - lastX);
            lastX = mid.x;
        }
    });

    const handleTouchRemove = (e: TouchEvent) => {
        touchCount -= e.changedTouches.length;
        if (touchCount <= 0 && !isDragging) {
            lastX = null;
        }
    };

    window.addEventListener('touchend', handleTouchRemove);
    window.addEventListener('touchcancel', handleTouchRemove);

    carousel.value.addEventListener('wheel', (e) => {
        if (hasFinePointer.matches && e.shiftKey) {
            e.preventDefault();
            const scrollMultiplier = prefersReducedMotion.matches ? 2 : 0.1;
            scrollDelta += e.deltaY * scrollMultiplier;
        }
    });

    carousel.value.addEventListener('scroll', () => {
        if (!carousel.value || !carouselContent.value) return;

        const rect = carouselContent.value.getBoundingClientRect();
        if (rect.right < 0) {
            carousel.value.scrollLeft -= carouselContent.value.offsetWidth;
        } else if (rect.left > window.innerWidth) {
            carousel.value.scrollLeft += carouselContent.value.offsetWidth;
        }
    });

    requestAnimationFrame(updateScroll);
});
</script>

<template>
    <div class="carousel" ref="carousel">
        <div class="carousel-content" ref="carouselContent">
            <div class="card" v-for="tech in techStack" :key="tech.name">
                <img class="icon"
                    :src="`https://simpleicons.org/icons/${tech.name.toLowerCase().replace(/\.js/g, '').replace(/\+/g, 'plus').replace(/\.|css/g, '').replace(/\s+/g, '')}.svg`"
                    alt="" />
                <p>{{ tech.name }}</p>
                <p><a :href="tech.url" target="_blank">More Info ➞</a></p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap");

:root {
    --bg-primary-color: #eee;
    --bg-secondary-color: #ddd;
    --card-color: #fff;
    --card-border-color: #aaa;
    --card-hover-border-color: #fa0;
    --card-hover-glow-color: #fa07;
    --card-shadow-color: #0002;
    --link-color: #f80;
    --link-visited-color: #e70;
    --link-hover-color: #fb7;
    --link-focus-color: #fa4;
    --footer-text-color: #aaa;
}

p {
    margin: 12px 0;
}

a {
    color: var(--link-color);
    font-weight: bold;
    transition: color 0.15s;
}

a:visited {
    color: var(--link-visited-color);
}

a:focus {
    color: var(--link-focus-color);
    outline: none;
}

a:hover {
    color: var(--link-hover-color);
}

a:active {
    color: var(--link-visited-color);
}

.carousel {
    display: flex;
    gap: 1rem;
    box-sizing: border-box;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 1rem;
    font-family: "Quicksand", sans-serif;
    /* Hide the overflow so we can program scrolling. */
    overflow-x: hidden;
    mask-image: linear-gradient(90deg,
            #0000 0% 1%,
            #0004 1% 2%,
            #000b 2% 4%,
            #000 4% 96%,
            #000b 96% 98%,
            #0004 98% 99%,
            #0000 99% 100%);
}

.carousel:focus {
    /* Get rid of a random focus outline. */
    outline: none;
}

.carousel:hover {
    cursor: grab;
}

.carousel:active {
    cursor: grabbing;
}

.carousel-content {
    display: flex;
    gap: 1rem;
}

.card {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 270px;
    background-color: var(--card-color);
    border: 2px solid var(--card-border-color);
    border-radius: 1rem;
    box-shadow: 0 2px 0 2px var(--card-shadow-color), 0 0 0 3px #0000;
    font-size: 1.5rem;
    text-align: center;
    -webkit-user-select: none;
    user-select: none;
    transition: border 0.667s, box-shadow 0.333s;
}

.card:hover,
.card:focus-within {
    border: 2px solid var(--card-hover-border-color);
    box-shadow: 2px 4px 0 #0000, 0 0 0 6px var(--card-hover-glow-color);
}

.icon {
    display: block;
    height: 120px;
    pointer-events: none;
}
</style>