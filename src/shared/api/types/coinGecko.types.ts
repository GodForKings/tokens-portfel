/**
 * Общий тип для response Open API CoinGecko
 */
export interface CoinGeckoToken {
	// Основная идентификация
	id: string // Уникальный идентификатор монеты (например: "bitcoin")
	symbol: string // Символ тикера (например: "btc")
	name: string // Полное название (например: "Bitcoin")
	image: string // URL изображения монеты

	// Текущие цены и рыночные данные
	current_price: number // Текущая цена в указанной валюте
	market_cap: number // Рыночная капитализация
	market_cap_rank: number // Ранг по рыночной капитализации (1 = Bitcoin)
	fully_diluted_valuation: number // Полностью разводненная капитализация
	total_volume: number // Общий объем торгов за 24 часа

	// Ценовые колебания за 24 часа
	high_24h: number // Максимальная цена за 24 часа
	low_24h: number // Минимальная цена за 24 часа
	price_change_24h: number // Абсолютное изменение цены за 24 часа
	price_change_percentage_24h: number // Процентное изменение цены за 24 часа

	// Изменения рыночной капитализации
	market_cap_change_24h: number // Абсолютное изменение капитализации за 24 часа
	market_cap_change_percentage_24h: number // Процентное изменение капитализации за 24 часа

	// Данные о предложении
	circulating_supply: number // Текущее количество монет в обращении
	total_supply: number // Общее количество выпущенных монет
	max_supply: number // Максимальное возможное количество монет

	// Исторические экстремумы
	ath: number // All-Time High (максимальная цена за всю историю)
	ath_change_percentage: number // Процент изменения от ATH
	ath_date: string // Дата достижения ATH (ISO строка)

	atl: number // All-Time Low (минимальная цена за всю историю)
	atl_change_percentage: number // Процент изменения от ATL
	atl_date: string // Дата достижения ATL (ISO строка)

	// Return on Investment
	roi: ReturnInvestment // ФИКС: всегда приходит, не optional

	// Временные метки
	last_updated: string // Время последнего обновления данных (ISO строка)

	// Дополнительные поля (при использовании sparkline=true)
	sparkline_in_7d?: {
		// Данные для спарклайна за 7 дней
		price: number[] // ФИКС: массив чисел, не объектов
	}

	// Дополнительные проценты изменений (при указании price_change_percentage)
	price_change_percentage_1h_in_currency?: number // Изменение за 1 час
	price_change_percentage_24h_in_currency?: number // Изменение за 24 часа
	price_change_percentage_7d_in_currency?: number // Изменение за 7 дней
	price_change_percentage_14d_in_currency?: number // Изменение за 14 дней
	price_change_percentage_30d_in_currency?: number // Изменение за 30 дней
	price_change_percentage_200d_in_currency?: number // Изменение за 200 дней
	price_change_percentage_1y_in_currency?: number // Изменение за 1 год
}

interface ReturnInvestment {
	// Показатель возврата инвестиций
	times: number // Во сколько раз выросли инвестиции
	currency: string // Валюта расчета
	percentage: number // Процент возврата
}

/**
 * Типы валют для отображения цен
 * @description Поддерживаемые фиатные и криптовалюты для конвертации
 */
type Currency =
	| 'usd' // Доллар США
	| 'eur' // Евро
	| 'gbp' // Фунт стерлингов
	| 'jpy' // Японская йена
	| 'cny'
	| 'rub' // Российский рубль
	| 'btc' // Bitcoin
	| 'eth' // Ethereum
	| 'bnb' // Binance Coin

/**
 * Параметры сортировки результатов
 * @description Определяет порядок отображения монет в ответе
 */
type OrderBy =
	| 'market_cap_desc' // По рыночной капитализации (убывание)
	| 'market_cap_asc' // По рыночной капитализации (возрастание)
	| 'volume_asc' // По объему торгов (возрастание)
	| 'volume_desc' // По объему торгов (убывание)

/**
 * Периоды для расчета изменения цены
 * @description Временные интервалы для процентного изменения цены
 */
type PriceChangePeriod =
	| '1h' // 1 час
	| '24h' // 24 часа
	| '7d' // 7 дней
	| '14d' // 14 дней
	| '30d' // 30 дней
	| '200d' // 200 дней
	| '1y' // 1 год

/**
 * Языковые локали
 * @description Поддерживаемые языки для локализации данных
 */
type Locale =
	| 'en' // Английский
	| 'ru' // Русский
	| 'de' // Немецкий
	| 'fr' // Французский
	| 'es' // Испанский
	| 'pt' // Португальский
	| 'tr' // Турецкий
	| 'zh' // Китайский
	| 'ja' // Японский
	| 'ko' // Корейский

/**
 * Варианты категорий токенов
 * @description все категории монет — РЕАЛЬНЫЕ SLUGS из CoinGecko
 */
export type CategoryTokens =
	| 'decentralized_finance_defi' // Децентрализованные финансы (DeFi)
	| 'stablecoins' // Стейблкоины
	| 'decentralized-exchange' // Децентрализованные биржи (DEX)
	| 'yield-aggregator' // Yield Aggregators
	| 'oracle' // Оракулы
	| 'privacy-coins' // Приватность
	| 'layer-1' // Layer 1
	| 'layer-2' // Layer 2 (ФИКС: не scaling)
	| 'meme-token' // Мем-токены (ФИКС: дефис)
	| 'non-fungible-tokens-nft' // NFT
	| 'gaming' // GameFi
	| 'artificial-intelligence' // AI-токены
	| 'real-world-assets-rwa' // RWA
	| 'liquid-staking' // Liquid Staking
	| 'restaking' // Restaking
	| 'depin' // DePIN

/**
 * Основной интерфейс запроса к CoinGecko API /coins/markets
 * @description Полная спецификация параметров для получения рыночных данных
 */
export interface CoinGeckoMarketRequest {
	// ОБЯЗАТЕЛЬНЫЕ ПАРАМЕТРЫ

	/**
	 * Целевая валюта для отображения цен
	 * @example 'usd', 'eur', 'btc'
	 */
	vs_currency: Currency

	// ПАРАМЕТРЫ ФИЛЬТРАЦИИ

	/**
	 * Список ID монет для фильтрации
	 * @description Если указан, возвращаются только указанные монеты
	 * @example ['bitcoin', 'ethereum', 'binancecoin']
	 */
	ids?: string[]

	/**
	 * Категория для фильтрации монет
	 * @description Возвращает монеты только из указанной категории
	 */
	category?: CategoryTokens

	// ПАРАМЕТРЫ ПАГИНАЦИИ И СОРТИРОВКИ

	/**
	 * Поле и направление сортировки
	 * @default 'market_cap_desc'
	 */
	order?: OrderBy

	/**
	 * Количество результатов на странице
	 * @description Диапазон: 1-250
	 * @default 100
	 * @example 50, 100, 250
	 */
	per_page?: number

	/**
	 * Номер страницы для пагинации
	 * @description Начинается с 1
	 * @default 1
	 */
	page?: number

	// ДОПОЛНИТЕЛЬНЫЕ ДАННЫЕ

	/**
	 * Включить данные для построения спарклайна
	 * @description Добавляет массив цен за последние 7 дней
	 * @default false
	 */
	sparkline?: boolean

	/**
	 * Процентные изменения цены за указанные периоды
	 * @description Можно указать несколько периодов через массив
	 * @example ['1h', '24h', '7d']
	 */
	price_change_percentage?: PriceChangePeriod[]

	/**
	 * Язык локализации для текстовых данных
	 * @default 'en'
	 */
	locale?: Locale
}
