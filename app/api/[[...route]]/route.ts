import { Hono } from "hono"
import { handle } from "hono/vercel"

import auth from "@/features/auth/server/route"
import workspaces from "@/features/workspaces/server/route"

const app = new Hono().basePath("/api")

app.get("ping", (c) => {
    return c.json({ ping: "pong" })
})

const routes = app
    .route("/auth", auth)
    .route("/workspaces", workspaces);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;