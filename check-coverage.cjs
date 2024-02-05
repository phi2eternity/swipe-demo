const fs = require('fs');

const coverageSummaryPath = 'coverage/coverage-summary.json';

if (!fs.existsSync(coverageSummaryPath)) {
    console.error('Coverage summary not found. Run "npm run test:coverage" first.');
    process.exit(1);
}

const coverageSummary = JSON.parse(fs.readFileSync(coverageSummaryPath, 'utf8'));
const totalCoverage = coverageSummary.total;

if (totalCoverage.lines.pct < 80 || totalCoverage.statements.pct < 80 || totalCoverage.functions.pct < 80 || totalCoverage.branches.pct < 80) {
    console.error('Code coverage is below 80%. Commit denied.');
    process.exit(1);
}
