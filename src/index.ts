import { createServer, ServerOptions } from "https";
import httpProxy from "http-proxy";
import { readFileSync, existsSync } from "fs";

import { getConfigHandlers } from "./utils/configs";

const proxy = httpProxy.createServer();

let serverConfig: ServerOptions = {};
if (existsSync("./certs")) {
	console.log("LOadding certsasd");

	serverConfig = {
		key: readFileSync("./certs/key-file.pem", "utf8"),
		cert: readFileSync("./certs/cert-file.crt", "utf8")
	};
}

const server = createServer(serverConfig, (request, response) => {
	const { cookie } = request.headers;

	console.log({ cookie });

	const authRedirectUri = process.argv[2] || process.env.AUTH_REDIRECT_URI;

	if (!cookie && authRedirectUri) {
		response.writeHead(302, {
			Location: authRedirectUri
		});
		return response.end();
	}

	const handlerInstances = getConfigHandlers();

	handlerInstances.forEach((c) => {
		try {
			for (const method in c.class.prototype) {
				const configs = c.instance[method](request);

				if (configs) {
					proxy.web(request, response, configs);
					break;
				}
			}
		} catch (error) {
			console.log("==================================");
			console.log(
				"Something went wrong in call a methon on handler class"
			);
			console.log("==================================");

			console.log(error);
		}
	});
});

const PORT = process.env.PORT || 3005;

console.log("==================================");
console.log(`Listening on PORT: ${PORT}`);
console.log("==================================");

server.listen(PORT);
