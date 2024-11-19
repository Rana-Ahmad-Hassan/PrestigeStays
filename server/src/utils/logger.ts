import env from "@/env";
import pino from "pino";

const logger = pino({
    level: env.LOG_LEVEL,
    transport: env.NODE_ENV === "production" ? undefined : {
        target: "pino-pretty",
        options: {
            colorize: true,
        },
    },
});

export default logger;