import { FastifyReply, FastifyRequest } from "fastify";
import { carsbrand2 } from "../data/constants/cars-brands";
import { findTextLang } from "../utils/text.utils";
import { purpos } from "../data/constants/base";

export const promptAnalizerHandler = async (
  req: FastifyRequest<{
    Body: {
      text: string;
    };
  }>,
  reply: FastifyReply
) => {
  // text
  const text = req.body.text;
  const lang = findTextLang(text);
  const altLang = lang.id === 1 ? "alt_AR" : "alt_EN";
  let p;
  if (lang.id === 1) {
    p = purpos.find((p) => p[altLang].includes(text));
    if (!p) {
      return reply.send({ message: "nooooo" });
    } else {
      return reply.send({ message: p.action });
    }
  }
  // find the purpose of the text (buy, sell, rent, service) ???????
  //
  //
  //
  //
  //
  //
  //
  // output : URL
//   return reply.send({ message: text });
};
