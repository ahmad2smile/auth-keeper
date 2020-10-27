import { RequestOptions } from "http";
import { ServerOptions } from "http-proxy";

class AppsConfigHandler {
    app1Route(req: RequestOptions): ServerOptions | undefined  {

        const app1MainRoute = (req as any).url?.includes('/app1');

        if (app1MainRoute) {
            return { target: 'http://localhost:3001' }
        }
    }

    app2Route(req: RequestOptions): ServerOptions | undefined  {
        const app1MainRoute = (req as any).url?.includes('/app2')

        if (app1MainRoute) {
            return { target: 'http://localhost:3002' }
        }
    }
}

export default AppsConfigHandler;