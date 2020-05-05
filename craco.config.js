module.exports = {
	plugins: [
		{
			plugin: require('craco-less'),
			options: {
				lessLoaderOptions: {
					/* antd style override */
					/* Ref: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less */ modifyVars: {
						'@primary-color': '#6459f5',
						'@font-family': "'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif",
					},
					javascriptEnabled: true,
				},
			},
		},
		{ plugin: require('@semantic-ui-react/craco-less') },
	],
}
