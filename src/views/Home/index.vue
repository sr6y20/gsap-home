<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ParallaxPlot from '@/views/Home/components/ParallaxPlot.vue';
import ProjectCard from "@/views/Home/components/ProjectCard.vue";
import FoxGLTF from "@/views/Home/components/FoxGLTF.vue";
import ImageFade from "@/views/Home/components/ImageFade.vue";
import Fish from "@/views/Home/components/Fish.vue";
import NeonRoom from "@/views/Home/components/NeonRoom.vue";
import Contact from "@/views/Home/components/Contact.vue";
import { onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

const contentScreen = () => {

    let sections = gsap.utils.toArray(".panel");
    gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".link-container",
            pin: true,
            scrub: 0.3,
            start: "top top",
            end: "+=400"
        }
    });
}

onMounted(() => {
    contentScreen();
})
</script>

<template>
    <ParallaxPlot />
    <ProjectCard />

    <!-- <Fish /> -->
    <!-- <FoxGLTF /> -->

    <!-- <ImageFade /> -->

    <div class="link-container">

        <section class="panel red">
            <ul class="cards-container cards">
                <li style="--i: 0;" data-name="Bulbasaur">
                    <input type="radio" id="item-1" name="gallery-item" checked>
                    <label for="item-1">
                        <img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/bulbasaur-s.png">
                    </label>
                    <img
                        src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/bulbasaur-l.png">
                    <h2>Bulbasaur</h2>
                    <p>Bulbasaur is a grass/poison type Pokémon that evolves into Ivysaur. Bulbasaur is also one of the
                        three
                        starter Pokémon in Red/Blue.</p>
                </li>
                <li style="--i: 1;" data-name="Charmander">
                    <input type="radio" id="item-2" name="gallery-item">
                    <label for="item-2"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/charmander-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/charmander-l.png"
                        loading="lazy">
                    <h2>Charmander</h2>
                    <p>Charmander is the fire-type starter Pokémon first seen in Pokémon Red/Blue. Charmander uses the
                        power of
                        its fiery tail to attack the enemy and eventually evolves into Charmeleon.</p>
                </li>
                <li style="--i: 2;" data-name="Charmeleon">
                    <input type="radio" id="item-3" name="gallery-item">
                    <label for="item-3"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/charmeleon-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/charmeleon-l.png"
                        loading="lazy">
                    <h2>Charmeleon</h2>
                    <p>Charmeleon is a fire-type Pokémon first found in Pokémon Red/Blue. Charmander evolves from the
                        fire-type
                        starter Pokémon Charmander and eventually into Charizard, all while using his awesome fiery
                        powers.</p>
                </li>
                <li style="--i: 3;" data-name="Squirtle">
                    <input type="radio" id="item-4" name="gallery-item">
                    <label for="item-4"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/squirtle-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/squirtle-l.png"
                        loading="lazy">
                    <h2>Squirtle</h2>
                    <p>Squirtle is a Water-type starter Pokémon from the original Pokémon Red/Blue. With enough
                        experience it can
                        evolve into a Wartortle.</p>
                </li>
                <li style="--i: 4;" data-name="Wigglytuff">
                    <input type="radio" id="item-5" name="gallery-item">
                    <label for="item-5"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/wigglytuff-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/wigglytuff-l.png"
                        loading="lazy">
                    <h2>Wigglytuff</h2>
                    <p>Wigglytuff is a normal/fairy type Pokémon that evolves from Jigglypuff with a Moon Stone. </p>
                </li>
                <li style="--i: 5;" data-name="Zubat">
                    <input type="radio" id="item-6" name="gallery-item">
                    <label for="item-6"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/zubat-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/zubat-l.png"
                        loading="lazy">
                    <h2>Zubat</h2>
                    <p>Zubat is a Poison/Flying type Pokémon that evolves into Golbat.</p>
                </li>
                <li style="--i: 6;" data-name="Sandslash">
                    <input type="radio" id="item-7" name="gallery-item">
                    <label for="item-7"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/sandslash-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/sandslash-l.png"
                        loading="lazy">
                    <h2>Sandslash</h2>
                    <p>Sandslash is a ground type Pokémon that evolves from Sandshrew.</p>
                </li>
                <li style="--i: 7;" data-name="Nidorina">
                    <input type="radio" id="item-8" name="gallery-item">
                    <label for="item-8"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/nidorina-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/nidorina-l.png"
                        loading="lazy">
                    <h2>Nidorina</h2>
                    <p>Nidorina is a poison type Pokémon that evolves from Nidoran (female) and can evolve into
                        Nidoqueen with a
                        Moon Stone. </p>
                </li>
                <li style="--i: 8;" data-name="Vulpix">
                    <input type="radio" id="item-9" name="gallery-item">
                    <label for="item-9"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/vulpix-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/vulpix-l.png"
                        loading="lazy">
                    <h2>Vulpix</h2>
                    <p>Vulpix is a fire type Pokémon that evolves into Ninetales with a Fire Stone.</p>
                </li>
                <li style="--i: 9;" data-name="Gloom">
                    <input type="radio" id="item-10" name="gallery-item">
                    <label for="item-10"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/gloom-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/gloom-l.png"
                        loading="lazy">
                    <h2>Gloom</h2>
                    <p>Gloom is a Grass/Poison type Pokémon that evolves from Oddish and can evolve into Vileplume with
                        a Leaf
                        Stone, or Bellossom with a Sun Stone.</p>
                </li>
                <li style="--i: 10;" data-name="Paras">
                    <input type="radio" id="item-11" name="gallery-item">
                    <label for="item-11"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/paras-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/paras-l.png"
                        loading="lazy">
                    <h2>Paras</h2>
                    <p>Paras is a Bug/Grass type Pokémon that evolves into Parasect. </p>
                </li>
                <li style="--i: 11;" data-name="Alakazam">
                    <input type="radio" id="item-12" name="gallery-item">
                    <label for="item-12"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/alakazam-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/alakazam-l.png"
                        loading="lazy">
                    <h2>Alakazam</h2>
                    <p>Alakazam is a psychic-type pokemon from the original Pokemon Red/Blue. As the evolution of
                        Kadabra,
                        Alakazam is the third in a line of powerful spoon-bending psychics.</p>
                </li>
                <li style="--i: 12;" data-name="Poliwrath">
                    <input type="radio" id="item-13" name="gallery-item">
                    <label for="item-13"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/poliwrath-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/poliwrath-l.png"
                        loading="lazy">
                    <h2>Poliwrath</h2>
                    <p>Poliwrath is a water/fighting-type pokemon first found in the original Pokemon Red/Blue.
                        Poliwrath is the
                        evolved form of Poliwag and Poliwhirl, and it loves to get up-close and personal, using its
                        confusing belly
                        to misdirect opponents before it goes in for the final punch.</p>
                </li>
                <li style="--i: 13;" data-name="Mankey">
                    <input type="radio" id="item-14" name="gallery-item">
                    <label for="item-14"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/mankey-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/mankey-l.png"
                        loading="lazy">
                    <h2>Mankey</h2>
                    <p>Mankey is a fighting-type pokemon first featured in the original Pokemon Red/Blue. Mankey uses
                        its dense
                        form to the fullest advantage, dodging nimbly as it strikes blows on its opponents.</p>
                </li>
                <li style="--i: 14;" data-name="Tentacruel">
                    <input type="radio" id="item-15" name="gallery-item">
                    <label for="item-15"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/tentacruel-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/tentacruel-l.png"
                        loading="lazy">
                    <h2>Tentacruel</h2>
                    <p>Tentacruel is a water/poison-type pokemon first found in the original Pokemon Red/Blue.
                        Tentacruel is the
                        evolution of Tentacool, its spindly tentacles more numerous and more poisonous.</p>
                </li>
                <li style="--i: 15;" data-name="Farfetch'd">
                    <input type="radio" id="item-16" name="gallery-item">
                    <label for="item-16"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/farfetch_d-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/farfetch_d-l.png"
                        loading="lazy">
                    <h2>Farfetch'd</h2>
                    <p>Farfetch'd is a Normal/Flying type Pokémon. Farfetch'd is very protective of its leek, and can
                        use the
                        vegetable to attack opponents, even as Farfetch'd moves out of harm's way.</p>
                </li>
                <li style="--i: 16;" data-name="Voltorb">
                    <input type="radio" id="item-17" name="gallery-item">
                    <label for="item-17"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/voltorb-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/voltorb-l.png"
                        loading="lazy">
                    <h2>Voltorb</h2>
                    <p>Voltorb is an electric-type pokemon first found in the original Pokemon Red/Blue. Voltorb is
                        commonly
                        mistaken for a hidden pokeball, often to the detriment of the one who finds it.</p>
                </li>
                <li style="--i: 17;" data-name="Rhyhorn">
                    <input type="radio" id="item-18" name="gallery-item">
                    <label for="item-18"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/rhyhorn-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/rhyhorn-l.png"
                        loading="lazy">
                    <h2>Rhyhorn</h2>
                    <p>Rhyhorn is a ground/rock-type pokemon first found in the original Pokemon Red/Blue. Rhyhorn has a
                        short
                        stocky body that it uses to full advantage by rushing opponents to hit them with his
                        horn-adorned head. It
                        evolves into Rhydon when it reaches level 42. </p>
                </li>
                <li style="--i: 18;" data-name="Tangela">
                    <input type="radio" id="item-19" name="gallery-item">
                    <label for="item-19"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/tangela-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/tangela-l.png"
                        loading="lazy">
                    <h2>Tangela</h2>
                    <p>Tangela is a grass-type pokemon first found in the original Pokemon Red/Blue. Tangela uses vines
                        growing
                        out of its body to obscure it so that only its eyes and feet can be seen. </p>
                </li>
                <li style="--i: 19;" data-name="Mr. Mime">
                    <input type="radio" id="item-20" name="gallery-item">
                    <label for="item-20"><img
                            src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/mr_mime-s.png"></label>
                    <img src="https://raw.githubusercontent.com/cbolson/assets/refs/heads/main/codepen/pokemon/mr_mime-l.png"
                        loading="lazy">
                    <h2>Mr. Mime</h2>
                    <p>Mr. Mime is a psychic-type pokemon from the original Pokemon Red/Blue. Like his name indicates,
                        this
                        pokemon doesn't say much - but watch out! Mr. Mime can copy even the most deadly attack and use
                        it as its
                        own. </p>
                </li>
            </ul>
        </section>

        <section class="panel purple">

        </section>
    </div>

    <!-- <NeonRoom /> -->
    <Contact />
</template>

<style lang="scss" scoped>
.link-container {
    width: 200%;
    height: 100vh !important;
    display: flex;
    flex-wrap: nowrap;
    position: relative;
}

.panel {
    font-weight: 300;
    height: 100vh;
    width: 100vw;
}

.panel.red {
    background-color: #c82736;
    background-image: linear-gradient(165.72deg, #f7bdf8 21.15%, #cd237f 81.93%);
    display: flex;
    align-items: center;
    justify-content: center;

    @import url(https://fonts.bunny.net/css?family=abel:400);

    /* Hide radio buttons */
    input[type="radio"] {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    .cards {
        --base-rotation: 0deg;
        --full-circle: 360deg;
        --items: 20;
        --radius: 30vw;
        --duration: 300ms;

        --cards-container-size: calc(var(--radius) * 2);
        --thumb-size: 30px;
        --image-size: calc(var(--radius));
        --image-y: 0%;
        --labels-offset: calc(var(--radius) * -1);
        --title-top: calc(var(--thumb-size) * -3);
        --info-top: calc(100% + 2rem);
        --info-width: 100%;

        position: fixed;
        inset: 0;
        margin: auto;
        width: var(--cards-container-size);
        height: var(--cards-container-size);
        aspect-ratio: 1;
        border-radius: 50%;
        perspective: 1000px;
        transition: transform 0.3s ease-in-out var(--duration);
        list-style: none;
    }

    @media (min-width: 800px) {
        .cards {
            --radius: 30vw;
            --thumb-size: 40px;
            --title-top: 2rem;
        }
    }

    @media (min-width: 1200px) {
        .cards {
            --radius: 20vw;
            --thumb-size: 50px;
            --image-y: -20%;
            --info-width: min(100% - 2rem, 65%);

            --info-top: calc(var(--image-size) * 1.3);
        }
    }

    .cards li {
        position: absolute;
        inset: 0;
        margin: 0;
        padding: 0;
        transform-origin: center;
        display: grid;
        place-content: center;
        transform: rotate(calc(var(--i) * 360deg / var(--items)));
        pointer-events: none;
    }

    .cards li>label {
        position: absolute;
        inset: 0;
        margin: auto;
        transform: translateY(var(--labels-offset));
        width: var(--thumb-size);
        height: var(--thumb-size);
        cursor: pointer;
        pointer-events: initial;
        /*outline: 1px dashed red;*/
        transition: var(--duration) ease-in-out;
    }

    /* thumbs */
    .cards li>label>img {
        transform-origin: center;
        width: 100%;
        scale: var(--label-scale, 1);
        opacity: var(--label-opacity, 1);
        transition: scale var(--duration) ease-in-out,
            opacity var(--duration) ease-in-out;
    }

    /* redudce scale of all thumbs */
    .cards:has(label:hover) label {
        --label-scale: 0.75;
    }

    /* enlarge thumbs either side of hovered */
    .cards li:has(+ li > label:hover)>label,
    .cards li:has(label:hover)+li>label {
        --label-scale: 1.25;
    }

    /* hovered thumb */
    .cards li>label:hover img {
        --label-scale: 1.5;
    }

    /* main image */
    .cards>li>img {
        width: var(--image-size);
        height: var(--image-size);
        object-fit: contain;
        z-index: 52;

        transform: translateY(var(--image-y));
        transition-property: opacity, scale, width, height, transform, filter;
        transition-duration: var(--duration);
        transition-timing-function: ease-in-out;
        transition-delay: var(--item-delay, 0ms), var(--item-delay, 0ms), 0ms, 0ms, 0ms,
            0ms;

        pointer-events: initial;
        opacity: var(--item-opacity, 0);
        scale: var(--item-scale, 0);
        filter: drop-shadow(0px 0px 5px rgba(255 255 255 / 0.25));
    }

    .cards>li:has(:checked)>img:hover {
        transform: translateY(var(--image-y)) rotateY(-30deg) rotateX(-5deg);
        transition-delay: 0ms;
        filter: drop-shadow(15px 10px 5px rgba(255 255 255 / 0.25));
    }

    .cards>li>h2,
    .cards>li>p {
        position: absolute;
        left: 50%;
        text-align: center;
        transform: translate(-50%, 0);
        transform-origin: center;
    }

    .cards>li>h2 {
        top: var(--title-top);
        opacity: var(--title-opacity, 0);
        translate: 0 var(--title-y, -30px);
        transition: var(--duration) ease-in-out var(--title-delay, 0ms);
    }

    .cards>li>p {
        top: var(--info-top);
        margin: 0 auto;
        width: var(--info-width);
        z-index: 2;
        font-size: clamp(0.8rem, 3.5vw + 0.05rem, 1.1rem);
        text-wrap: balance;
        opacity: var(--info-opacity, 0);
        translate: 0 var(--info-y, 30px);
        transition: var(--duration) ease-in-out var(--info-delay, 0ms);
    }

    /* update custom properties for checked item */
    li:has(input:checked) {
        --label-opacity: 0.25;
        --label-scale: 1;
        --item-scale: 1;
        --item-opacity: 1;
        --item-delay: calc(var(--duration) * 2);
        --title-opacity: 1;
        --title-y: 0;
        --title-delay: calc(var(--duration) * 3);
        --info-opacity: 1;
        --info-y: 0;
        --info-delay: calc(var(--duration) * 3);
        /*outline: 1px dashed red;*/
        z-index: 99;
    }

    /* rotate container based on checked radio */
    .cards:has(input:checked) {
        transform: rotate(calc(var(--base-rotation) - (var(--index) * var(--full-circle) / var(--items))));
    }

    /*
this would be so much simpler if we could use counter values as custom property values
*/
    .cards:has(input#item-1:checked) {
        --index: 0;
    }

    .cards:has(input#item-2:checked) {
        --index: 1;
    }

    .cards:has(input#item-3:checked) {
        --index: 2;
    }

    .cards:has(input#item-4:checked) {
        --index: 3;
    }

    .cards:has(input#item-5:checked) {
        --index: 4;
    }

    .cards:has(input#item-6:checked) {
        --index: 5;
    }

    .cards:has(input#item-7:checked) {
        --index: 6;
    }

    .cards:has(input#item-8:checked) {
        --index: 7;
    }

    .cards:has(input#item-9:checked) {
        --index: 8;
    }

    .cards:has(input#item-10:checked) {
        --index: 9;
    }

    .cards:has(input#item-11:checked) {
        --index: 10;
    }

    .cards:has(input#item-12:checked) {
        --index: 11;
    }

    .cards:has(input#item-13:checked) {
        --index: 12;
    }

    .cards:has(input#item-14:checked) {
        --index: 13;
    }

    .cards:has(input#item-15:checked) {
        --index: 14;
    }

    .cards:has(input#item-16:checked) {
        --index: 15;
    }

    .cards:has(input#item-17:checked) {
        --index: 16;
    }

    .cards:has(input#item-18:checked) {
        --index: 17;
    }

    .cards:has(input#item-19:checked) {
        --index: 18;
    }

    .cards:has(input#item-20:checked) {
        --index: 19;
    }

    /* general styling */
    *,
    ::before,
    ::after {
        box-sizing: border-box;
    }

    :root {
        --clr-bg: #000;
        --clr-primary: rgb(248, 243, 243);
    }

    html {
        background-color: var(--clr-bg);
        font-family: "Abel", sans-serif;
    }

    body {
        min-height: 100svh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
        line-height: 1.4;
        color: var(--clr-primary);
        padding: 1rem;
        margin: 0;
    }

    /* DEBUG - cross-hairs for center of body */
    /*
body::after,
body::before{
  content: '';
  position: absolute;
  background-color: green;
  opacity: .5;
  z-index: -10;
}
body::before{
  inset: 0 50%;
  width: 1px;
}
body::after{
  inset: 50% 0;
  height: 1px;
}
*/

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