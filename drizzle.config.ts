import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/common/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./cport.db",
  },
} satisfies Config;
