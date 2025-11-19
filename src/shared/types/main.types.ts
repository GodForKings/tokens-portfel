export interface FAQItem {
	id: number
	question: string
	answer: string
}

/**
 * @label имя
 * @href путь
 * @icon иконка *опционально*
 */
export interface IBreadcrumbItem {
	label: string
	href: string
	icon?: React.ReactNode
}
