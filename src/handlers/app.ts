import { FastifyReply, FastifyRequest } from "fastify";
import { carsbrand2 } from "../data/constants/cars/cars-brands";
import { findTextLang } from "../utils/text.utils";
import { purpos } from "../data/constants/base";
import similarity from "similarity";
import { ExtractionService } from "../helpers/textraction.api";
import { getAction, getCategory } from "../helpers/search.helpers";
import { FormBuilder } from "../services/Builder";

export const promptAnalizerHandler = async (
  req: FastifyRequest<{
    Body: {
      text: string;
      convId: string;
    };
  }>,
  reply: FastifyReply
) => {
  console.log("req.body 💜💜💜💜💜💜💜💜💜💜💜💜💜");
  console.log(req.body);
  console.log("req.body");

  const text = req.body.text;
  const convId = req.body.convId;
  const res = await new FormBuilder(text, convId).build();

  return reply.send({ url: res });
};
