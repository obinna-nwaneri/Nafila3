import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Check your environment variables.");
}

export const sql = neon(process.env.DATABASE_URL);

export async function runQuery<T = unknown>(strings: TemplateStringsArray, ...values: unknown[]): Promise<T[]> {
  const result = await (sql as any)(strings, ...values);
  return result as T[];
}
