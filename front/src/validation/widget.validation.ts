import { z } from "zod";

export const createWidgetSocialLinkSchema = z.object({
  link: z.string().url("Invalid URL"),
});

export type CreateWidgetSocialLinkDto = z.infer<
  typeof createWidgetSocialLinkSchema
>;
