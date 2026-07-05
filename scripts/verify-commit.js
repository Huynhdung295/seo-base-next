const fs = require('fs');

const msgPath = process.argv[2];
if (!msgPath) {
  console.error('❌ Commit message file path not found.');
  process.exit(1);
}

const msg = fs.readFileSync(msgPath, 'utf-8').trim();

// Skip merge commits
if (msg.startsWith('Merge branch') || msg.startsWith('Merge pull request')) {
  process.exit(0);
}

// Regex: Matches [Alphanumeric/Dash] followed by " - " and the message
const commitRE = /^\[[a-zA-Z0-9_-]+\] - .+/;

if (!commitRE.test(msg)) {
  console.error(`\n❌ ERROR: Invalid Commit Message Format!`);
  console.error(`\nRequired format: [USER] - commit message`);
  console.error(`\n✅ Valid examples:`);
  console.error(`  [BOT] - update tailwind configuration`);
  console.error(`  [AGENT-1] - fix homepage rendering bug`);
  console.error(`  [HOST] - update README.md\n`);
  
  process.exit(1);
}
