<script setup lang="ts">
/** Decorative shape for this block. SVG attribute names stay kebab-case, not camelCase — the DOM only recognizes that form. */
</script>

<template>
  <svg
    class="coolshapes wheel-1"
    fill="none"
    height="400"
    viewBox="0 0 200 200"
    width="400"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    v-bind="$attrs"
  >
    <g clip-path="url(#cs_clip_1_wheel-1)">
      <mask
        height="200"
        id="cs_mask_1_wheel-1"
        maskUnits="userSpaceOnUse"
        style="mask-type: alpha"
        width="200"
        x="0"
        y="0"
      >
        <path
          d="M117 0H83l12.468 89.06L41.31 17.269 17.268 41.31 89.06 95.468 0 83v34l89.06-12.468-71.791 54.158 24.041 24.042 54.158-71.792L83 200h34l-12.468-89.06 54.158 71.792 24.041-24.042-71.791-54.158L200 117V83l-89.06 12.468 71.792-54.158-24.042-24.042-54.158 71.792L117 0z"
          fill="#fff"
        />
      </mask>
      <g mask="url(#cs_mask_1_wheel-1)">
        <path d="M200.001 0h-200v200h200V0z" fill="#fff" />
        <path d="M200.001 0h-200v200h200V0z" fill="#0E6FFF" />
        <g filter="url(#filter0_f_748_4854)">
          <path d="M231 114H9v116h222V114z" fill="#8F5BFF" />
          <ellipse
            cx="53.016"
            cy="0.222"
            fill="#00F0FF"
            rx="111.935"
            ry="76.871"
            transform="rotate(-15 53.016 .222)"
          />
        </g>
      </g>
    </g>
    <g mask="url(#cs_mask_1_wheel-1)" style="mix-blend-mode: overlay">
      <path
        d="M200 0H0v200h200V0z"
        fill="gray"
        filter="url(#cs_noise_1_wheel-1)"
        stroke="transparent"
      />
    </g>
    <defs>
      <filter
        color-interpolation-filters="sRGB"
        filterUnits="userSpaceOnUse"
        height="429.502"
        id="filter0_f_748_4854"
        width="407.938"
        x="-116.938"
        y="-139.502"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_748_4854"
          stdDeviation="30"
        />
      </filter>
      <clipPath id="cs_clip_1_wheel-1">
        <path d="M0 0H200V200H0z" fill="#fff" />
      </clipPath>
    </defs>
    <defs>
      <filter
        filterUnits="objectBoundingBox"
        height="100%"
        id="cs_noise_1_wheel-1"
        width="100%"
        x="0%"
        y="0%"
      >
        <feBlend in="SourceGraphic" in2="out2" result="out3" />
      </filter>
    </defs>
  </svg>
</template>
