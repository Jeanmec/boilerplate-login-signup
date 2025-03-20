import { z } from "zod";

export const createWidgetSocialLinkSchema = z.object({
  link: z.string().url("Invalid URL"),
});

export type CreateWidgetSocialLinkSchema = z.infer<
  typeof createWidgetSocialLinkSchema
>;
