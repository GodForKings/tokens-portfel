const usdPreciseFormatter = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	currencyDisplay: 'symbol',
	minimumFractionDigits: 0,
	maximumFractionDigits: 10,
	minimumIntegerDigits: 1, // чисел спереди запятой
})

const usdStandardFormatter = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	currencyDisplay: 'symbol',
	minimumFractionDigits: 0,
	maximumFractionDigits: 4,
	minimumIntegerDigits: 1,
})

const percentStandardFormatter = Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 2,
})

const percentPreciseFormatter = Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 4,
})

type FormatType = 'USD' | '%'

// Константы для лучшей читаемости
const SMALL_VALUE_THRESHOLD = 0.01
/**
 * Форматирует числа для криптовалют с учетом их волатильности
 * - Для мелких значений показывает больше знаков
 * - Для стандартных значений использует обычное форматирование
 * @param currentValue Числовое значение
 * @param typeForOut Тип данных для вывода
 * @returns Строка с отформатированным результатом
 */
export const numberFormation = (
	currentValue: number,
	typeForOut: FormatType = 'USD'
): string => {
	// Для стандартных процентов
	if (typeForOut === '%' && Math.abs(currentValue) < SMALL_VALUE_THRESHOLD)
		return `${percentPreciseFormatter.format(currentValue)}%`
	// Для маленьких процентов
	if (typeForOut === '%')
		return `${percentStandardFormatter.format(currentValue)}%`
	// Для больших значений
	if (currentValue >= SMALL_VALUE_THRESHOLD)
		return usdStandardFormatter.format(currentValue)
	// Дефолтный форматер
	return usdPreciseFormatter.format(currentValue)
}
