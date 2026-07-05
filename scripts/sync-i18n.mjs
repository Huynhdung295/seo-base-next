import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to parse .env.local manually to avoid dependencies
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local not found');
    process.exit(1);
  }
  
  const content = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  
  content.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^['"]|['"]$/g, '');
      env[key] = value;
    }
  });
  
  return env;
}

async function syncI18n() {
  console.log('🔄 Fetching translation keys from Supabase...');
  
  const env = loadEnv();
  const supabaseUrl = env['SUPABASE_URL'];
  const supabaseKey = env['SUPABASE_ANON_KEY'];

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env.local');
    process.exit(1);
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/translations?select=key`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const keys = data.map(row => row.key).filter(Boolean);

    if (keys.length === 0) {
      console.warn('⚠️ No translation keys found in the database.');
    } else {
      console.log(`✅ Found ${keys.length} keys.`);
    }

    // Generate TypeScript types
    const typeContent = `// ─────────────────────────────────────────────────────────────
// ⚠️ AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
// Run \`npm run sync:i18n\` to update these types from Supabase.
// ─────────────────────────────────────────────────────────────

export type TranslationKey = 
  | ${keys.length > 0 ? keys.map(k => `"${k}"`).join('\n  | ') : 'string'};
`;

    const outputPath = path.resolve(__dirname, '../src/types/i18n.d.ts');
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, typeContent);
    console.log(`🎉 Successfully generated types at src/types/i18n.d.ts`);
    
  } catch (error) {
    console.error('❌ Failed to fetch translations:', error.message);
    process.exit(1);
  }
}

syncI18n();
