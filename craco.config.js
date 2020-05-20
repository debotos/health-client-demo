module.exports = {
	plugins: [
		{
			plugin: require('craco-less'),
			options: {
				lessLoaderOptions: {
					/* antd style override */
					/* Ref: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less */
					modifyVars: {
						'@primary-color': '#379503',
						'@font-family': "'Open Sans', sans-serif",
						'@btn-border-radius-base': '5px',
					},
					javascriptEnabled: true,
				},
			},
		},
		{ plugin: require('@semantic-ui-react/craco-less') },
	],
}
