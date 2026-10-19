<script setup lang="ts">
/** Decorative shape for this block. SVG attribute names stay kebab-case, not camelCase — the DOM only recognizes that form. */
</script>

<template>
  <svg
    class="coolshapes moon-12"
    fill="none"
    height="400"
    viewBox="0 0 200 200"
    width="400"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <g clip-path="url(#cs_clip_1_moon-12)">
      <mask
        height="202"
        id="cs_mask_1_moon-12"
        maskUnits="userSpaceOnUse"
        style="mask-type: alpha"
        width="201"
        x="-1"
        y="-1"
      >
        <path
          d="M100.503 101.907C107.74 125.692 129.849 143 156 143c15.184 0 29.006-5.835 39.345-15.385 1.138-1.051 3.017-.565 3.342.95A59.235 59.235 0 01200 141c0 32.585-26.415 59-59 59s-59-26.415-59-59c0-15.679 6.116-29.93 16.093-40.497C74.308 107.74 57 129.849 57 156c0 15.185 5.835 29.006 15.385 39.345 1.051 1.138.565 3.018-.95 3.343A59.236 59.236 0 0159 200c-32.585 0-59-26.415-59-59 0-32.584 26.415-59 59-59 15.68 0 29.93 6.117 40.497 16.093C92.26 74.308 70.15 57 43.999 57c-15.184 0-29.005 5.835-39.344 15.385-1.138 1.051-3.018.565-3.343-.95A59.234 59.234 0 010 59C0 26.415 26.415 0 59 0c32.584 0 59 26.415 59 59 0 15.68-6.117 29.93-16.093 40.497C125.692 92.26 143 70.151 143 44c0-15.185-5.835-29.006-15.385-39.345-1.051-1.138-.565-3.017.95-3.342A59.23 59.23 0 01141 0c32.585 0 59 26.415 59 59s-26.415 59-59 59c-15.68 0-29.93-6.116-40.497-16.093z"
          fill="#fff"
          fill-rule="evenodd"
        />
      </mask>
      <g mask="url(#cs_mask_1_moon-12)">
        <path d="M200 0H0v200h200V0z" fill="#fff" />
        <path d="M200 0H0v200h200V0z" fill="url(#paint0_radial_748_4454)" />
        <path d="M200 0H0v200h200V0z" fill="url(#paint1_radial_748_4454)" />
        <path d="M200 0H0v200h200V0z" fill="url(#paint2_radial_748_4454)" />
      </g>
    </g>
    <g mask="url(#cs_mask_1_moon-12)" style="mix-blend-mode: overlay">
      <path
        d="M200 0H0v200h200V0z"
        fill="gray"
        filter="url(#cs_noise_1_moon-12)"
        stroke="transparent"
      />
    </g>
    <defs>
      <radialGradient
        cx="0"
        cy="0"
        gradientTransform="rotate(-135.99 120.877 57.303) scale(143.21)"
        gradientUnits="userSpaceOnUse"
        id="paint0_radial_748_4454"
        r="1"
      >
        <stop stop-color="var(--color-indigo-400)" />
        <stop offset="0.423" stop-color="var(--color-indigo-400)" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </radialGradient>
      <radialGradient
        cx="0"
        cy="0"
        gradientTransform="rotate(-45.616 231.53 74.976) scale(263.059)"
        gradientUnits="userSpaceOnUse"
        id="paint1_radial_748_4454"
        r="1"
      >
        <stop stop-color="var(--color-indigo-400)" />
        <stop
          offset="1"
          stop-color="var(--color-indigo-400)"
          stop-opacity="0"
        />
      </radialGradient>
      <radialGradient
        cx="0"
        cy="0"
        gradientTransform="rotate(46.063 -3.673 22.392) scale(209.693)"
        gradientUnits="userSpaceOnUse"
        id="paint2_radial_748_4454"
        r="1"
      >
        <stop offset="0.276" stop-color="var(--color-orange-400)" />
        <stop
          offset="1"
          stop-color="var(--color-orange-400)"
          stop-opacity="0"
        />
      </radialGradient>
      <clipPath id="cs_clip_1_moon-12">
        <path d="M0 0H200V200H0z" fill="#fff" />
      </clipPath>
    </defs>
    <defs>
      <filter
        filterUnits="objectBoundingBox"
        height="100%"
        id="cs_noise_1_moon-12"
        width="100%"
        x="0%"
        y="0%"
      >
        <feBlend in="SourceGraphic" in2="out2" result="out3" />
      </filter>
    </defs>
  </svg>
</template>
