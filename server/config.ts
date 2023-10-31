interface DatabaseConfig {
  connectionLimit: number,
  host: string,
  user: string,
  password: string,
  database: string,
}
let databaseConfig: DatabaseConfig;
if(process.env.NODE_ENV === 'production') { //AWS
  databaseConfig = {
    connectionLimit: 200,
    host: process.env.PRODUCTION_HOST,
    user: process.env.PRODUCTION_ROOT,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
  };
}

if(process.env.NODE_ENV === 'development') { //LOCAL
  databaseConfig = {
    connectionLimit: 200,
    host: process.env.HOST,
    user: process.env.ROOT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  };
}

export default databaseConfig;
