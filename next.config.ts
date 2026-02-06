import type { NextConfig } from "next"
import path from "path"
import fs from "fs"

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})

function ensureLock(rootPath: string) {
  const lockPath = path.join(rootPath, ".next", "lock")
  try {
    fs.mkdirSync(path.dirname(lockPath), { recursive: true })
    if (!fs.existsSync(lockPath)) {
      fs.writeFileSync(
        lockPath,
        JSON.stringify({ createdAt: new Date().toISOString(), source: "next.config" })
      )
      console.log(`[next-config] created ${lockPath}`)
    }
  } catch (error) {
    console.warn(`[next-config] unable to prepare ${lockPath}: ${(error as Error).message}`)
  }
}

if (typeof window === "undefined") {
  const roots = new Set<string>([
    path.resolve(__dirname),
    path.resolve(__dirname, ".."),
    "/vercel/path0",
    "/vercel/path1",
  ])
  const extra = (process.env.NEXT_LOCK_PATHS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
  extra.forEach((root) => roots.add(root))
  for (const root of roots) {
    ensureLock(root)
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /**
   * Fix Vercel workspace-root detection when another package-lock.json exists
   * higher up the tree (e.g. /dadnoos/package-lock.json). Without this, Next.js
   * tries to trace from /vercel/path0 and fails to find .next/lock.
   */
  outputFileTracingRoot: path.join(__dirname),
  // output: "standalone",
}

export default withPWA(nextConfig)
