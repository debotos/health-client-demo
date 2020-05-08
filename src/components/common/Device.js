import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children }) => {
	const isDesktop = useMediaQuery({ minWidth: 992 })
	return isDesktop ? children : null
}

const MobileOrTablet = ({ children }) => {
	const isMobileOrTablet = useMediaQuery({ maxWidth: 991 })
	return isMobileOrTablet ? children : null
}

export { Desktop, MobileOrTablet }
