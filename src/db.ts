import { Pool } from "pg";


//var conString = "postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";

const connectionString = 'postgres://postgres:senhapostgresql@localhost:15432/user-authentication-api';

const db = new Pool({connectionString});

export default db;