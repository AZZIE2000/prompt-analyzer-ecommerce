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
    };
  }>,
  reply: FastifyReply
) => {
  const text = req.body.text;
  const res = await new FormBuilder(text).build();

  // The Object that will be filtering from
  // const result = new Builder(text).build();

  //NOTE : it will return an array of actions (buy, sell, rent)
  //FIXME : for now use the first one , when the UI is ready as the user to choose one

  // find the purpose of the text (buy, sell, rent, service) ???????
  // output : URL
  // output : URL
  // output : URL
  // output : URL
  // output : URL
  // output : URL
  return reply.send({ url: res });
};
