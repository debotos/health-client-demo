import React from 'react'

export default function Footer({ background, content, children }) {
	return (
		<footer style={{ background: background ? background : '#ececec' }}>
			{children ? (
				children
			) : (
				<div style={{ textAlign: 'center', padding: 10 }}>
					<span style={{ opacity: 0.8 }}>
						© Copyright {new Date().getFullYear()} Care Pine Home Health. All right reserved.
					</span>
				</div>
			)}
		</footer>
	)
}
