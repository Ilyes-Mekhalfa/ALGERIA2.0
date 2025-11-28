import recombee from 'recombee-api-client';
const rqs = recombee.requests;

const dbId = (process.env.RECOMBEE_DB_ID || '').trim();
const apiKey = (process.env.RECOMBEE_API_KEY || '').trim();

console.log('[diag] Using DB_ID length:', dbId.length, 'API_KEY length:', apiKey.length ? apiKey.length : 0);
console.log('[diag] DB_ID (masked):', dbId ? dbId.slice(0, 6) + '...' : '(empty)');

if (!dbId || !apiKey) {
  console.error('[diag] RECOMBEE_DB_ID or RECOMBEE_API_KEY is missing. Set them and re-run:');
  console.error('  set RECOMBEE_DB_ID=your-db-id');
  console.error('  set RECOMBEE_API_KEY=your-private-token');
  process.exit(1);
}

const client = new recombee.ApiClient(dbId, apiKey, { region: process.env.RECOMBEE_REGION || undefined });

(async () => {
  try {
    console.log('[diag] Sending ListItemProperties request...');
    const res = await client.send(new rqs.ListItemProperties());
    console.log('[diag] Success. Response example:', JSON.stringify(res, null, 2).slice(0, 500));
  } catch (err) {
    console.error('[diag] Error calling Recombee:');
    // Print structured info if available
    if (err && typeof err === 'object') {
      console.error('  statusCode:', err.statusCode || err.status || '(none)');
      console.error('  message:', err.message || '(no message)');
      if (err.body) {
        try {
          console.error('  body:', typeof err.body === 'string' ? err.body : JSON.stringify(err.body));
        } catch (e) {
          console.error('  body: [unprintable]');
        }
      }
    } else {
      console.error(err);
    }
    console.error('\nHints:');
    console.error('- Make sure you are using the PRIVATE token from Recombee (not a public token).');
    console.error('- Tokens are case-sensitive and must not include extra quotes or whitespace.');
    console.error('- Verify DB ID is exact (case-sensitive).');
    console.error('- If your network blocks outbound requests, run this machine with internet access or set a proxy.');
    process.exit(2);
  }
})();