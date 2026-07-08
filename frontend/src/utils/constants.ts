import type { PageRequest } from '../types';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const DEFAULT_PAGE_REQUEST: PageRequest = {
  page: 0,
  size: 10,
};