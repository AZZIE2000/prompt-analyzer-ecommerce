export const carsFuel = {
  diesel: {
    id: 4699,
  },
  electric: {
    id: 4703,
  },
  gasoline: {
    id: 4697,
  },
  hybrid: {
    id: 4701,
  },
  mild_hybrid: {
    id: 19709,
  },
  plug_in_hybrid: {
    id: 15272,
  },
};
export type carsFuelType = keyof typeof carsFuel;
