import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tag = sqliteTable("tag", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color"),
});
