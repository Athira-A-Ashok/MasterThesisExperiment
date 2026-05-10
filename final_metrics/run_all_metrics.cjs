// run_all_metrics.js
// Usage: node final_metrics/run_all_metrics.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const results = [];

const participants = [];
for (let i = 1; i <= 75; i++) participants.push(`J${i}`);
for (let i = 76; i <= 150; i++) participants.push(`S${i}`);

console.log('==========================================');
console.log('Running metrics for all participants...');
console.log('==========================================\n');

for (const id of participants) {
  const srcDir = path.join('final_experiment', id, 'src');

  if (!fs.existsSync(srcDir)) {
    console.log(`Skipping ${id} — src folder not found`);
    continue;
  }

  console.log(`Processing ${id}...`);

  try {
    execSync(
      `npx eslint ${srcDir}/ --format json -o final_metrics/final_${id}_eslint.json 2>/dev/null || true`,
      { stdio: 'pipe' }
    );
  } catch (e) {
    // ESLint returns exit code 1 when errors found — that is fine
  }

  let eslintErrors = 0;
  const eslintFile = path.join('final_metrics', `final_${id}_eslint.json`);
  if (fs.existsSync(eslintFile)) {
    try {
      const raw = fs.readFileSync(eslintFile, 'utf8');
      const parsed = JSON.parse(raw);
      parsed.forEach(f => { eslintErrors += f.errorCount || 0; });
    } catch (e) {
      eslintErrors = 0;
    }
  }

  try {
    execSync(`node final_metrics/complexity.cjs ${id}`, { stdio: 'pipe' });
  } catch (e) {
    console.log(`  Complexity error for ${id}: ${e.message}`);
    continue;
  }

  const complexityFile = path.join('final_metrics', `final_${id}_complexity.json`);
  if (fs.existsSync(complexityFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(complexityFile, 'utf8'));
      results.push({
        participant_id: id,
        experience_level: id.startsWith('J') ? 'junior' : 'senior',
        eslint_errors: eslintErrors,
        cyclomatic_complexity: data.cyclomatic_complexity,
        maintainability_index: data.maintainability_index,
        readability_score: data.readability_score
      });
      console.log(`  ${id} done — ESLint: ${eslintErrors} | CC: ${data.cyclomatic_complexity} | MI: ${data.maintainability_index} | RS: ${data.readability_score}`);
    } catch (e) {
      console.log(`  Could not read results for ${id}`);
    }
  }
}

const csvHeader = 'participant_id,experience_level,eslint_errors,cyclomatic_complexity,maintainability_index,readability_score';
const csvRows = results.map(r =>
  `${r.participant_id},${r.experience_level},${r.eslint_errors},${r.cyclomatic_complexity},${r.maintainability_index},${r.readability_score}`
);
const csv = [csvHeader, ...csvRows].join('\n');
fs.writeFileSync(path.join('final_metrics', 'all_code_metrics.csv'), csv);

console.log('\n==========================================');
console.log(`Done! Processed ${results.length} participants`);
console.log('Results saved to: final_metrics/all_code_metrics.csv');
console.log('==========================================');