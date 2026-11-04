const fs = require('fs');
const { Resvg } = require('@resvg/resvg-js');

// Meticulously crafted SVG replicating EB9AC3AC-559F-4C90-A06A-C5A217E1C9A5.png
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <!-- Background: Pure White -->
    <rect id="bg" width="1000" height="1000" fill="#FFFFFF"/>

    <!-- 1. Left Blue Wave: Rich Azure to Vivid Electric Blue -->
    <linearGradient id="blueWaveGrad" x1="10%" y1="90%" x2="80%" y2="10%">
      <stop offset="0%" stop-color="#0055D4"/>
      <stop offset="25%" stop-color="#006DE6"/>
      <stop offset="55%" stop-color="#0088FF"/>
      <stop offset="80%" stop-color="#14B2FF"/>
      <stop offset="100%" stop-color="#4AD6FF"/>
    </linearGradient>

    <!-- 2. Crest Specular Gleam on Blue Arch -->
    <linearGradient id="crestHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="25%" stop-color="#C2F3FF" stop-opacity="0.75"/>
      <stop offset="60%" stop-color="#00B4F0" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#006DE6" stop-opacity="0"/>
    </linearGradient>

    <!-- 3. Dark Navy/Indigo Shadow inside the under-arch fold -->
    <linearGradient id="underArchShadow" x1="20%" y1="10%" x2="80%" y2="90%">
      <stop offset="0%" stop-color="#002266"/>
      <stop offset="40%" stop-color="#00358C"/>
      <stop offset="80%" stop-color="#0050B8"/>
      <stop offset="100%" stop-color="#006AD4"/>
    </linearGradient>

    <!-- 4. Valley Transition: Deep Blue to Rich Emerald/Teal -->
    <linearGradient id="valleyTealGrad" x1="15%" y1="20%" x2="85%" y2="85%">
      <stop offset="0%" stop-color="#00529E"/>
      <stop offset="25%" stop-color="#007A8A"/>
      <stop offset="55%" stop-color="#009E74"/>
      <stop offset="85%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#22C55E"/>
    </linearGradient>

    <!-- 5. Right Lime-Green Blade: Deep Green base to Vibrant Tech Lime -->
    <linearGradient id="limeBladeGrad" x1="15%" y1="85%" x2="85%" y2="15%">
      <stop offset="0%" stop-color="#0A8738"/>
      <stop offset="28%" stop-color="#1CB536"/>
      <stop offset="60%" stop-color="#5CD61B"/>
      <stop offset="85%" stop-color="#7EE524"/>
      <stop offset="100%" stop-color="#99F032"/>
    </linearGradient>

    <!-- 6. Floating Teal Sphere Shading -->
    <radialGradient id="sphereGrad" cx="35%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#67E8F9"/>
      <stop offset="25%" stop-color="#06B6D4"/>
      <stop offset="60%" stop-color="#0891B2"/>
      <stop offset="88%" stop-color="#0E7490"/>
      <stop offset="100%" stop-color="#155E75"/>
    </radialGradient>

    <!-- Soft diffuse floor shadow -->
    <filter id="softFloorShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#001F3F" flood-opacity="0.07"/>
    </filter>
  </defs>

  <rect width="1000" height="1000" fill="#FFFFFF"/>

  <!-- 3D RIBBON LOGO EMBLEM -->
  <g transform="translate(500, 365)" filter="url(#softFloorShadow)">
    
    <!-- Outer Lime Green Arc Streak -->
    <path d="M 115, -115
             C 142, -65 162, -8 172, 42
             C 176, 64 170, 90 150, 110
             C 130, 130 102, 136 72, 130
             C 105, 124 138, 100 152, 62
             C 166, 18 152, -42 124, -100 Z"
          fill="#84CC16" opacity="0.75"/>

    <!-- Main Right Lime-Green Blade -->
    <path d="M -42, 115
             C 16, 138 78, 112 120, 28
             C 158, -44 184, -120 194, -158
             C 190, -162 182, -156 172, -132
             C 142, -62 112, 18 74, 72
             C 40, 115 -8, 126 -42, 115 Z"
          fill="url(#limeBladeGrad)"/>

    <!-- Inner Chartreuse Highlight Streak -->
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

    <!-- Dominant Left Blue Wave / Arch -->
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

    <!-- Lower Accent Slash on Bottom Left Blue Fin -->
    <path d="M -222, 135
             C -182, 85 -142, 25 -96, -35
             C -100, -25 -136, 35 -172, 95 Z"
          fill="#FFFFFF" opacity="0.45"/>

    <!-- Floating Cyan/Teal Sphere / Orb -->
    <g transform="translate(208, -196)">
      <ellipse cx="0" cy="18" rx="26" ry="9" fill="#001F3F" opacity="0.1"/>
      <circle cx="0" cy="0" r="44" fill="url(#sphereGrad)"/>
      <ellipse cx="-13" cy="-13" rx="15" ry="9" fill="#FFFFFF" opacity="0.8" transform="rotate(-35 -13 -13)"/>
      <circle cx="-18" cy="-18" r="5" fill="#FFFFFF" opacity="0.95"/>
    </g>

  </g>

  <!-- TYPOGRAPHY: NUVONIX (Heavy Bold Navy) -->
  <text x="500" y="645"
        text-anchor="middle"
        font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Plus Jakarta Sans', sans-serif"
        font-weight="900"
        font-size="112"
        letter-spacing="6.5"
        fill="#002046">NUVONIX</text>

  <!-- SUBTITLE: — LABS — -->
  <g transform="translate(500, 705)">
    <line x1="-335" y1="-8" x2="-160" y2="-8" stroke="#5B6B82" stroke-width="5.5" stroke-linecap="round"/>
    
    <text x="0" y="2"
          text-anchor="middle"
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Plus Jakarta Sans', sans-serif"
          font-weight="700"
          font-size="46"
          letter-spacing="22"
          fill="#475569">LABS</text>

    <line x1="160" y1="-8" x2="335" y2="-8" stroke="#5B6B82" stroke-width="5.5" stroke-linecap="round"/>
  </g>
</svg>`;

// Save vector SVG
fs.writeFileSync('./public/logo.svg', svg);
fs.writeFileSync('./src/logo.svg', svg);

// Render high-res PNG (1024x1024)
const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1024 }
});
const pngData = resvg.render();
const pngBuffer = pngData.asPng();

fs.writeFileSync('./image.png', pngBuffer);
fs.writeFileSync('./public/image.png', pngBuffer);
console.log('Successfully written perfect logo to ./image.png and ./public/image.png');
