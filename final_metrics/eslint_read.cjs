// eslint_read.js
// Usage: node final_metrics/eslint_read.js J1
//        node final_metrics/eslint_read.js S76

const fs = require('fs');
const path = require('path');

const participant = process.argv[2];

if (!participant) {
  console.error('Please provide participant ID.');
  console.error('Examples:');
  console.error('  node final_metrics/eslint_read.js J1');
  console.error('  node final_metrics/eslint_read.js S76');
  process.exit(1);
}

const jsonFile = path.join('final_metrics', `final_${participant}_eslint.json`);

if (!fs.existsSync(jsonFile)) {
  console.error(`ESLint JSON file not found: ${jsonFile}`);
  console.error(`Please run first:`);
  console.error(`  npx eslint final_experiment/${participant}/src/ --format json -o final_metrics/final_${participant}_eslint.json`);
  process.exit(1);
}

try {
  const raw = fs.readFileSync(jsonFile, 'utf8');
  const results = JSON.parse(raw);

  let totalErrors = 0;
  let totalWarnings = 0;
  let fileCount = 0;

  results.forEach(file => {
    totalErrors += file.errorCount || 0;
    totalWarnings += file.warningCount || 0;
    if (file.errorCount > 0 || file.warningCount > 0) {
      fileCount++;
    }
  });

  console.log('==========================================');
  console.log(`ESLint Results for ${participant}`);
  console.log('==========================================');
  console.log(`Total Files Scanned : ${results.length}`);
  console.log(`Files with Issues   : ${fileCount}`);
  console.log(`Total Errors        : ${totalErrors}`);
  console.log(`Total Warnings      : ${totalWarnings}`);
  console.log('------------------------------------------');
  console.log(`eslint_errors       : ${totalErrors}`);
  console.log('==========================================');

} catch (err) {
  console.error('Error reading ESLint JSON:', err.message);
  process.exit(1);
}