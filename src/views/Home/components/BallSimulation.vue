<template>
  <div ref="containerRef" class="p-ball-container">
    <div
      v-for="(ball, index) in balls"
      :key="index"
      class="ball"
      :style="{
        transform: `translate3d(${ball.x}px, ${ball.y}px, 0)`,
        color: ballData[index].color
      }"
      @mousedown="startDrag($event, ball)"
      @touchstart="startTouchDrag($event, ball)"
    >
      <div
        class="ball-text"
        :style="{
          transform: 'rotate(' + (ballRotate - 90) + 'deg)'
        }"
      >
        {{ ballData[index].text }}
      </div>
    </div>
  </div>

  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="PROJECT"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <div
          :style="{ color: ballData[dialogIndex].color }"
          class="ball-paper-title"
          title="点我跳转"
          @click="wentUrl(ballData[dialogIndex].url)"
        >
          {{ ballData[dialogIndex].text }}
        </div>
      </template>
      <img :src="ballData[dialogIndex].img" alt="" style="width: 100%" />
      <div style="text-align: center">{{ ballData[dialogIndex].content }}</div>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef, triggerRef } from 'vue'

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  isDragging: boolean
  lastPositions: { x: number; y: number; time: number }[]
  index: number
  rotation: number
}

const BALL_COUNT = 5
const RADIUS = 50
const GRAVITY = 0.5
const FRICTION = 0.9
const BOUNCE = 0.7
const AIR_RESISTANCE = 0.98
const GROUND_FRICTION = 0.96
const THROW_SCALE = 0.02
const gravityX = ref(0)
const gravityY = ref(GRAVITY)
const dialogIndex = ref(0)
const containerRef = ref<HTMLElement | null>(null)
const animationId = ref(0)
let observer: IntersectionObserver | null = null

const ballRotate = ref(90)

const ballData = [
  {
    img: '/web/app.png',
    text: 'A',
    color: '#FF7043',
    url: 'https://app.sr6y20.cn',
    content: '桌面应用'
  },
  {
    img: '/web/www.png',
    text: 'W',
    color: '#C0CA33',
    url: 'https://www.sr6y20.cn',
    content: '个人网站主页'
  },
  {
    img: '/web/blog.png',
    text: 'B',
    color: '#4CAF50',
    url: 'https://blog.sr6y20.cn',
    content: '个人博客'
  },
  {
    img: '/web/rtc.png',
    text: 'R',
    color: '#0288D1',
    url: 'https://rtc.sr6y20.cn',
    content: '实时通讯'
  },
  {
    img: '/web/nav.png',
    text: 'N',
    color: '#CE3A6D',
    url: 'https://www.sr6y20.cn/nav',
    content: '起始页'
  }
]

const showModal = ref(false)

const balls = shallowRef<Ball[]>([])

const getContainerSize = () => {
  if (!containerRef.value) return { width: window.innerWidth, height: window.innerHeight }
  return {
    width: containerRef.value.clientWidth,
    height: containerRef.value.clientHeight
  }
}

const randomPosition = () => {
  const { width, height } = getContainerSize()
  return {
    x: Math.random() * (width - RADIUS * 2),
    y: Math.random() * (height - RADIUS * 2)
  }
}

const createBalls = () => {
  const newBalls: Ball[] = []
  for (let i = 0; i < BALL_COUNT; i++) {
    const pos = randomPosition()
    newBalls.push({
      x: pos.x,
      y: pos.y,
      vx: 0,
      vy: 0,
      radius: RADIUS,
      isDragging: false,
      lastPositions: [],
      index: i,
      rotation: 0
    })
  }
  balls.value = newBalls
}

const startDrag = (e: MouseEvent, ball: Ball) => {
  e.preventDefault()
  let isDragging = true
  let dragMoved = false
  const startX = e.clientX
  const startY = e.clientY
  const offsetX = e.clientX - ball.x
  const offsetY = e.clientY - ball.y
  const dragThreshold = 5

  ball.isDragging = true
  ball.lastPositions = []

  function onMouseMove(e: MouseEvent) {
    if (!isDragging) return
    const moveX = e.clientX - startX
    const moveY = e.clientY - startY
    if (!dragMoved && (Math.abs(moveX) > dragThreshold || Math.abs(moveY) > dragThreshold)) {
      dragMoved = true
    }

    if (dragMoved) {
      ball.x = e.clientX - offsetX
      ball.y = e.clientY - offsetY
      ball.lastPositions.push({ x: ball.x, y: ball.y, time: Date.now() })
      if (ball.lastPositions.length > 5) {
        ball.lastPositions.shift()
      }
    }
  }

  function onMouseUp() {
    if (!isDragging) return
    isDragging = false
    ball.isDragging = false

    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)

    if (dragMoved && ball.lastPositions.length >= 2) {
      const first = ball.lastPositions[0]
      const last = ball.lastPositions[ball.lastPositions.length - 1]
      const dt = (last.time - first.time) / 1000 || 0.01
      ball.vx = ((last.x - first.x) / dt) * THROW_SCALE
      ball.vy = ((last.y - first.y) / dt) * THROW_SCALE
    } else {
      onClickHandler(ball.index)
    }
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const startTouchDrag = (e: TouchEvent, ball: Ball) => {
  e.preventDefault()
  if (e.touches.length !== 1) return
  const touch = e.touches[0]
  let isDragging = true
  let dragMoved = false
  const startX = touch.clientX
  const startY = touch.clientY
  const offsetX = touch.clientX - ball.x
  const offsetY = touch.clientY - ball.y
  const dragThreshold = 5

  ball.isDragging = true
  ball.lastPositions = []

  function onTouchMove(e: TouchEvent) {
    if (!isDragging || e.touches.length !== 1) return
    const moveTouch = e.touches[0]
    const moveX = moveTouch.clientX - startX
    const moveY = moveTouch.clientY - startY

    if (!dragMoved && (Math.abs(moveX) > dragThreshold || Math.abs(moveY) > dragThreshold)) {
      dragMoved = true
    }

    if (dragMoved) {
      ball.x = moveTouch.clientX - offsetX
      ball.y = moveTouch.clientY - offsetY
      ball.lastPositions.push({ x: ball.x, y: ball.y, time: Date.now() })
      if (ball.lastPositions.length > 5) {
        ball.lastPositions.shift()
      }
    }
  }

  function onTouchEnd() {
    if (!isDragging) return
    isDragging = false
    ball.isDragging = false

    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchend', onTouchEnd)
    document.removeEventListener('touchcancel', onTouchEnd)

    if (dragMoved && ball.lastPositions.length >= 2) {
      const first = ball.lastPositions[0]
      const last = ball.lastPositions[ball.lastPositions.length - 1]
      const dt = (last.time - first.time) / 1000 || 0.01
      ball.vx = ((last.x - first.x) / dt) * THROW_SCALE
      ball.vy = ((last.y - first.y) / dt) * THROW_SCALE
    } else {
      onClickHandler(ball.index)
    }
  }

  document.addEventListener('touchmove', onTouchMove, { passive: false })
  document.addEventListener('touchend', onTouchEnd)
  document.addEventListener('touchcancel', onTouchEnd)
}

const onClickHandler = (index: number) => {
  dialogIndex.value = index
  showModal.value = true
}

const resolveBallCollision = (b1: Ball, b2: Ball) => {
  const dx = b2.x - b1.x
  const dy = b2.y - b1.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  const minDist = b1.radius + b2.radius

  if (dist < minDist && dist > 0) {
    const overlap = 0.5 * (minDist - dist)
    const nx = dx / dist
    const ny = dy / dist

    b1.x -= overlap * nx
    b1.y -= overlap * ny
    b2.x += overlap * nx
    b2.y += overlap * ny

    const tx = -ny
    const ty = nx

    const dpTan1 = b1.vx * tx + b1.vy * ty
    const dpTan2 = b2.vx * tx + b2.vy * ty

    const dpNorm1 = b1.vx * nx + b1.vy * ny
    const dpNorm2 = b2.vx * nx + b2.vy * ny

    const m1 = dpNorm2
    const m2 = dpNorm1

    b1.vx = tx * dpTan1 + nx * m1
    b1.vy = ty * dpTan1 + ny * m1
    b2.vx = tx * dpTan2 + nx * m2
    b2.vy = ty * dpTan2 + ny * m2
  }
}

const animate = () => {
  const { width, height } = getContainerSize()
  const ballList = balls.value
  ballList.forEach((ball) => {
    if (!ball.isDragging) {
      ball.vx += gravityX.value
      ball.vy += gravityY.value

      ball.x += ball.vx
      ball.y += ball.vy

      const maxX = width - ball.radius * 2
      const maxY = height - ball.radius * 2

      if (ball.x < 0) {
        ball.x = 0
        ball.vx *= -FRICTION
      } else if (ball.x > maxX) {
        ball.x = maxX
        ball.vx *= -FRICTION
      }

      if (ball.y < 0) {
        ball.y = 0
        ball.vy *= -FRICTION
      } else if (ball.y > maxY) {
        ball.y = maxY

        if (Math.abs(ball.vy) < 1) {
          ball.vy = 0
        } else {
          ball.vy *= -BOUNCE
        }

        ball.vx *= GROUND_FRICTION

        if (Math.abs(ball.vx) < 0.05) {
          ball.vx = 0
        }
      }

      ball.vx *= AIR_RESISTANCE
      ball.vy *= AIR_RESISTANCE
    }
  })

  for (let i = 0; i < ballList.length; i++) {
    for (let j = i + 1; j < ballList.length; j++) {
      resolveBallCollision(ballList[i], ballList[j])
    }
  }

  triggerRef(balls)
  animationId.value = requestAnimationFrame(animate)
}

const onResize = () => {
  const { width, height } = getContainerSize()
  balls.value.forEach((ball) => {
    const maxX = width - ball.radius * 2
    const maxY = height - ball.radius * 2
    ball.x = Math.min(ball.x, maxX)
    ball.y = Math.min(ball.y, maxY)
  })
  triggerRef(balls)
}

const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
  if (event.beta == null || event.gamma == null) return

  const maxTilt = 90
  const scale = 0.8

  let gamma = event.gamma!
  let beta = event.beta!
  let x = 0
  let y = 0

  // 判断当前是横屏还是竖屏
  const isPortrait = window.matchMedia('(orientation: portrait)').matches

  if (isPortrait) {
    // 竖屏：gamma 控制 X，beta 控制 Y
    x = gamma
    y = beta
  } else {
    // 横屏：beta 控制 X，-gamma 控制 Y（适用于大多数浏览器）
    x = -beta
    y = gamma
  }

  gravityX.value = (x / maxTilt) * scale
  gravityY.value = (y / maxTilt) * scale

  // 更新所有球的旋转角度
  const angleDeg = Math.atan2(y, x) * (180 / Math.PI)
  ballRotate.value = angleDeg
}
const wentUrl = (url: string) => {
  window.open(url)
}
const onIntersect = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      window.addEventListener('resize', onResize)
      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', handleDeviceOrientation)
      }
    } else {
      window.removeEventListener('resize', onResize)
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation)
      }
    }
  })
}

onMounted(() => {
  createBalls()
  animationId.value = requestAnimationFrame(animate)
  observer = new IntersectionObserver(onIntersect)
  if (containerRef.value) {
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animationId.value)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('deviceorientation', handleDeviceOrientation)
  observer?.disconnect()
  observer = null
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
    background-repeat: no-repeat;

    box-shadow:
      inset -8px -8px 20px rgba(255, 255, 255, 0.3),
      inset 8px 8px 20px rgba(0, 0, 0, 0.2),
      0 8px 20px rgba(0, 0, 0, 0.25),
      0 4px 6px rgba(0, 0, 0, 0.1);

    transition: box-shadow 0.3s ease;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 4em;
    font-weight: bold;
    font-family: 'PP Neue Corp Wide', sans-serif;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

    will-change: transform;
    backdrop-filter: blur(4px);

    &:hover {
      transform: scale(1.05);
      box-shadow:
        inset -6px -6px 16px rgba(255, 255, 255, 0.25),
        inset 6px 6px 16px rgba(0, 0, 0, 0.2),
        0 10px 25px rgba(0, 0, 0, 0.3),
        0 5px 8px rgba(0, 0, 0, 0.1);
    }

    &:active {
      cursor: grabbing;
      transform: scale(0.97);
      box-shadow:
        inset -4px -4px 8px rgba(0, 0, 0, 0.3),
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
  animation: shakeX 0.8s infinite;
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
