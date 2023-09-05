import fastify from "fastify";
import routes from "./api/main.routes";

const app = fastify({
  logger: true,
});

const PORT = 8080;

app.register(routes);

app.listen({ port: PORT }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server  on port ${PORT}`);
});
// hidsadas