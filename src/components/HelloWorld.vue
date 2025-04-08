<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ParallaxPlot from '@/pages/Home/components/ParallaxPlot.vue';
import FoxGLTF from "@/pages/Home/components/FoxGLTF.vue";
import ImageFade from "@/pages/Home/components/ImageFade.vue";
import Fish from "@/pages/Home/components/Fish.vue";
import NeonRoom from "@/pages/Home/components/NeonRoom.vue";

gsap.registerPlugin(ScrollTrigger);

const contentScreen = () => {
  // 滚动左右切屏
  let sections = gsap.utils.toArray(".panel");
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".link-container",
      pin: true,
      scrub: 0.1,
      end: "+=3000",
    }
  });
}

onMounted(() => {
  contentScreen();
})
</script>

<template>
  <ParallaxPlot />

  <Fish />
  <FoxGLTF />

  <ImageFade />

  <div class="link-container">

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

  <NeonRoom />
</template>

<style lang="scss" scoped>
.link-container {
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