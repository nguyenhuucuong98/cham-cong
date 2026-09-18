import { ComponentType } from 'react';

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  badge?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  type: 'event' | 'birthday' | 'system';
  unread?: boolean;
}