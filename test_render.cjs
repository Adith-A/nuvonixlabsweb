const fs = require('fs');
const { Resvg } = require('./node_modules/@resvg/resvg-js');

// Read render_perfect_logo.cjs
const content = fs.readFileSync('render_perfect_logo.cjs', 'utf8');
console.log("Original logo script length:", content.length);
