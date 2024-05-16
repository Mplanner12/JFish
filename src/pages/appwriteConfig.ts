import { Client, Account } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6645ddbf001119e1023a');

// Export Account
export const account = new Account(client);

// Export the Appwrite client
export default client;
