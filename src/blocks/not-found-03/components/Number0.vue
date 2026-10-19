<script setup lang="ts">
/** Decorative shape for this block. SVG attribute names stay kebab-case, not camelCase — the DOM only recognizes that form. */
</script>

<template>
  <svg
    fill="none"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <g clip-path="url(#cs_clip_1_number-0)">
      <mask
        height="200"
        id="cs_mask_1_number-0"
        maskUnits="userSpaceOnUse"
        style="mask-type: alpha"
        width="200"
        x="0"
        y="0"
      >
        <path
          d="M100 110c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm0 90c55.228 0 100-44.772 100-100S155.228 0 100 0 0 44.772 0 100s44.772 100 100 100z"
          fill="#fff"
          fill-rule="evenodd"
        />
      </mask>
      <g mask="url(#cs_mask_1_number-0)">
        <path d="M200 0H0v200h200V0z" fill="#fff" />
        <path
          d="M200 0H0v200h200V0z"
          fill="url(#paint0_linear_880_3290)"
          fill-opacity="0.55"
        />
        <g filter="url(#filter0_f_880_3290)">
          <path d="M115-19H-13V94h128V-19z" fill="#06F" />
          <path d="M87 91H-20v99H87V91z" fill="#FF00D6" />
          <path d="M168 125H87v75h81v-75z" fill="#FFD749" />
          <path d="M200-22H93v99h107v-99z" fill="#07FFE1" />
        </g>
      </g>
    </g>
    <g mask="url(#cs_mask_1_number-0)" style="mix-blend-mode: overlay">
      <path
        d="M200 0H0v200h200V0z"
        fill="gray"
        filter="url(#cs_noise_1_number-0)"
        stroke="transparent"
      />
    </g>
    <defs>
      <filter
        color-interpolation-filters="sRGB"
        filterUnits="userSpaceOnUse"
        height="362"
        id="filter0_f_880_3290"
        width="360"
        x="-90"
        y="-92"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_880_3290"
          stdDeviation="35"
        />
      </filter>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear_880_3290"
        x1="200"
        x2="0"
        y1="0"
        y2="200"
      >
        <stop stop-color="#FF1F00" />
        <stop offset="1" stop-color="#FFD600" />
      </linearGradient>
      <clipPath id="cs_clip_1_number-0">
        <path d="M0 0H200V200H0z" fill="#fff" />
      </clipPath>
    </defs>
    <defs>
      <filter
        filterUnits="objectBoundingBox"
        height="100%"
        id="cs_noise_1_number-0"
        width="100%"
        x="0%"
        y="0%"
      >
        <feBlend in="SourceGraphic" in2="out2" result="out3" />
      </filter>
    </defs>
  </svg>
</template>
