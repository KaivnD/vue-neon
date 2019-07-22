<template>
  <svg width="10000" height="10000" transform="translate(-5000 -5000)">
    <defs>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="url(#smallGrid)"/>
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="gray" stroke-width="0.5"/>
        </pattern>
        <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="gray" stroke-width="0.1"/>
        </pattern>
    </defs>
    <rect width="60000" height="60000" fill="url(#grid)"/>
  </svg>
</template>
