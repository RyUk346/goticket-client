import dns from "node:dns";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
  dns.setDefaultResultOrder("ipv4first");
} catch {}

const getHandlers = async () => {
  const { auth } = await import("@/lib/auth");
  return toNextJsHandler(auth);
};

export const GET = async (request) => {
  const handlers = await getHandlers();
  return handlers.GET(request);
};

export const POST = async (request) => {
  const handlers = await getHandlers();
  return handlers.POST(request);
};