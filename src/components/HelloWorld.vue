<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import html2canvas from 'html2canvas';
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from "vue";
import '../assets/three.min.js';
import '../assets/vanta.fog.min.js';
import '../assets/imagesloaded.pkgd.min.js';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

const rx = window.innerWidth < 1000 ? window.innerWidth / 1200 : 1
const ry = window.innerHeight < 700 ? window.innerHeight / 1200 : 1

const path = [
  // 1
  { x: 800, y: 200 },
  { x: 900, y: 20 },
  { x: 1100, y: 100 },
  // 2
  { x: 1000, y: 200 },
  { x: 900, y: 20 },
  { x: 10, y: 500 },
  // 3
  { x: 100, y: 300 },
  { x: 500, y: 400 },
  { x: 1000, y: 200 },
  // 4
  { x: 1100, y: 300 },
  { x: 400, y: 400 },
  { x: 200, y: 250 },
  // 5
  { x: 100, y: 300 },
  { x: 500, y: 450 },
  { x: 1100, y: 500 }
]

const scaledPath = path.map(({ x, y }) => {
  return {
    x: x * rx,
    y: y * ry
  }
})


const fish = useTemplateRef('fish');
const fishPathInit = () => {
  // 鱼儿游动轨迹
  const tl = gsap.timeline({
    scrollTrigger: {
      scrub: 1.5,
    },
  })
  tl.to(fish.value, {
    motionPath: {
      path: scaledPath,
      align: 'self',
      alignOrigin: [0.5, 0.5],
      autoRotate: true
    },
    duration: 10,
    immediateRender: true,
  })
  tl.to(fish.value, {
    rotateX: 180
  }, 1)
  tl.to(fish.value, {
    rotateX: 0
  }, 2.5)
  tl.to(fish.value, {
    z: -500,
    duration: 2,
  }, 2.5)
  tl.to(fish.value, {
    rotateX: 180
  }, 4)
  tl.to(fish.value, {
    rotateX: 0
  }, 5.5)
  tl.to(fish.value, {
    z: -50,
    duration: 2,
  }, 5)
  tl.to(fish.value, {
    rotate: 0,
    duration: 1,
  }, '-=1')
}

let lastScrollTop = 0;
let directionChanged = '';
function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';

  if (scrollDirection !== directionChanged) {
    directionChanged = scrollDirection;
    // 在这里执行你的函数
    if (scrollDirection === 'down') {
      gsap.to(fish.value, { rotationY: 0, duration: 0.4 })
    } else {
      gsap.to(fish.value, { rotationY: 180, duration: 0.4 })
    }
    // 重置标志，以便在方向再次改变时可以再次执行
    directionChanged = '';
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 对于顶部边界的情况进行修正
}

declare let VANTA: any;
function vantaInit() {
  VANTA.FOG({
    el: ".vanta-bg",
    mouseControls: false,
    touchControls: false,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    highlightColor: 0x96ff,
    midtoneColor: 0xc2ff,
    lowlightColor: 0x7b67e8,
    baseColor: 0x3c4af5
  })
}

declare let imagesLoaded: any;
// 首屏内容
const headScreen = () => {
  return new Promise((resolve, reject) => {
    // 先处理 .description 的停留
    gsap.to(".description", {
      scrollTrigger: {
        trigger: ".description",
        start: "top top", // 从页面顶部开始
        end: "+=2000",    // 占据 2000px 的滚动距离
        pin: true,        // 固定 .description
        scrub: 0.5        // 可选的平滑过渡
      }
    });

    // 封面消失
    const COUNT = 75;
    const REPEAT_COUNT = 3;

    const capture = document.querySelector("#capture") as HTMLElement;

    function createCanvases(captureEl: HTMLElement) {
      html2canvas(captureEl).then((canvas) => {
        const width = canvas.width;
        const height = canvas.height;
        const ctx = canvas.getContext("2d");
        const imageData = ctx!.getImageData(0, 0, width, height);

        let dataList = [];
        captureEl.style.display = "none";

        for (let i = 0; i < COUNT; i++) {
          dataList.push(ctx!.createImageData(width, height));
        }

        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            for (let l = 0; l < REPEAT_COUNT; l++) {
              const index = (x + y * width) * 4;
              const dataIndex = Math.floor(
                (COUNT * (Math.random() + (2 * x) / width)) / 3
              );
              for (let p = 0; p < 4; p++) {
                dataList[dataIndex].data[index + p] = imageData.data[index + p];
              }
            }
          }
        }

        dataList.forEach((data, i) => {
          let clonedCanvas = canvas.cloneNode() as HTMLCanvasElement;
          clonedCanvas.getContext("2d")!.putImageData(data, 0, 0);
          clonedCanvas.className = "capture-canvas";
          document.querySelector(".description")!.appendChild(clonedCanvas);

          const randomAngle = (Math.random() - 0.5) * 2 * Math.PI;
          const randomRotationAngle = 30 * (Math.random() - 0.5);

          let tl = gsap.timeline({
            scrollTrigger: {
              scrub: 1,
              start: () => 0,
              end: () => window.innerHeight * 2
            }
          });

          tl.to(clonedCanvas, {
            duration: 1,
            rotate: randomRotationAngle,
            translateX: 40 * Math.sin(randomAngle),
            translateY: 40 * Math.cos(randomAngle),
            opacity: 0,
            delay: (i / dataList.length) * 2 + 0.1
          });

        });
      });
    }

    const images = gsap.utils.toArray("img");

    imagesLoaded(images).on("always", () => {
      createCanvases(capture);
      resolve();
    });
  })

}

const contentScreen = () => {
  // 滚动左右切屏
  let sections = gsap.utils.toArray(".panel");
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".container",
      pin: true,
      scrub: 0.1,
      end: "+=3000",
    }
  });
}

onMounted(() => {
  headScreen().then(() => {
    vantaInit();
  })

  contentScreen();
  fishPathInit();

  window.addEventListener('scroll', handleScroll);
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
})
</script>

<template>
  <div class="vanta-bg"></div>

  <div class="fish-wrapper">
    <div class="fish" ref="fish">
      <div class="fish__inner">
        <!--body-->
        <div class="fish__body"></div>
        <div class="fish__body"></div>
        <div class="fish__body"></div>
        <div class="fish__body"></div>

        <!--head-->
        <div class="fish__head"></div>
        <div class="fish__head fish__head--2"></div>
        <div class="fish__head fish__head--3"></div>
        <div class="fish__head fish__head--4"></div>

        <div class="fish__tail-main"></div>
        <div class="fish__tail-fork"></div>

        <div class="fish__fin"></div>
        <div class="fish__fin fish__fin--2"></div>
      </div>
    </div>
  </div>

  <div class="description">
    <div id="capture">
      <img
        src="data:image/jpeg;base64,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">
    </div>
  </div>

  <div class="container">

    <section class="panel blue">
      <label class="box like">
        <input type="checkbox">

        <svg class="icon" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M9.77234 30.8573V11.7471H7.54573C5.50932 11.7471 3.85742 13.3931 3.85742 15.425V27.1794C3.85742 29.2112 5.50932 30.8573 7.54573 30.8573H9.77234ZM11.9902 30.8573V11.7054C14.9897 10.627 16.6942 7.8853 17.1055 3.33591C17.2666 1.55463 18.9633 0.814421 20.5803 1.59505C22.1847 2.36964 23.243 4.32583 23.243 6.93947C23.243 8.50265 23.0478 10.1054 22.6582 11.7471H29.7324C31.7739 11.7471 33.4289 13.402 33.4289 15.4435C33.4289 15.7416 33.3928 16.0386 33.3215 16.328L30.9883 25.7957C30.2558 28.7683 27.5894 30.8573 24.528 30.8573H11.9911H11.9902Z">
          </path>
        </svg>

        <span></span>
      </label>

      <label class="box coin">
        <input type="checkbox">

        <svg class="icon" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M14.045 25.5454C7.69377 25.5454 2.54504 20.3967 2.54504 14.0454C2.54504 7.69413 7.69377 2.54541 14.045 2.54541C20.3963 2.54541 25.545 7.69413 25.545 14.0454C25.545 17.0954 24.3334 20.0205 22.1768 22.1771C20.0201 24.3338 17.095 25.5454 14.045 25.5454ZM9.66202 6.81624H18.2761C18.825 6.81624 19.27 7.22183 19.27 7.72216C19.27 8.22248 18.825 8.62807 18.2761 8.62807H14.95V10.2903C17.989 10.4444 20.3766 12.9487 20.3855 15.9916V17.1995C20.3854 17.6997 19.9799 18.1052 19.4796 18.1052C18.9793 18.1052 18.5738 17.6997 18.5737 17.1995V15.9916C18.5667 13.9478 16.9882 12.2535 14.95 12.1022V20.5574C14.95 21.0577 14.5444 21.4633 14.0441 21.4633C13.5437 21.4633 13.1382 21.0577 13.1382 20.5574V12.1022C11.1 12.2535 9.52148 13.9478 9.51448 15.9916V17.1995C9.5144 17.6997 9.10883 18.1052 8.60856 18.1052C8.1083 18.1052 7.70273 17.6997 7.70265 17.1995V15.9916C7.71158 12.9487 10.0992 10.4444 13.1382 10.2903V8.62807H9.66202C9.11309 8.62807 8.66809 8.22248 8.66809 7.72216C8.66809 7.22183 9.11309 6.81624 9.66202 6.81624Z">
          </path>
        </svg>

        <span></span>
      </label>

      <label class="box collect">
        <input type="checkbox">

        <svg class="icon" width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M19.80715 9.26152C18.7438 9.09915 17.7624 8.36846 17.3534 7.39421L15.4723 3.4972C14.8998 2.1982 13.1004 2.1982 12.4461 3.4972L10.6468 7.39421C10.1561 8.36846 9.25639 9.09915 8.19315 9.26152L3.94016 9.91102C2.63155 10.0734 2.05904 11.6972 3.04049 12.6714L6.23023 15.9189C6.96632 16.6496 7.29348 17.705 7.1299 18.7605L6.39381 23.307C6.14844 24.6872 7.62063 25.6614 8.84745 25.0119L12.4461 23.0634C13.4276 22.4951 14.6544 22.4951 15.6359 23.0634L19.2345 25.0119C20.4614 25.6614 21.8518 24.6872 21.6882 23.307L20.8703 18.7605C20.7051 17.705 21.0339 16.6496 21.77 15.9189L24.9597 12.6714C25.9412 11.6972 25.3687 10.0734 24.06 9.91102L19.8071 9.26152Z">
          </path>
        </svg>

        <span></span>
      </label>
    </section>

    <section class="panel red">
      <div>
        <div class="box">

          <div class="loader">
            <span style="--i:0"></span>
            <span style="--i:1"></span>
            <span style="--i:2"></span>
            <span style="--i:3"></span>
            <span style="--i:4"></span>
            <span style="--i:5"></span>
            <span style="--i:6"></span>
            <span style="--i:7"></span>
          </div>
        </div>

        <svg width="0" height="0">
          <!-- 滤镜 -->
          <filter id="Gooey">
            <!-- 高斯模糊滤镜 stdDeviation偏差值 -->
            <feGaussianBlur stdDeviation="10" />

            <!-- 颜色矩阵 -->
            <feColorMatrix values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0 
              0 0 0 20 -10
            " />
          </filter>
        </svg>
      </div>
    </section>

    <section class="panel gray">
      <div class="loader"></div>
    </section>

    <section class="panel purple">
      <div class="road">
        <div class="taxi">
          <div class="light"></div>

          <div class="top">
            <b></b>
            <i></i>
          </div>
        </div>


        <div class="taxi">
          <div class="light"></div>

          <div class="top">
            <b></b>
            <i></i>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div class="final">
    <div class="box">
      <div class="bottom">
        <div class="top"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vanta-bg {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
}

.fish-wrapper {
  --mask: linear-gradient(180deg, rgba(0, 0, 0, 1.0), transparent);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  perspective: 100rem;
  perspective-origin: center center;
  transform-style: preserve-3d;
  pointer-events: none;
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
  z-index: 12;

  .fish {
    --bodyW: 2rem;
    --o: 0.95;
    --l: 100%;
    --c: hsla(250deg, 50%, var(--l), var(--o, 0.6));
    --size: 10rem;
    position: relative;
    width: var(--size);
    height: var(--size);
    transform-style: preserve-3d;
    transform-origin: center;

    @media (min-width: 1000px) {
      --size: 20rem;
      --bodyW: 4rem;
    }

    .fish__inner {
      --a: 9.5deg;
      width: calc(var(--bodyW) * 1.5);
      height: var(--size);
      transform-style: preserve-3d;
      transform: rotate(90deg);
    }

    .fish__body {
      --l: 75%;
      --c: hsla(250deg, 50%, var(--l), var(--o, 0.6));
      position: absolute;
      top: var(--bodyW);
      left: 0;
      width: var(--bodyW);
      height: calc(3 * var(--bodyW));
      background: var(--c);
      clip-path: polygon(0 0, 100% 0, 50% 100%);
      transform: translateZ(calc(var(--bodyW) / -2)) rotateX(var(--a));
      transform-origin: center top;

      &:nth-child(2) {
        --i: 2;
        --l: 75%;
        transform: translateZ(calc(var(--bodyW) / 2)) rotateX(calc(var(--a) * -1));
      }

      &:nth-child(3) {
        --i: 3;
        --l: 95%;
        transform: rotateY(90deg) translate3d(calc(var(--bodyW) / -2), 0, 0) rotateX(var(--a));
        transform-origin: left top;
      }

      &:nth-child(4) {
        --i: 4;
        --l: 50%;
        transform: rotateY(90deg) translate3d(calc(var(--bodyW) / 2), 0, 0) rotateX(calc(var(--a) * -1));
        transform-origin: right top;
      }
    }

    .fish__head {
      --a: 23.5deg;
      --l: 85%;
      --c: hsla(250deg, 50%, var(--l), var(--o, 0.6));
      position: absolute;
      top: 0;
      left: 0;
      width: var(--bodyW);
      height: var(--bodyW);
      background: var(--c);
      clip-path: polygon(40% 0, 60% 0, 100% 100%, 0 100%);
      transform: translateZ(calc(var(--bodyW) / 2)) rotateX(var(--a));
      transform-origin: center bottom;

      &--2 {
        --i: 2;
        --l: 80%;
        transform: translateZ(calc(var(--bodyW) / -2)) rotateX(calc(var(--a) * -1));
      }

      &--3 {
        --i: 3;
        --l: 90%;
        transform: rotateY(90deg) translate3d(calc(var(--bodyW) / -2), 0, 0) rotateX(calc(var(--a) * -1));
        transform-origin: left bottom;
      }

      &--4 {
        --l: 55%;
        transform: rotateY(90deg) translate3d(calc(var(--bodyW) / 2), 0, 0) rotateX(var(--a));
        transform-origin: right bottom;
      }
    }

    .fish__tail-main {
      --o: 0.9;
      --l: 90%;
      --c: hsla(250deg, 50%, var(--l), var(--o, 0.6));
      width: var(--bodyW);
      height: var(--bodyW);
      background-color: var(--c);
      position: absolute;
      left: 0;
      bottom: var(--bodyW);
      clip-path: polygon(50% 0, 100% 100%, 0 100%);
    }

    .fish__tail-fork {
      --o: 0.9;
      --l: 95%;
      --c: hsla(250deg, 50%, var(--l), var(--o, 0.6));
      width: var(--bodyW);
      height: var(--bodyW);
      background-color: var(--c);
      position: absolute;
      left: 0;
      bottom: 0;
      clip-path: polygon(0 0, 100% 0, 100% 70%, 90% 100%, 70% 70%, 50% 30%, 30% 70%, 10% 100%, 0 70%);
      transform-origin: top center;
      transform: rotateX(-45deg);
      animation: tail 1000ms infinite alternate;
    }

    .fish__fin {
      width: calc(var(--bodyW) / 8 * 3);
      height: var(--bodyW);
      background-color: var(--c);
      position: absolute;
      top: calc(var(--bodyW) * 1.5);
      left: calc(var(--bodyW) / 8 * 3);
      clip-path: polygon(50% 0, 100% 30%, 100% 60%, 50% 100%, 0 60%, 0 30%);
      transform-origin: top center;
      transform: translateZ(calc(var(--bodyW) / 2)) rotateY(0deg) rotateX(5deg) rotate(10deg);
      animation: fin 1500ms infinite alternate linear;

      &--2 {
        transform: translateZ(calc(var(--bodyW) / -2)) rotateY(0deg) rotateX(-5deg) rotate(10deg);
        animation: fin2 1500ms infinite alternate linear;
      }
    }

    @keyframes tail {
      to {
        transform: rotateX(45deg);
      }
    }

    @keyframes fin {
      100% {
        transform: translateZ(calc(var(--bodyW) / 2)) rotateY(10deg) rotateX(20deg) rotate(-10deg);
      }
    }

    @keyframes fin2 {
      100% {
        transform: translateZ(calc(var(--bodyW) / -2)) rotateY(-10deg) rotateX(-20deg) rotate(-10deg);
      }
    }

  }
}

.content {
  position: relative;
  z-index: 1;
  padding-bottom: 100vh;

  section {
    height: 100vh;
    width: 100%;
    margin-top: 100vh;

    &:nth-child(4n),
    &:nth-child(4n - 1) {
      --col: 3;
    }

    .section__content {
      width: 100%;
      position: fixed;
      top: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }
  }
}

@keyframes arrowMove {
  to {
    transform: translate3d(0, 0.5rem, 0);
  }
}

.panel pre.prettyprint {
  font-size: 20px;
  text-align: left;
  width: auto;
  font-weight: normal;
  margin: 10px;
  border: none;
}

.prettyprint .linenums {
  padding: 0;
  list-style: none;
}

.prettyprint ol li {
  background-color: black;
}

.panel.red .prettyprint .linenums>li:nth-child(n + 7):nth-child(-n + 9),
.panel.gray .prettyprint .linenums>li:nth-child(10),
.panel.purple .prettyprint .linenums>li:nth-child(4) {
  background-color: #222;
}

.description,
.final {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 100vh;
}

.final {
  .box {
    /* 3D透视的距离 */
    perspective: 1500px;
  }

  .box .bottom,
  .box .top {
    /* 上下两层一样的边框、圆角 */
    border: 0.5vmin solid #000;
    border-radius: 2vmin;

    /* 3D模式 */
    transform-style: preserve-3d;
  }

  .box .bottom {
    /* 下面蓝色盒子的宽高，vmin单位是会自动切换 vh 或 vw */
    width: 60vmin;
    height: 25vmin;
    /* 背景竖条纹，通过渐变色来实现，一格透明，一格颜色 */
    background: linear-gradient(90deg, transparent 1vmin, rgb(90, 90, 255) 1vmin);
    /* 背景调整到合适大小 */
    background-size: 2vmin;

    position: relative;
    /* 左右旋转动画 */
    animation: animate 10s linear infinite;
  }

  @keyframes animate {

    0%,
    50%,
    100% {
      /* 控制好时间进行旋转就好 */
      transform: rotateY(0deg);
    }

    25% {
      transform: rotateY(-30deg);
    }

    75% {
      transform: rotateY(30deg);
    }
  }

  .box .top {
    /* 上面红色盒子宽高，与蓝色一致 */
    width: 100%;
    height: 100%;
    /* 同样通过渐变色实现背景条纹 */
    background: linear-gradient(90deg, transparent 1vmin, rgb(255, 33, 77) 1vmin);
    background-size: 2vmin;

    /* 定位重叠在一起，一样大，所以不用移动位置 */
    position: absolute;
    /* 3D模式后，面向屏幕抬升一定距离，在旋转时才是错层的效果 */
    transform: translateZ(20vmin);
  }

  .box .top::before {
    /* 临时文字层，只是用来放视频标题🐷 */
    content: "视觉暂留";

    /* 宽保持最大，不然字会挤 */
    width: 100%;
    /* 字体大小、粗细、字体居中、颜色 */
    font-size: 12vmin;
    font-weight: bold;
    text-align: center;
    color: #fff;

    /* 居中重叠显示 */
    position: absolute;
    top: 50%;
    left: 50%;
    /* 同样3D模式之后抬升一部分距离 */
    transform-style: preserve-3d;
    transform: translate3d(-50%, -50%, 10vmin);
  }
}

#capture {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: inline-block;
  }
}

:deep(.capture-canvas) {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.container {
  width: 600%;
  height: 100vh !important;
  display: flex;
  flex-wrap: nowrap;
}

.panel {
  font-weight: 300;
  height: 100vh;
  width: 100vw;
}

.panel.blue {
  background-color: #2c7ad2;
  background-image: linear-gradient(144.02deg, #00bae2 4.56%, #fec5fb 72.98%);
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    /* 内部元素上下左右居中 */
    display: flex;
    justify-content: center;
    align-items: center;

    width: 200px;
    height: 200px;
    /* 50% 的圆角就是 ○ */
    border-radius: 50%;
    /* 鼠标放上去是小手 */
    cursor: pointer;

    position: relative;
  }

  .box .icon {
    width: 150px;
    height: 150px;

    /* svg 的填充颜色 */
    fill: #ddd;
    /* svg 的描边线宽 */
    stroke-width: 1;
    /* svg 的描边颜色 */
    stroke: var(--color);
    /* svg 的描边线框样式 */
    stroke-dasharray: 100;
    /* svg 的描边偏移量，也就是描边开始到结束的距离 */
    stroke-dashoffset: 100;
    /* svg 的描边两头的形状，是圆的 */
    stroke-linecap: round;

    z-index: 10;
  }

  .box span,
  .box span::before {
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-radius: 50%;
    /* 利用盒子阴影来实现小圆点绕着中心的效果 */
    box-shadow: 0 -120px 0 var(--color), 0 120px 0 var(--color),
      -120px 0 0 var(--color), 120px 0 0 var(--color);

    /* 元素居中 */
    position: absolute;
    top: 50%;
    left: 50%;
    /* scale(0) 是先把小圆点隐藏起来，下面动画再显示 */
    transform: translate(-50%, -50%) scale(0);
  }

  .box span::before {
    content: "";

    /* 利用伪元素复制一份小圆点，rotate(45deg) 旋转 45° */
    transform: translate(-50%, -50%) rotate(45deg) scale(0);
  }

  .box input[type="checkbox"] {
    /* 隐藏默认复选框样式 */
    display: none;

    position: absolute;
  }

  .box input[type="checkbox"]:checked~.icon path {
    /* 给 svg 图标添加动画 */
    animation: 1s animate-fill linear forwards;
  }

  @keyframes animate-fill {

    /* 动画主要修改 svg 的描边偏移量和填充颜色，要掌握好动画的时间 */
    0% {
      stroke-dashoffset: 100;
    }

    80% {
      stroke-dashoffset: 0;
      fill: #ddd;
    }

    100% {
      stroke-dashoffset: 0;
      fill: var(--color);
    }
  }

  .box input[type="checkbox"]:checked~span {
    /* 给图标周围的小圆点添加动画 */
    animation: 0.5s animate-flash ease-in-out forwards 0.85s;
  }

  @keyframes animate-flash {
    0% {
      /* 通过 scale(0.5) 放大缩小控制圆点距离 */
      transform: translate(-50%, -50%) scale(0.5);
      /* 控制圆点的显示和隐藏 */
      opacity: 0.8;
    }

    50% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.8;
    }

    100% {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0;
    }
  }

  .box input[type="checkbox"]:checked~span::before {
    /* 同上一步一样，只不过伪元素需要单独添加旋转的 45° */
    animation: 0.5s animate-flash-before ease-in-out forwards 0.85s;
  }

  @keyframes animate-flash-before {
    0% {
      transform: translate(-50%, -50%) rotate(45deg) scale(0.5);
      opacity: 0.8;
    }

    50% {
      transform: translate(-50%, -50%) rotate(45deg) scale(1);
      opacity: 0.8;
    }

    100% {
      transform: translate(-50%, -50%) rotate(45deg) scale(1.5);
      opacity: 0;
    }
  }

  /* 下面是分别为三个图标添加不一样的动画，原理一样，掌握好动画时间即可 */
  .like input[type="checkbox"]:checked~.icon {
    animation: 1s animate-like ease-in-out forwards 0.85s;
  }

  @keyframes animate-like {

    0%,
    100% {
      transform: rotate(0);
    }

    30% {
      transform: rotate(-30deg);
    }

    60% {
      transform: rotate(10deg);
    }

    80% {
      transform: rotate(-20deg);
    }
  }

  .coin input[type="checkbox"]:checked~.icon {
    animation: 1s animate-coin ease-in-out forwards;
  }

  @keyframes animate-coin {

    0%,
    100% {
      transform: translateY(0);
    }

    30% {
      transform: translateY(-20px);
    }

    60% {
      transform: translateY(10px);
    }

    80% {
      transform: translateY(-10px);
    }
  }

  .collect input[type="checkbox"]:checked~.icon {
    animation: 1s animate-collect ease-in-out forwards;
  }

  @keyframes animate-collect {

    0%,
    100% {
      transform: scale(1);
    }

    70% {
      transform: scale(1);
    }

    80% {
      transform: scale(1.5);
    }
  }
}

.panel.red {
  background-color: #c82736;
  background-image: linear-gradient(165.72deg, #f7bdf8 21.15%, #cd237f 81.93%);
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    /* 父盒子内部两个元素居中显示，也可以用其他居中方式 */
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
  }

  .box h2 {
    /* 因为定位会破坏换行，所以给一个能装下字的盒子宽度 */
    width: 50vmin;
    /* 字体大小、颜色、居中显示 */
    font-size: 6vmin;
    color: #fff;
    text-align: center;

    /* 父盒子已经给过元素居中了，这里让元素叠起来 */
    position: absolute;
  }

  .box .loader {
    /* 同样子元素居中 */
    display: flex;
    justify-content: center;
    align-items: center;

    /* 牛奶父盒子宽高 */
    width: 45vmin;
    height: 45vmin;
    /* 背景颜色，加滤镜之后会被滤镜处理掉 */
    background-color: rgba(0, 0, 0, 0.2);

    /* svg 滤镜使用 */
    filter: url(#Gooey);

    position: relative;
  }

  .box .loader span {
    /* 牛奶圆宽高、颜色、○ */
    width: 30%;
    height: 30%;
    background-color: #fff;
    border-radius: 50%;

    /* 定位叠加 */
    position: absolute;
    /* 贴在盒子左边 */
    left: 0;
    /* 变换的基础点，让小圆点围绕父盒子中心旋转 */
    transform-origin: calc(45vmin / 2);
    /* 默认情况保持圆点在中间 */
    transform: rotate(0deg) translateX(15.6vmin);

    /* 旋转动画 */
    animation: animate1 8s ease-in-out infinite;
    /* 动画延时，根据 --i 变量设置不同的延时时间 */
    animation-delay: calc(0.1s * var(--i));
  }

  @keyframes animate1 {

    0%,
    10%,
    90%,
    100% {
      /* 保持初始大小，居中显示 */
      width: 30%;
      height: 30%;
      transform: rotate(0deg) translateX(15.6vmin);
    }

    40%,
    70% {
      /* 缩小一圈 */
      width: 18%;
      height: 18%;
      /* 旋转每个小圆点分散开的角度，去掉居中，保持贴在父盒子边缘 */
      transform: rotate(calc(360deg / 8 * var(--i)));
    }
  }
}

.panel.gray {
  background-color: #777;
  background-image: linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%);
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    position: relative;

    width: 500px;
    height: 10px;
    background-color: #fff;

    -webkit-box-reflect: below 1px linear-gradient(transparent, rgba(0, 0, 0, 0.5));
  }

  .loader::before {
    content: "";
    position: absolute;

    inset: 0;
    background: linear-gradient(90deg,
        #fb0099,
        #0000ff,
        #00ff00,
        #ffff00,
        #fb0094,
        #0000ff,
        #00ff00,
        #ffff00,
        #fb0090);
    background-size: 500%;

    animation: animate 20s linear infinite;
  }

  .loader::after {
    content: "";
    position: absolute;

    inset: 0;
    background: linear-gradient(90deg,
        #fb0099,
        #0000ff,
        #00ff00,
        #ffff00,
        #fb0094,
        #0000ff,
        #00ff00,
        #ffff00,
        #fb0090);
    background-size: 500%;
    filter: blur(20px);

    animation: animate 20s linear infinite;
  }

  @keyframes animate {
    0% {
      background-position: 0 0;
    }

    0% {
      background-position: 500% 0;
    }
  }
}

.panel.purple {
  background-color: #8d3dae;
  background-image: linear-gradient(153.58deg, #f7bdf8 32.25%, #2f3cc0 92.68%);
  display: flex;
  align-items: center;
  justify-content: center;

  .road {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 700px;
    height: 150px;
    background-color: #333;
    border-radius: 75px;

    transform-style: preserve-3d;
    perspective: 500px;

    position: relative;
  }

  .road::before {
    content: "";

    width: 100%;
    height: 4px;
    background: linear-gradient(90deg,
        #fff,
        #fff 50%,
        transparent 50%,
        transparent 100%);
    background-size: 50px;

    position: absolute;

    animation: animate-road 0.1s linear infinite;
  }

  @keyframes animate-road {
    0% {
      background-position: 50px 0;
    }

    100% {
      background-position: 0 0;
    }
  }

  .taxi {
    width: 200px;
    height: 80px;
    background-color: #f4b603;
    border-radius: 10px;
    box-shadow: -10px 10px rgba(0, 0, 0, 0.2);

    transform-style: preserve-3d;
    perspective: 800px;

    position: absolute;
    left: 50px;
    z-index: 10;

    animation: animate-taxi 2s linear infinite;
  }

  .taxi:nth-child(2) {
    left: initial;
    right: 150px;
    z-index: 9;

    animation: animate-taxi 4s linear infinite;
    animation-delay: -1s;
  }

  @keyframes animate-taxi {
    0% {
      transform: translate(20px, -20px);
    }

    25% {
      transform: translate(-10px, 0);
    }

    50% {
      transform: translate(20px, 20px);
    }

    75% {
      transform: translate(-10px, 0);
    }

    100% {
      transform: translate(20px, -20px);
    }
  }

  .taxi::before {
    content: "";

    width: 5px;
    height: 15px;
    background-color: #fc3c25;
    border-radius: 2px;
    box-shadow: 0 42px #fc3c25;

    position: absolute;
    top: 12px;
    left: 2px;
  }

  .taxi::after {
    content: "";

    width: 5px;
    height: 16px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 44px #fff;

    position: absolute;
    top: 10px;
    right: 2px;
  }

  .taxi .top {
    inset: 5px 10px;
    background-color: #fdd206;
    border-radius: 10px;
    overflow: hidden;

    position: absolute;
  }

  .taxi .top::before {
    content: "taxi";

    background-color: #fff;
    padding: 2px;
    font-size: 0.75em;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    box-shadow: 0 0 0 1px #0005;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    z-index: 10;
  }

  .taxi .top b {
    inset: 0 30px;
    background-color: #111;
    border-radius: 10px;

    position: absolute;
  }

  .taxi .top b::before {
    content: "";

    inset: 6px 25px;
    background-color: #fdd206;
    border-radius: 5px;

    position: absolute;
  }

  .taxi .top b::after {
    content: "";

    inset: 0 58px;
    background-color: #fdd206;

    position: absolute;
  }

  .taxi .top i {
    inset: 0;

    position: absolute;
  }

  .taxi .top i::before {
    content: "";

    width: 40px;
    height: 5px;
    background-color: #fdd206;
    transform-origin: right;
    transform: rotate(15deg);
    box-shadow: 100px 34px #fdd206;

    position: absolute;
    top: 7px;
    left: 20px;
  }

  .taxi .top i::after {
    content: "";

    width: 40px;
    height: 5px;
    background-color: #fdd206;
    transform-origin: right;
    transform: rotate(-15deg);
    box-shadow: 100px -34px #fdd206;

    position: absolute;
    bottom: 7px;
    left: 20px;
  }

  .taxi .light {
    width: 10px;
    height: 70px;
    background-color: #0002;
    border-radius: 15px;
    transform-style: preserve-3d;

    position: absolute;
    top: 5px;
    right: -2px;
  }

  .taxi .light::before {
    content: "";

    width: 150px;
    height: 16px;
    background: linear-gradient(90deg, #fff6, transparent);
    transform-origin: left;
    transform: perspective(500px) rotateY(-50deg);

    position: absolute;
    top: 5px;
    left: 0;
  }

  .taxi .light::after {
    content: "";

    width: 150px;
    height: 16px;
    background: linear-gradient(90deg, #fff6, transparent);
    transform-origin: left;
    transform: perspective(500px) rotateY(-50deg);

    position: absolute;
    bottom: 5px;
    left: 0;
  }
}
</style>