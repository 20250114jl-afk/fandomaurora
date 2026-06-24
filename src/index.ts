import { Client } from 'pg';

export interface Env {
  HYPERDRIVE: {
    connectionString: string;
  };
}

export interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Hyperdrive provides a unique generated connection string to connect to
    // your database via Hyperdrive that can be used with your existing tools
    const client = new Client({
      connectionString: env.HYPERDRIVE.connectionString,
    });

    try {
      await client.connect();

      // Sample query
      const result = await client.query('SELECT tablename FROM pg_tables WHERE schemaname = \'public\'');

      return Response.json({ 
        success: true,
        message: "Successfully connected to PlanetScale via Cloudflare Hyperdrive!",
        result: result.rows 
      });
    } catch (e) {
      return Response.json(
        { 
          success: false, 
          error: e instanceof Error ? e.message : String(e) 
        }, 
        { status: 500 }
      );
    } finally {
      // Close the client after the response is returned
      ctx.waitUntil(client.end());
    }
  }
};
