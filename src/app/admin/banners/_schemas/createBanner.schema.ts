import { z } from 'zod';

export const createBannerSchema = z.object({
  banner_name: z.string().min(1, '배너명을 입력하세요.'),
  banner_image_url: z.string(),
  is_active: z.boolean(),
  banner_position: z.enum(['main', 'side', 'category', 'dual', 'triple', 'showHide', 'popup']),
  banner_start_date: z.coerce.date(),
  banner_end_date: z.coerce.date(),
  banner_link: z.string().url('올바른 URL을 입력하세요.').default('https://'),
  banner_description: z.string().nullable(),
});

export type CreateBannerSchema = z.infer<typeof createBannerSchema>;
