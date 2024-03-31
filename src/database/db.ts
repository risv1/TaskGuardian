import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres";

const connection = process.env.DB_URL!

export const client = postgres(connection, { prepare: false })
export const db = drizzle(client)