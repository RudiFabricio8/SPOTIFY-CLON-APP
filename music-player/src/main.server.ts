export default async function bootstrap() {
	const m = await import('./app/app.server.module');
	return m.AppServerModule;
}
