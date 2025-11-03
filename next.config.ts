import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'fakestoreapi.com', // тестовый апи с карточками товаров
			},
			{
				protocol: 'https',
				hostname: 'ui.shadcn.com', // апи ui библиотеки
			},
			{
				protocol: 'https',
				hostname: 'reui.io', // апи ui библиотеки
			},
			{
				protocol: 'https',
				hostname: 'api.binance.com', // апи binance
			},
			{
				protocol: 'https',
				hostname: 'api.coingecko.com', // апи coingecko, более подробные описания монет
			},
		],
	},
}

export default nextConfig
