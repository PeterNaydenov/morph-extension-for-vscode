const fs = require('fs');
const path = require('path');

// Simple contrast ratio calculation
function getLuminance(color) {
  const rgb = hexToRgb(color);
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function checkContrast(foreground, background, element) {
  const ratio = getContrastRatio(foreground, background);
  const passesAA = ratio >= 4.5;
  const passesAAA = ratio >= 7;
  
  return {
    element,
    foreground,
    background,
    ratio: parseFloat(ratio.toFixed(2)),
    passesAA,
    passesAAA
  };
}

function validateTheme(themePath) {
  const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));
  const results = [];
  
  // Get editor colors
  const bg = theme.colors?.['editor.background'] || '#ffffff';
  const fg = theme.colors?.['editor.foreground'] || '#000000';
  
  // Check editor contrast
  results.push(checkContrast(fg, bg, 'editor.foreground/editor.background'));
  
  // Check token colors against editor background
  theme.tokenColors?.forEach(token => {
    if (token.settings.foreground) {
      results.push(checkContrast(
        token.settings.foreground,
        bg,
        `${token.name || 'token'}`
      ));
    }
  });
  
  return results;
}

function main() {
  const themes = [
    './src/themes/morph-light.json',
    './src/themes/morph-dark.json'
  ];
  
  let allPassed = true;
  
  themes.forEach(themePath => {
    console.log(`\nValidating theme: ${themePath}`);
    const results = validateTheme(themePath);
    
    results.forEach(result => {
      const status = result.passesAA ? '✓' : '✗';
      const aaaStatus = result.passesAAA ? '✓' : '✗';
      console.log(`${status} ${result.element}: ${result.ratio}:1 (AA: ${status} AAA: ${aaaStatus})`);
      
      if (!result.passesAA) {
        allPassed = false;
        console.log(`  ❌ FAIL: ${result.foreground} on ${result.background} - Ratio ${result.ratio} < 4.5:1`);
      }
    });
  });
  
  console.log(`\n${allPassed ? '✅' : '❌'} Contrast validation ${allPassed ? 'passed' : 'failed'}`);
  process.exit(allPassed ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { validateTheme, checkContrast };
