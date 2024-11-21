import { z, ZodError } from "zod";
import { configDotenv } from 'dotenv';

configDotenv()

const envSchema = z.object({
    MONGODB_URI: z.string(),
    PORT: z.coerce.number().default(8000),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "fatal", "trace"]).default("info"), // debug

})

type Env = z.infer<typeof envSchema>;
let env: Env;

try {
    env = envSchema.parse(process.env);
} catch (error) {
    const e = error as ZodError;
    console.log(e.message);
    process.exit(1);
}

export default env