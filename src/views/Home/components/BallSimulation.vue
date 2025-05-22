<template>
    <div class="p-ball-container">
        <div v-for="(ball, index) in balls" :key="index" class="ball" :style="{
            transform: `translate(${ball.x}px, ${ball.y}px)`,
            backgroundImage: `url(${imageURLs[index % imageURLs.length]})`,
        }" @mousedown="startDrag($event, ball)" @touchstart="startTouchDrag($event, ball)"></div>
    </div>

    <n-modal v-model:show="showModal">
        <n-card style="width: 600px" title="模态框" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <template #header-extra>
                噢！
            </template>
            内容
            <template #footer>
                尾部
            </template>
        </n-card>
    </n-modal>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue';

interface Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    isDragging: boolean;
    lastPositions: { x: number; y: number; time: number }[];
}

const BALL_COUNT = 4;
const RADIUS = 50; // 100px 宽高的一半
const GRAVITY = 0.5;
const FRICTION = 0.96;
const BOUNCE = 0.8;
const IMPACT_SCALE = 0.3;
const THROW_SCALE = 0.02;
const gravityX = ref(0);
const gravityY = ref(GRAVITY); // 初始向下


const imageURLs = [
    '/web/app.png',
    '/web/www.png',
    '/web/blog.png',
    '/web/rtc.png',
];

const balls = reactive<Ball[]>([]);
const showModal = ref(false);

function randomPosition() {
    return {
        x: Math.random() * (window.innerWidth - RADIUS * 2),
        y: Math.random() * (window.innerHeight - RADIUS * 2),
    };
}

function createBalls() {
    balls.length = 0;
    for (let i = 0; i < BALL_COUNT; i++) {
        const pos = randomPosition();
        balls.push({
            x: pos.x,
            y: pos.y,
            vx: 0,
            vy: 0,
            radius: RADIUS,
            isDragging: false,
            lastPositions: [],
        });
    }
}

function startDrag(e: MouseEvent, ball: Ball) {
    e.preventDefault();
    let isDragging = true;
    let dragMoved = false;
    const startX = e.clientX;
    const startY = e.clientY;
    const offsetX = e.clientX - ball.x;
    const offsetY = e.clientY - ball.y;
    const dragThreshold = 5;

    ball.isDragging = true;
    ball.lastPositions = [];

    function onMouseMove(e: MouseEvent) {
        if (!isDragging) return;

        const moveX = e.clientX - startX;
        const moveY = e.clientY - startY;
        if (!dragMoved && (Math.abs(moveX) > dragThreshold || Math.abs(moveY) > dragThreshold)) {
            dragMoved = true;
        }

        if (dragMoved) {
            ball.x = e.clientX - offsetX;
            ball.y = e.clientY - offsetY;

            ball.lastPositions.push({ x: ball.x, y: ball.y, time: Date.now() });
            if (ball.lastPositions.length > 5) {
                ball.lastPositions.shift();
            }
        }
    }

    function onMouseUp(e: MouseEvent) {
        if (!isDragging) return;
        isDragging = false;
        ball.isDragging = false;

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragMoved) {
            if (ball.lastPositions.length >= 2) {
                const first = ball.lastPositions[0];
                const last = ball.lastPositions[ball.lastPositions.length - 1];
                const dt = (last.time - first.time) / 1000 || 0.01;
                ball.vx = ((last.x - first.x) / dt) * THROW_SCALE;
                ball.vy = ((last.y - first.y) / dt) * THROW_SCALE;
            }
        } else {
            onClickHandler(ball, e);
        }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function startTouchDrag(e: TouchEvent, ball: Ball) {
    e.preventDefault();  // 仅用于 touchstart 中

    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    let isDragging = true;
    let dragMoved = false;
    const startX = touch.clientX;
    const startY = touch.clientY;
    const offsetX = touch.clientX - ball.x;
    const offsetY = touch.clientY - ball.y;
    const dragThreshold = 5;

    ball.isDragging = true;
    ball.lastPositions = [];

    function onTouchMove(e: TouchEvent) {
        if (!isDragging || e.touches.length !== 1) return;
        const moveTouch = e.touches[0];
        const moveX = moveTouch.clientX - startX;
        const moveY = moveTouch.clientY - startY;

        if (!dragMoved && (Math.abs(moveX) > dragThreshold || Math.abs(moveY) > dragThreshold)) {
            dragMoved = true;
        }

        if (dragMoved) {
            ball.x = moveTouch.clientX - offsetX;
            ball.y = moveTouch.clientY - offsetY;

            ball.lastPositions.push({ x: ball.x, y: ball.y, time: Date.now() });
            if (ball.lastPositions.length > 5) {
                ball.lastPositions.shift();
            }
        }
    }

    function onTouchEnd(e: TouchEvent) {
        if (!isDragging) return;
        isDragging = false;
        ball.isDragging = false;

        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
        document.removeEventListener('touchcancel', onTouchEnd);

        if (dragMoved) {
            if (ball.lastPositions.length >= 2) {
                const first = ball.lastPositions[0];
                const last = ball.lastPositions[ball.lastPositions.length - 1];
                const dt = (last.time - first.time) / 1000 || 0.01;
                ball.vx = ((last.x - first.x) / dt) * THROW_SCALE;
                ball.vy = ((last.y - first.y) / dt) * THROW_SCALE;
            }
        } else {
            onClickHandler(ball, e.changedTouches[0] as any);
        }
    }

    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
    document.addEventListener('touchcancel', onTouchEnd);
}

function onClickHandler(ball: Ball, e: MouseEvent) {
    showModal.value = true;
}

function resolveBallCollision(b1: Ball, b2: Ball) {
    const dx = b2.x - b1.x;
    const dy = b2.y - b1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = b1.radius * 2;

    if (dist < minDist && dist !== 0) {
        const overlap = (minDist - dist) / 2;
        const ux = dx / dist;
        const uy = dy / dist;

        b1.x -= ux * overlap;
        b1.y -= uy * overlap;
        b2.x += ux * overlap;
        b2.y += uy * overlap;

        const vxTotal = b1.vx - b2.vx;
        const vyTotal = b1.vy - b2.vy;

        b1.vx -= vxTotal * ux * IMPACT_SCALE;
        b1.vy -= vyTotal * uy * IMPACT_SCALE;
        b2.vx += vxTotal * ux * IMPACT_SCALE;
        b2.vy += vyTotal * uy * IMPACT_SCALE;
    }
}

function animate() {
    balls.forEach((ball) => {
        if (!ball.isDragging) {
            ball.vx += gravityX.value;
            ball.vy += gravityY.value;

            ball.x += ball.vx;
            ball.y += ball.vy;

            const maxX = window.innerWidth - ball.radius * 2;
            const maxY = window.innerHeight - ball.radius * 2;

            if (ball.x < 0) {
                ball.x = 0;
                ball.vx *= -FRICTION;
            } else if (ball.x > maxX) {
                ball.x = maxX;
                ball.vx *= -FRICTION;
            }

            if (ball.y < 0) {
                ball.y = 0;
                ball.vy *= -FRICTION;
            } else if (ball.y > maxY) {
                ball.y = maxY;
                ball.vy *= -BOUNCE;
            }

            ball.vx *= 0.99;
            ball.vy *= 0.99;
        }
    });

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            resolveBallCollision(balls[i], balls[j]);
        }
    }

    requestAnimationFrame(animate);
}

function onResize() {
    balls.forEach((ball) => {
        const maxX = window.innerWidth - ball.radius * 2;
        const maxY = window.innerHeight - ball.radius * 2;
        ball.x = Math.min(ball.x, maxX);
        ball.y = Math.min(ball.y, maxY);
    });
}

function handleDeviceOrientation(event: DeviceOrientationEvent) {
    if (event.beta == null || event.gamma == null) return;

    // gamma: 左右倾斜 [-90, 90] → 控制X方向
    // beta: 前后倾斜 [-180, 180] → 控制Y方向
    const maxTilt = 90;
    const scale = 0.2; // 可调整重力响应强度

    gravityX.value = (event.gamma! / maxTilt) * scale;
    gravityY.value = (event.beta! / maxTilt) * scale;
}

onMounted(() => {
    const gm = /Mobi|Android|iPhone/i.test(navigator.userAgent) && window.DeviceOrientationEvent
    createBalls();
    animate();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                window.addEventListener('resize', onResize);
                if (gm) {
                    window.addEventListener('deviceorientation', handleDeviceOrientation);
                }
            } else {
                window.removeEventListener('resize', onResize);
                if (gm) {
                    window.removeEventListener('deviceorientation', handleDeviceOrientation);
                }
            }
        });
    });
    observer.observe(document.querySelector('.p-ball-container')!);
})
</script>

<style lang="scss" scoped>
.ball {
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    cursor: grab;
    background-size: cover;
    background-position: center;
    box-shadow: inset -10px -10px 30px rgba(0, 0, 0, 0.3),
        inset 10px 10px 30px rgba(255, 255, 255, 0.2),
        0 5px 15px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s;
    user-select: none;
}

.ball:active {
    cursor: grabbing;
    box-shadow: inset -4px -4px 8px rgba(0, 0, 0, 0.3),
        inset 4px 4px 8px rgba(255, 255, 255, 0.1),
        0 3px 10px rgba(0, 0, 0, 0.2);
}
</style>
