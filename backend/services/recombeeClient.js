// src/services/recombeeClient.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// ✅ Import the entire module as default
const recombee = require('recombee-api-client');

console.log(process.env.RECOMBEE_DB_ID);

export const client = new recombee.ApiClient(
   'esi-sba-algeria2-0' ,
   'wcizltveBh5y1eTZpX1HW1xhrs1Jy34RRAFKe1HovjWuuyPyRfwa7ct84VqTt1vv' ,
  { region: 'eu-west' }
);

// ✅ Export request classes
export const requests = recombee.requests;
export const { AddUser, SetUserValues, AddItem, SetItemValues, AddRating } = recombee.requests;
export const rqs = await import('recombee-api-client/lib/requests/index.js')
  .catch(async () => await import('recombee-api-client/lib/requests.js'));