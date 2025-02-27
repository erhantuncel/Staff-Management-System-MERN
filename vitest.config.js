import { configDotenv } from "dotenv"
import {defineConfig} from "vitest/config"

export default defineConfig ({
    test: {
        env: {
            ...configDotenv({path: "./.env"}).parsed
        }
    }
})