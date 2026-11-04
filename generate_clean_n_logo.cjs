const fs = require('fs');
const { Resvg } = require('./node_modules/@resvg/resvg-js');

// High precision, clearly legible 3D Ribbon "N" Logo
// Specifically addressing: "The logo is more of a blob, then an N"
// We ensure distinct left vertical stem, clear diagonal traverse, distinct right vertical stem,
// with open negative space so the letter "N" is immediately recognizable from across the room.

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 800" width="900" height="800">
  <defs>
    <!-- Left Blue Stem Gradient: Glossy light-to-medium cyan/cerulean blue -->
    <linearGradient id="blueStemGrad" x1="15%" y1="95%" x2="75%" y2="5%">
      <stop offset="0%" stop-color="#0052D4"/>
      <stop offset="25%" stop-color="#006CE6"/>
      <stop offset="60%" stop-color="#0088FF"/>
      <stop offset="85%" stop-color="#22B8FF"/>
      <stop offset="100%" stop-color="#56D4FF"/>
    </linearGradient>

    <!-- Top Crest Specular Highlight -->
    <linearGradient id="crestGleam" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="30%" stop-color="#C5F2FF" stop-opacity="0.7"/>
      <stop offset="70%" stop-color="#38C8FF" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0072E6" stop-opacity="0"/>
    </linearGradient>

    <!-- Diagonal Transition: Darker blue interior shadow to deep teal to green -->
    <linearGradient id="diagonalGrad" x1="10%" y1="10%" x2="80%" y2="90%">
      <stop offset="0%" stop-color="#002D7A"/>
      <stop offset="20%" stop-color="#003D99"/>
      <stop offset="45%" stop-color="#005B9E"/>
      <stop offset="70%" stop-color="#007B8C"/>
      <stop offset="88%" stop-color="#009E74"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>

    <!-- Interior Under-Fold Dark Shadow (depth under loop) -->
    <linearGradient id="innerShadowGrad" x1="30%" y1="0%" x2="70%" y2="100%">
      <stop offset="0%" stop-color="#001F5C"/>
      <stop offset="40%" stop-color="#002875"/>
      <stop offset="80%" stop-color="#00358C"/>
      <stop offset="100%" stop-color="#0048A8" stop-opacity="0.2"/>
    </linearGradient>

    <!-- Right Green Stem Gradient: Deep teal at trough into bright lime green sweeping up -->
    <linearGradient id="greenStemGrad" x1="10%" y1="90%" x2="80%" y2="10%">
      <stop offset="0%" stop-color="#009668"/>
      <stop offset="20%" stop-color="#059669"/>
      <stop offset="45%" stop-color="#10B981"/>
      <stop offset="70%" stop-color="#22C55E"/>
      <stop offset="88%" stop-color="#65D92A"/>
      <stop offset="100%" stop-color="#8CE83A"/>
    </linearGradient>

    <!-- Floating Teal Dot Radial Shading -->
    <radialGradient id="tealDotGrad" cx="35%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#5EEAD4"/>
      <stop offset="30%" stop-color="#14B8A6"/>
      <stop offset="70%" stop-color="#0D9488"/>
      <stop offset="100%" stop-color="#0F766E"/>
    </radialGradient>

    <!-- Subtle diffuse drop shadow -->
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#001F3F" flood-opacity="0.08"/>
    </filter>
  </defs>

  <!-- 3D RIBBON LETTER "N" GRAPHIC -->
  <g transform="translate(450, 310)" filter="url(#softGlow)">
    
    <!-- 1. DIAGONAL RIBBON TRAVERSE (Connects top-left crest down to bottom-right trough) -->
    <!-- Descends diagonally, creating 3D depth and clear "N" diagonal stroke -->
    <path d="M -52,-132
             C -20,-80 15,-10 46,72
             C 52,90 54,108 48,124
             C 42,138 28,148 10,146
             C -6,144 -18,134 -24,120
             C -32,100 -24,70 -8,22
             C 10,-30 -8,-95 -44,-136 Z"
          fill="url(#diagonalGrad)"/>

    <!-- 2. UNDER-FOLD INTERIOR SHADOW (Immediately under top-left crest) -->
    <path d="M -68,-120
             C -45,-75 -25,-25 -10,35
             C -16,42 -26,38 -32,25
             C -46,-10 -65,-60 -78,-100 Z"
          fill="url(#innerShadowGrad)"/>

    <!-- 3. RIGHT GREEN STEM (Sweeps upward to form the right stem of the "N" with rounded tip) -->
    <path d="M 6,138
             C 28,144 52,126 68,96
             C 88,60 114,-5 138,-85
             C 146,-110 156,-130 170,-132
             C 182,-134 190,-122 186,-106
             C 180,-85 166,-50 152,-12
             C 134,38 110,95 82,130
             C 62,154 36,164 12,158
             C -2,154 -2,142 6,138 Z"
          fill="url(#greenStemGrad)"/>

    <!-- 4. THIN SEPARATE GREEN CURVED LINE (Tracing upper inner edge of right stem) -->
    <path d="M 124,-138
             C 145,-150 168,-148 178,-134
             C 182,-126 178,-114 170,-106
             C 158,-94 150,-108 142,-120
             C 136,-128 130,-134 124,-138 Z"
          fill="#A3E635" opacity="0.9"/>

    <!-- Inner chartreuse gleam on right stem blade -->
    <path d="M 154,-100
             C 142,-55 124,5 102,55
             C 96,68 88,80 80,88
             C 86,72 98,42 112,-2
             C 126,-46 142,-88 154,-100 Z"
          fill="#BEF264" opacity="0.65"/>

    <!-- 5. LEFT BLUE STEM (Dominant upright stem, tapers to a sharp point at bottom-left) -->
    <!-- Curves up, crests at top left, forming the left upright of the "N" -->
    <path d="M -180,154
             C -145,80 -108,-5 -76,-90
             C -64,-122 -48,-148 -24,-152
             C -2,-156 12,-142 10,-122
             C 8,-106 -4,-90 -20,-70
             C -44,-42 -68,16 -96,80
             C -118,126 -146,160 -174,166
             C -180,166 -182,160 -180,154 Z"
          fill="url(#blueStemGrad)"/>

    <!-- 6. CREST SPECULAR HIGHLIGHT on top left loop -->
    <path d="M -170,140
             C -138,72 -102,-8 -72,-88
             C -58,-124 -40,-146 -18,-146
             C -32,-148 -52,-132 -68,-96
             C -98,-20 -134,56 -162,125 Z"
          fill="url(#crestGleam)"/>

    <!-- 7. THIN CURVED WHITE ACCENT LINE (Tracing lower inner edge of blue section) -->
    <!-- Creates the raised, layered, or folded visual effect -->
    <path d="M -178,158
             C -148,110 -118,52 -88,-12
             C -92,-4 -120,58 -148,118
             C -164,150 -176,160 -178,158 Z"
          fill="#FFFFFF" opacity="0.85"/>

    <!-- 8. DISTINCT SOLID TEAL CIRCULAR DOT (Hovering just above and to right of green stem) -->
    <g transform="translate(192, -165)">
      <circle cx="0" cy="0" r="36" fill="url(#tealDotGrad)"/>
      <ellipse cx="-10" cy="-10" rx="12" ry="7" fill="#FFFFFF" opacity="0.75" transform="rotate(-35 -10 -10)"/>
      <circle cx="-14" cy="-14" r="4" fill="#FFFFFF" opacity="0.95"/>
    </g>

  </g>

  <!-- TWO-TIERED CENTERED TYPOGRAPHY -->
  <!-- 1. Primary Word: NUVONIX (Bold, geometric, sans-serif uppercase font in solid dark navy blue #001F3F) -->
  <text x="450" y="590"
        text-anchor="middle"
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Montserrat', 'Inter', 'SF Pro Display', sans-serif"
        font-weight="900"
        font-size="94"
        letter-spacing="5.5"
        fill="#001F3F">NUVONIX</text>

  <!-- 2. Secondary Word: LABS with symmetrical horizontal gray lines -->
  <g transform="translate(450, 650)">
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

fs.writeFileSync('./public/logo.svg', svg);
fs.writeFileSync('./src/logo.svg', svg);

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 }
});
const pngData = resvg.render();
const pngBuf = pngData.asPng();

fs.writeFileSync('./image.png', pngBuf);
fs.writeFileSync('./public/image.png', pngBuf);
console.log('Successfully generated new distinct Ribbon N logo, size:', pngBuf.length);
