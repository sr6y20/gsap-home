<template>
    <div class="p-ball-container">
        <div v-for="(ball, index) in balls" :key="index" class="ball" :style="{
            transform: `translate(${ball.x}px, ${ball.y}px)`, color: ballData[index].color
        }" @mousedown="startDrag($event, ball)" @touchstart="startTouchDrag($event, ball)">
            <div class="ball-text" :style="{
                transform: 'rotate(' + (ballRotate - 90) + 'deg)'
            }">
                {{ ballData[index].text }}
            </div>
        </div>
    </div>

    <n-modal v-model:show="showModal">
        <n-card style="width: 600px" title="PROJECT" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <template #header-extra>
                <div :style="{ color: ballData[dialogIndex].color }" class="ball-paper-title" title="点我跳转"
                    @click="wentUrl(ballData[dialogIndex].url)">{{ ballData[dialogIndex].text }}</div>
            </template>
            <img :src="ballData[dialogIndex].img" alt="" style="width: 100%">
            <div style="text-align: center;">{{ ballData[dialogIndex].content }}</div>
        </n-card>
    </n-modal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui'

interface Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    isDragging: boolean;
    lastPositions: { x: number; y: number; time: number }[];
    index: number;
    rotation: number;
}

const BALL_COUNT = 5;
const RADIUS = 50; // 100px 宽高的一半
const GRAVITY = 0.5;
const FRICTION = 0.96;
const BOUNCE = 0.8;
const IMPACT_SCALE = 0.3;
const THROW_SCALE = 0.02;
const gravityX = ref(0);
const gravityY = ref(GRAVITY);
const message = useMessage()
const dialogIndex = ref(0)

const ballRotate = ref(90);

const ballData = [
    {
        img: '/web/app.png',
        text: 'A',
        color: '#FF7043',
        url: 'https://app.sr6y20.cn',
        content: '桌面应用'
    }, {
        img: '/web/www.png',
        text: 'W',
        color: '#C0CA33',
        url: 'https://www.sr6y20.cn',
        content: '个人网站主页'
    }, {
        img: '/web/blog.png',
        text: 'B',
        color: '#4CAF50',
        url: 'https://blog.sr6y20.cn',
        content: '个人博客'
    }, {
        img: '/web/rtc.png',
        text: 'R',
        color: '#0288D1',
        url: 'https://rtc.sr6y20.cn',
        content: '实时通讯'
    }, {
        img: '/web/nav.png',
        text: 'N',
        color: '#CE3A6D',
        url: 'https://www.sr6y20.cn/nav',
        content: '起始页'
    }
]

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
            index: i,
            rotation: 0,
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
            onClickHandler(ball.index);
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
            onClickHandler(ball.index);
        }
    }

    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
    document.addEventListener('touchcancel', onTouchEnd);
}

function onClickHandler(index: number) {
    dialogIndex.value = index;
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

    const maxTilt = 90;
    const scale = 0.8;

    let gamma = event.gamma!;
    let beta = event.beta!;
    let x = 0;
    let y = 0;

    // 判断当前是横屏还是竖屏
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;

    if (isPortrait) {
        // 竖屏：gamma 控制 X，beta 控制 Y
        x = gamma;
        y = beta;
    } else {
        // 横屏：beta 控制 X，-gamma 控制 Y（适用于大多数浏览器）
        x = -beta;
        y = gamma;
    }

    gravityX.value = (x / maxTilt) * scale;
    gravityY.value = (y / maxTilt) * scale;

    // 更新所有球的旋转角度
    const angleDeg = Math.atan2(y, x) * (180 / Math.PI);
    ballRotate.value = angleDeg
}
const wentUrl = (url: string) => {
    window.open(url)
}
onMounted(() => {
    createBalls();
    animate();
    let firstObserver = true;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (firstObserver) {
                firstObserver = false;
                return;
            }
            if (entry.isIntersecting) {
                // message.success("Element is in view")
                window.addEventListener('resize', onResize);
                if (window.DeviceOrientationEvent) {
                    window.addEventListener('deviceorientation', handleDeviceOrientation);
                }
            } else {
                // message.success("Element is out of view")
                window.removeEventListener('resize', onResize);
                if (window.DeviceOrientationEvent) {
                    window.removeEventListener('deviceorientation', handleDeviceOrientation);
                }
            }
        });
    });
    observer.observe(document.querySelector('.p-ball-container')!);
})
</script>

<style lang="scss" scoped>
.p-ball-container {
    width: 100%;
    height: 100%;

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
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4em;
        font-weight: bold;
        font-family: PP Neue Corp Wide, sans-serif;

        &:active {
            cursor: grabbing;
            box-shadow: inset -4px -4px 8px rgba(0, 0, 0, 0.3),
                inset 4px 4px 8px rgba(255, 255, 255, 0.1),
                0 3px 10px rgba(0, 0, 0, 0.2);
        }
    }
}

.ball-paper-title {
    cursor: pointer;
    font-size: '20px';
    font-weight: 'bold';
    position: relative;
    animation: shakeX .8s infinite;
}

@keyframes shakeX {
    0% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-2px);
    }

    50% {
        transform: translateX(2px);
    }

    75% {
        transform: translateX(-2px);
    }

    100% {
        transform: translateX(0);

    }
}
</style>
