type BinanceApi = 'API_V3' | 'WSS'
export const BINANCE: Readonly<Record<BinanceApi, string>> = {
	API_V3: 'https://api.binance.com/api/v3',
	WSS: 'wss://stream.binance.com:443/ws',
} as const

type Coingecko = 'COINS_V3'
export const COINGECKO: Readonly<Record<Coingecko, string>> = {
	COINS_V3: 'https://api.coingecko.com/api/v3',
} as const
