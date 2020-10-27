import { existsSync, mkdirSync } from "fs"

export const ensureDir = (dir: string) => {
    if (!existsSync(dir)) {
        mkdirSync(dir);
    }
}