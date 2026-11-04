const fs = require('fs');

// Create high-res SVG that replicates the exact Nuvonix Labs logo
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <!-- Azure to Deep Blue ribbon gradient -->
    <linearGradient id="blueRibbon" x1="0%" y1="100%" x2="60%" y2="0%">
      <stop offset="0%" stop-color="#0052CC"/>
      <stop offset="40%" stop-color="#0080FF"/>
      <stop offset="70%" stop-color="#26A0FC"/>
      <stop offset="100%" stop-color="#70C8FF"/>
    </linearGradient>

    <!-- Under-fold inner shadow/dark blue -->
    <linearGradient id="innerFold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#003D99"/>
      <stop offset="50%" stop-color="#004FB8"/>
      <stop offset="100%" stop-color="#0077E6"/>
    </linearGradient>

    <!-- Teal transition curve -->
    <linearGradient id="tealLoop" x1="0%" y1="0%" x2="100%" y2="80%">
      <stop offset="0%" stop-color="#0077B6"/>
      <stop offset="35%" stop-color="#009688"/>
      <stop offset="70%" stop-color="#00BFA5"/>
      <stop offset="100%" stop-color="#38D39F"/>
    </linearGradient>

    <!-- Lime / Vibrant Tech Green right blade -->
    <linearGradient id="greenBlade" x1="20%" y1="100%" x2="80%" y2="0%">
      <stop offset="0%" stop-color="#0A8F4D"/>
      <stop offset="30%" stop-color="#28B84B"/>
      <stop offset="70%" stop-color="#6BCF38"/>
      <stop offset="100%" stop-color="#8CE83A"/>
    </linearGradient>

    <!-- Cyan / Teal sphere gradient -->
    <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#7FE5FF"/>
      <stop offset="40%" stop-color="#00B4D8"/>
      <stop offset="85%" stop-color="#007799"/>
      <stop offset="100%" stop-color="#005B7F"/>
    </radialGradient>

    <!-- White highlight sheen -->
    <linearGradient id="whiteSheen" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
      <stop offset="40%" stop-color="#FFFFFF" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient>

    <filter id="dropGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#003D99" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="800" height="800" fill="#FFFFFF"/>

  <!-- Main Mark Group -->
  <g transform="translate(400, 290)" filter="url(#dropGlow)">
    <!-- Right Green Stroke / Blade -->
    <path d="M-20,70 C15,110 55,90 90,0 C125,-90 145,-155 155,-180 C150,-150 120,-80 85,20 C50,115 5,145 -45,125 C-52,122 -58,118 -62,112 Z" fill="url(#greenBlade)"/>

    <!-- Green inner blade highlight -->
    <path d="M-10,75 C20,110 50,85 85,5 C120,-85 135,-140 145,-165 C138,-135 115,-70 80,25 C45,115 10,135 -35,118 Z" fill="#9EF048" opacity="0.45"/>

    <!-- Left Blue Arch to Loop (Ribbon N) -->
    <path d="M-190,130 C-145,60 -95,-30 -30,-115 C-2,-155 25,-175 55,-165 C85,-155 95,-120 70,-50 C45,20 15,90 -10,120 C-45,160 -100,165 -135,120 C-148,102 -155,80 -160,55 C-170,80 -180,105 -190,130 Z" fill="url(#blueRibbon)"/>

    <!-- Deep fold under arch -->
    <path d="M-5,-10 C25,-55 55,-90 70,-65 C85,-40 65,30 25,95 C-5,145 -55,160 -95,130 C-65,135 -25,110 0,65 Z" fill="url(#tealLoop)"/>

    <!-- Glossy Highlight across top of left arch -->
    <path d="M-175,115 C-135,50 -85,-35 -25,-118 C2,-152 24,-168 48,-160 C32,-163 12,-150 -12,-120 C-70,-45 -120,40 -160,105 Z" fill="url(#whiteSheen)"/>

    <!-- Floating Cyan/Teal Orb -->
    <circle cx="170" cy="-215" r="34" fill="url(#sphereGrad)"/>
    <!-- Orb specular reflection -->
    <ellipse cx="160" cy="-225" rx="10" ry="6" fill="#FFFFFF" opacity="0.75" transform="rotate(-30 160 -225)"/>
  </g>

  <!-- Typography: NUVONIX -->
  <text x="400" y="550" 
        text-anchor="middle" 
        font-family="-apple-system, BlinkMacSystemFont, 'Montserrat', 'Plus Jakarta Sans', 'Inter', sans-serif" 
        font-weight="900" 
        font-size="94" 
        letter-spacing="5" 
        fill="#002046">NUVONIX</text>

  <!-- Subline: — LABS — -->
  <g transform="translate(400, 608)">
    <!-- Left bar -->
    <line x1="-270" y1="-7" x2="-140" y2="-7" stroke="#64748B" stroke-width="4.5" stroke-linecap="round"/>
    
    <!-- Text LABS -->
    <text x="0" y="0" 
          text-anchor="middle" 
          font-family="-apple-system, BlinkMacSystemFont, 'Montserrat', 'Plus Jakarta Sans', 'Inter', sans-serif" 
          font-weight="700" 
          font-size="40" 
          letter-spacing="18" 
          fill="#475569">LABS</text>

    <!-- Right bar -->
    <line x1="140" y1="-7" x2="270" y2="-7" stroke="#64748B" stroke-width="4.5" stroke-linecap="round"/>
  </g>
</svg>`;

fs.writeFileSync('./public/logo.svg', svgContent);
fs.writeFileSync('./src/logo.svg', svgContent);
console.log('Saved vector logo SVG');
