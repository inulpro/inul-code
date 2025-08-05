import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

// Middleware
app.use("*", async (c, next) => {
  console.log(`${c.req.method} ${c.req.url}`);
  await next();
});

// Routes
app.get("/", (c) => {
  return c.json({
    message: "Welcome to InulCode Hono.js API!",
    version: "1.0.0",
    framework: "Hono.js",
    runtime: "Node.js",
  });
});

app.get("/health", (c) => {
  return c.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get("/api/users", (c) => {
  return c.json({
    users: [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ],
  });
});

app.post("/api/users", async (c) => {
  const body = await c.req.json();
  return c.json(
    {
      message: "User created successfully",
      user: {
        id: Date.now(),
        ...body,
      },
    },
    201
  );
});

// 404 handler
app.notFound((c) => {
  return c.json(
    {
      error: "Route not found",
      path: c.req.url,
    },
    404
  );
});

// Error handler
app.onError((err, c) => {
  console.error(err);
  return c.json(
    {
      error: "Internal Server Error",
      message: err.message,
    },
    500
  );
});

const port = 3000;
console.log(`🚀 Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
