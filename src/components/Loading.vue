<script setup lang="ts"></script>
<template>
    <div class="l-wrapper">
        <svg viewBox="0 0 800 600" class="svg--parent">
            <rect width="100%" height="100%" class="r-bounds"></rect>

            <linearGradient id="gr-bw">
                <stop stop-color="black" offset="0" />
                <stop stop-color="white" offset="100%" />
            </linearGradient>

            <mask id="mask" maskunits="objectBoundingBox" maskcontentunits="objectBoundingBox">
                <rect y="0" width="1" height="1" fill="url(#gr-bw)" />
            </mask>

            <symbol id="s-petal">
                <path
                    d="M60,400 C60,400 120,298.319352 120,200 C120,89.54305 60,0 60,0 C60,0 0,89.54305 0,200 C0,310.45695 60,400 60,400 Z"
                    class="e-petal"></path>
            </symbol>

            <svg viewBox="0 10 120 800">
                <rect width="100%" height="100%" class="r-bounds"></rect>
                <g class="g-petals">
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                    <!-- -->
                    <g class="g-petal">
                        <use xlink:href="#s-petal" />
                    </g>
                </g>


            </svg>
        </svg>
    </div>
</template>
<style lang="scss" scoped>
svg {
    overflow: visible;
}

.svg--parent {
    width: 100%;
    height: 95%;
}

.l-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.r-bounds {
    fill: none;
    /*   stroke: green */
}

$max: 15;
$angle-step: 360/$max;

.g-petals {
    transform-origin: 60px 400px;
    animation: rotate-360 20s infinite;
}

.g-petal {
    transform-origin: 60px 415px;

    @for $item from 1 through $max {
        $angle: $angle-step * $item;

        &:nth-of-type(#{$max}n+#{$item}) {
            transform: rotate(#{$angle}deg);
            color: hsl($angle*3.2, 95%, 60%);
        }
    }
}

.g-petal use {
    fill: currentColor;
    transform-origin: 60px 250px;
    mask: url(#mask);
    animation: rotate-360 5s infinite;
}

@keyframes rotate-360 {
    100% {
        transform: rotate(360deg);
    }
}
</style>