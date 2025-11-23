import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { ClassValue } from 'clsx'

/**
 * Функция для объединения классов, позволяет избежать дублей и конфликтов
 * @param inputs принимает **tailwind** классы в виде строки
 * @returns строку классов
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs))
}
