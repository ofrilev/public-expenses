import {Client, Pool} from 'pg';

import { createClient } from '@supabase/supabase-js'
import { connect } from 'net';

// Create a single supabase client for interacting with your database

export const  subBaseConnect = () => {
    createClient('https://vancvzgqrypvfumnwasl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhbmN2emdxcnlwdmZ1bW53YXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNjAzNzEsImV4cCI6MjAxNDkzNjM3MX0.0fgZ1IMZ3FjjPc-ulII29l3po-Y_H6lZv2yrzOgTnCc');
}

const clientConfig = new Client({
    // user: process.env.db_user_name,
    password: process.env.db_password,
    user: "postgres",
    host: 'localhost',
    database: 'postgres',
    port: 5432, // default PostgreSQL port
});
export const connectToDb =  (): Client => {
    try {
        const client = new Client(clientConfig);
        client.connect();
        return client
    } catch (err) {
        console.error('Error connecting to database:', err);
        throw err;
    }
};
export const newPool = () => {
    return (new Pool({
        connectionString: `postgres://${process.env.db_user_name}:${process.env.db_password}@localhost:5432/expensessDB`,
    }));


}

