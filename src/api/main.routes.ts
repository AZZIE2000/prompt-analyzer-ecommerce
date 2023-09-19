import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { promptAnalizerHandler } from "../handlers/app";

export default (fastify: FastifyInstance, opts, done) => {
  fastify.post("/", {
    handler: promptAnalizerHandler,
  });
  done();
};
// hi huhidasdas