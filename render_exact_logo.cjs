const fs = require('fs');
const { Resvg } = require('./node_modules/@resvg/resvg-js');

// Build the exact logo matching user description:
// 1. Stylized 3D ribbon forming flowing letter "N"
// 2. Left stem: curved tapering to sharp point at bottom left, glossy light-to-medium blue gradient.
//    Thin curved white accent line tracing lower inner edge.
// 3. Top loop: darker blue interior shadow establishing 3D depth.
// 4. Center fold: deep teal transitioning to bright green gradient sweeping upward.
// 5. Right stem: rounded tip, thin separate green curved line tracing upper inner edge.
// 6. Dot: hovering above and to the right of green stem, solid teal circular dot.
// 7. Typography:
//    - Primary word: "NUVONIX", bold geometric sans uppercase, solid dark navy blue #001F3F.
//    - Directly beneath: "LABS", significantly thinner sans-serif uppercase, medium gray #64748B.
//    - Widely spaced, flanked symmetrically by two horizontal gray lines sharing same thickness and color.

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="120 70 760 670" width="760" height="670">
  <defs>
    <!-- 1. Left Blue Wave: Glossy light-to-medium cyan/cerulean blue gradient -->
    <linearGradient id="blueWaveGrad" x1="10%" y1="90%" x2="80%" y2="10%">
      <stop offset="0%" stop-color="#0055D4"/>
      <stop offset="25%" stop-color="#006DE6"/>
      <stop offset="55%" stop-color="#0088FF"/>
      <stop offset="80%" stop-color="#14B2FF"/>
      <stop offset="100%" stop-color="#4AD6FF"/>
    </linearGradient>

    <!-- Crest Highlight Gleam on Blue Arch -->
    <linearGradient id="crestHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="25%" stop-color="#C2F3FF" stop-opacity="0.75"/>
      <stop offset="60%" stop-color="#00B4F0" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#006DE6" stop-opacity="0"/>
    </linearGradient>

    <!-- Interior Shadow inside the fold (darker blue interior shadow establishing 3D depth) -->
    <linearGradient id="underArchShadow" x1="20%" y1="10%" x2="80%" y2="90%">
      <stop offset="0%" stop-color="#001F5C"/>
      <stop offset="40%" stop-color="#002F80"/>
      <stop offset="80%" stop-color="#0046A6"/>
      <stop offset="100%" stop-color="#005EC4"/>
    </linearGradient>

    <!-- Center Transition: Deep Teal Fold -->
    <linearGradient id="valleyTealGrad" x1="15%" y1="20%" x2="85%" y2="85%">
      <stop offset="0%" stop-color="#004D80"/>
      <stop offset="25%" stop-color="#006B78"/>
      <stop offset="55%" stop-color="#008C68"/>
      <stop offset="85%" stop-color="#0E9F6E"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>

    <!-- Right Stem: Bright Green Gradient -->
    <linearGradient id="limeBladeGrad" x1="15%" y1="85%" x2="85%" y2="15%">
      <stop offset="0%" stop-color="#0A8738"/>
      <stop offset="28%" stop-color="#1CB536"/>
      <stop offset="60%" stop-color="#5CD61B"/>
      <stop offset="85%" stop-color="#7EE524"/>
      <stop offset="100%" stop-color="#8CE83A"/>
    </linearGradient>

    <!-- Solid Teal Circular Dot -->
    <radialGradient id="sphereGrad" cx="35%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#5EEAD4"/>
      <stop offset="30%" stop-color="#14B8A6"/>
      <stop offset="70%" stop-color="#0D9488"/>
      <stop offset="100%" stop-color="#0F766E"/>
    </radialGradient>

    <!-- Soft diffuse floor shadow -->
    <filter id="softFloorShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#001F3F" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- 3D RIBBON LOGO EMBLEM -->
  <g transform="translate(500, 320)" filter="url(#softFloorShadow)">
    
    <!-- Outer Lime Green Arc Streak (tracing upper inner edge) -->
    <path d="M 115, -115
             C 142, -65 162, -8 172, 42
             C 176, 64 170, 90 150, 110
             C 130, 130 102, 136 72, 130
             C 105, 124 138, 100 152, 62
             C 166, 18 152, -42 124, -100 Z"
          fill="#84CC16" opacity="0.75"/>

    <!-- Main Right Lime-Green Blade (rounded tip at top) -->
    <path d="M -42, 115
             C 16, 138 78, 112 120, 28
             C 158, -44 184, -120 194, -158
             C 190, -162 182, -156 172, -132
             C 142, -62 112, 18 74, 72
             C 40, 115 -8, 126 -42, 115 Z"
          fill="url(#limeBladeGrad)"/>

    <!-- Inner Highlight Streak tracing upper inner edge -->
    <path d="M 165, -130
             C 138, -62 108, 12 72, 66
             C 42, 104 4, 114 -24, 102
             C 6, 108 40, 94 70, 60
             C 102, 12 132, -52 158, -120 Z"
          fill="#BEF264" opacity="0.6"/>

    <!-- Under-Arch Dark Indigo Shadow (Interior Ribbon Fold) -->
    <path d="M -20, -12
             C 18, -46 44, -66 54, -46
             C 66, -20 40, 44 6, 104
             C -24, 150 -70, 152 -104, 118
             C -78, 134 -40, 122 -14, 80
             C 14, 36 28, -14 16, -24
             C 2, -26 -14, -6 -20, -12 Z"
          fill="url(#underArchShadow)"/>

    <!-- Valley Teal Loop (Transition between Blue Arch and Green Blade) -->
    <path d="M -85, 122
             C -55, 150 -5, 142 34, 92
             C 74, 44 102, -25 122, -84
             C 114, -60 88, 6 54, 54
             C 18, 98 -24, 122 -64, 112 Z"
          fill="url(#valleyTealGrad)"/>

    <!-- Dominant Left Blue Wave / Arch (tapering to sharp point at bottom left) -->
    <path d="M -224, 140
             C -178, 70 -122, -14 -50, -94
             C -15, -134 16, -154 42, -144
             C 68, -134 75, -102 52, -36
             C 30, 22 2, 85 -24, 114
             C -54, 146 -102, 150 -138, 112
             C -154, 95 -165, 68 -176, 38
             C -190, 72 -206, 108 -224, 140 Z"
          fill="url(#blueWaveGrad)"/>

    <!-- Crest Highlight Gleam on Blue Curve -->
    <path d="M -210, 125
             C -164, 56 -112, -22 -46, -96
             C -12, -130 18, -146 38, -138
             C 20, -142 -6, -128 -36, -92
             C -96, -24 -148, 50 -188, 110 Z"
          fill="url(#crestHighlight)"/>

    <!-- Thin, curved white accent line tracing lower inner edge -->
    <path d="M -222, 135
             C -182, 85 -142, 25 -96, -35
             C -100, -25 -136, 35 -172, 95 Z"
          fill="#FFFFFF" opacity="0.85"/>

    <!-- Distinct, solid teal circular dot hovering just above and to the right of green stem -->
    <g transform="translate(208, -196)">
      <circle cx="0" cy="0" r="42" fill="url(#sphereGrad)"/>
      <ellipse cx="-12" cy="-12" rx="14" ry="8" fill="#FFFFFF" opacity="0.7" transform="rotate(-35 -12 -12)"/>
      <circle cx="-16" cy="-16" r="4.5" fill="#FFFFFF" opacity="0.95"/>
    </g>
  </g>

  <!-- TWO-TIERED CENTERED TYPOGRAPHY -->
  <!-- 1. Primary Word: NUVONIX (Bold, geometric, sans-serif uppercase font in solid dark navy blue #001F3F) -->
  <text x="500" y="590"
        text-anchor="middle"
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Montserrat', 'Inter', 'SF Pro Display', sans-serif"
        font-weight="900"
        font-size="96"
        letter-spacing="5"
        fill="#001F3F">NUVONIX</text>

  <!-- 2. Secondary Word: LABS with symmetrical horizontal gray lines -->
  <!-- Symmetrically flanked by two horizontal gray lines sharing same thickness and color as LABS -->
  <g transform="translate(500, 650)">
    <!-- Left horizontal line -->
    <line x1="-315" y1="-8" x2="-145" y2="-8" stroke="#64748B" stroke-width="4.5" stroke-linecap="round"/>
    
    <!-- LABS text: significantly thinner, sans-serif uppercase, medium gray #64748B, widely spaced -->
    <text x="0" y="2"
          text-anchor="middle"
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Montserrat', 'Inter', 'SF Pro Display', sans-serif"
          font-weight="600"
          font-size="42"
          letter-spacing="18"
          fill="#64748B">LABS</text>

    <!-- Right horizontal line -->
    <line x1="145" y1="-8" x2="315" y2="-8" stroke="#64748B" stroke-width="4.5" stroke-linecap="round"/>
  </g>
</svg>`;

// Write to files
fs.writeFileSync('./public/logo.svg', svg);
fs.writeFileSync('./src/logo.svg', svg);

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 }
});
const pngData = resvg.render();
const pngBuf = pngData.asPng();

fs.writeFileSync('./image.png', pngBuf);
fs.writeFileSync('./public/image.png', pngBuf);
console.log('Successfully generated exact logo PNG and SVG, size:', pngBuf.length);
