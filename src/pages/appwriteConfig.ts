import { Client, Account } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65fe59b5408c35449512');

// Export Account
export const account = new Account(client);

// Export the Appwrite client
export default client;

// Set CORS headers for all Appwrite API requests
// appwrite.setHeaders({
//   "Access-Control-Allow-Origin":
//     "https://edas-p3fcy9xhd-mplanner12s-projects.vercel.app",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// });
