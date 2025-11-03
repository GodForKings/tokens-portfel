export interface IToken {
	symbol: string
	priceChangePercent: number
	lastPrice: number
	lowPrice: string
	highPrice: string
	lastId: number
	quantity: number
}

export interface ITokenWSS {
	s: string // "BTCUSDT"
	c: number // current price
}
