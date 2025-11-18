import { z } from 'zod';
import { BaseModelSchema } from '@/types/models/base-model';

// 알림 아이템 스키마
const notificationItemSchema = z
  .object({
    id: z.number().int().nonnegative(),
    type: z.string(), // API에서 오는 타입 (예: "NEW_MESSAGE")
    content: z.string(),
    link: z.string().nullable(),
    createdAt: z.string(), // ISO 날짜 문자열
    read: z.boolean(),
  })
  .strict();

export type NotificationItemType = z.infer<typeof notificationItemSchema>;

// 알림 목록 응답 데이터 스키마
const notificationsDataSchema = z.array(notificationItemSchema);

export type NotificationsDataType = z.infer<typeof notificationsDataSchema>;

// 알림 목록 응답 스키마
export const getMyNotificationsResponseSchema = BaseModelSchema(notificationsDataSchema);

export type GetMyNotificationsResponseType = z.infer<typeof getMyNotificationsResponseSchema>;
export type GetMyNotificationsDataType = z.infer<typeof notificationsDataSchema> | undefined;

