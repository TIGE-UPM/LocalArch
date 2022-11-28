const path = require('path');

module.exports = {
	devServer: { proxy: { '/api': 'http://localhost:4000' } },
	style: { sass: { loaderOptions: { additionalData: '@import "@Styles/variables/index.scss";' } } },
	webpack: {
		configure: (webpackConfig, { paths }) => {
			const { appSrc } = paths;
			webpackConfig.resolve.alias = {
				...webpackConfig.resolve.alias,
				'@Components': path.resolve(appSrc, 'components'),
				'@Assets': path.resolve(appSrc, 'assets'),
				'@Styles': path.resolve(appSrc, 'styles'),
				'@Store': path.resolve(appSrc, 'store'),
				'@Views': path.resolve(appSrc, 'views'),
				'@Src': path.resolve(appSrc),
			};
			return webpackConfig;
		},
	},
};
