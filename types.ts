import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  category: 'milestone' | 'education' | 'project';
}

export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  category: string;
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  role: ChatRole;
  text: string;
  timestamp: Date;
}