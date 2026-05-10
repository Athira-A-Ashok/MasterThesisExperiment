// complexity.js
// Usage: node final_metrics/complexity.js J1
//        node final_metrics/complexity.js S76

const fs = require('fs');
const path = require('path');

const participant = process.argv[2];

if (!participant) {
  console.error('Please provide participant ID.');
  console.error('Examples:');
  console.error('  node final_metrics/complexity.js J1');
  console.error('  node final_metrics/complexity.js S76');
  process.exit(1);
}

const srcDir = path.join('final_experiment', participant, 'src');

if (!fs.existsSync(srcDir)) {
  console.error(`Source directory not found: ${srcDir}`);
  process.exit(1);
}

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getFiles(fullPath, fileList);
    } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function computeCyclomaticComplexity(code) {
  const patterns = [
    /\bif\s*\(/g,
    /\belse\s+if\s*\(/g,
    /\bwhile\s*\(/g,
    /\bfor\s*\(/g,
    /\bcase\s+/g,
    /\bcatch\s*\(/g,
    /\?\s*[^:]/g,
    /&&/g,
    /\|\|/g,
  ];
  let count = 1;
  for (const pattern of patterns) {
    const matches = code.match(pattern);
    if (matches) count += matches.length;
  }
  return count;
}

function computeHalstead(code) {
  const operatorPattern = /(\+\+|--|&&|\|\||[+\-*/%=<>!&|^~?:;,{}()\[\]])/g;
  const operandPattern = /\b([a-zA-Z_$][a-zA-Z0-9_$]*|[0-9]+(\.[0-9]+)?|"[^"]*"|'[^']*'|`[^`]*`)\b/g;

  const operators = new Set();
  const operands = new Set();
  let totalOperators = 0;
  let totalOperands = 0;

  let m;
  while ((m = operatorPattern.exec(code)) !== null) {
    operators.add(m[0]);
    totalOperators++;
  }
  while ((m = operandPattern.exec(code)) !== null) {
    operands.add(m[1]);
    totalOperands++;
  }

  const n1 = operators.size;
  const n2 = operands.size;
  const N1 = totalOperators;
  const N2 = totalOperands;
  const vocabulary = n1 + n2;
  const length = N1 + N2;
  const volume = length > 0 && vocabulary > 1
    ? length * Math.log2(vocabulary)
    : 0;

  return { volume, length, vocabulary };
}

function countLines(code) {
  const lines = code.split('\n');
  const nonEmpty = lines.filter(l => l.trim().length > 0);
  return { total: lines.length, nonEmpty: nonEmpty.length };
}

function computeMaintainabilityIndex(halsteadVolume, cyclomaticComplexity, linesOfCode) {
  const HV = Math.max(halsteadVolume, 1);
  const CC = cyclomaticComplexity;
  const LOC = Math.max(linesOfCode, 1);
  const mi = 171
    - 5.2 * Math.log(HV)
    - 0.23 * CC
    - 16.2 * Math.log(LOC);
  const normalized = Math.max(0, Math.min(100, (mi / 171) * 100));
  return parseFloat(normalized.toFixed(2));
}

function computeReadabilityScore(code, cyclomaticComplexity) {
  const lines = code.split('\n').filter(l => l.trim().length > 0);
  if (lines.length === 0) return 0;
  const avgLineLength = lines.reduce((sum, l) => sum + l.length, 0) / lines.length;
  let maxDepth = 0;
  let currentDepth = 0;
  for (const ch of code) {
    if (ch === '{') { currentDepth++; maxDepth = Math.max(maxDepth, currentDepth); }
    if (ch === '}') currentDepth = Math.max(0, currentDepth - 1);
  }
  const score = (avgLineLength / 10) + (cyclomaticComplexity * 0.5) + (maxDepth * 0.8);
  return parseFloat(score.toFixed(2));
}

const files = getFiles(srcDir);

if (files.length === 0) {
  console.error(`No JS/JSX files found in ${srcDir}`);
  process.exit(1);
}

let totalCC = 0;
let totalMI = 0;
let totalRS = 0;
let totalLOC = 0;
const fileResults = [];

for (const file of files) {
  const code = fs.readFileSync(file, 'utf8');
  const { nonEmpty } = countLines(code);
  const cc = computeCyclomaticComplexity(code);
  const halstead = computeHalstead(code);
  const mi = computeMaintainabilityIndex(halstead.volume, cc, nonEmpty);
  const rs = computeReadabilityScore(code, cc);

  totalCC += cc;
  totalMI += mi;
  totalRS += rs;
  totalLOC += nonEmpty;

  fileResults.push({
    file: path.relative(srcDir, file),
    lines: nonEmpty,
    cyclomaticComplexity: cc,
    maintainabilityIndex: mi,
    readabilityScore: rs
  });
}

const count = files.length;
const avgCC = parseFloat((totalCC / count).toFixed(2));
const avgMI = parseFloat((totalMI / count).toFixed(2));
const avgRS = parseFloat((totalRS / count).toFixed(2));

console.log('==========================================');
console.log(`Code Complexity Results for ${participant}`);
console.log('==========================================');
console.log(`Files Analysed      : ${count}`);
console.log(`Total LOC           : ${totalLOC}`);
console.log('');
console.log('--- Per File Results ---');
fileResults.forEach(f => {
  console.log(`  ${f.file}`);
  console.log(`    Lines              : ${f.lines}`);
  console.log(`    Cyclomatic         : ${f.cyclomaticComplexity}`);
  console.log(`    Maintainability    : ${f.maintainabilityIndex}`);
  console.log(`    Readability        : ${f.readabilityScore}`);
});
console.log('');
console.log('--- AVERAGES (use these in dataset) ---');
console.log(`cyclomatic_complexity : ${avgCC}`);
console.log(`maintainability_index : ${avgMI}`);
console.log(`readability_score     : ${avgRS}`);
console.log('==========================================');

const output = {
  participant,
  filesAnalysed: count,
  totalLOC,
  cyclomatic_complexity: avgCC,
  maintainability_index: avgMI,
  readability_score: avgRS,
  files: fileResults
};

const outPath = path.join('final_metrics', `final_${participant}_complexity.json`);
fs.mkdirSync('final_metrics', { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`Results saved to: ${outPath}`);