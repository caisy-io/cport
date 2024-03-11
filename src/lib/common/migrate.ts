import "dotenv/config";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./db";

export const runMigrations = () => {
  return migrate(db, { migrationsFolder: "./drizzle", migrationsTable: "cport_migration" });
};
