import { z } from "zod";

export const SearchValidator = z.string()

export type SearchRequest = z.infer<typeof SearchValidator>