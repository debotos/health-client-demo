/**
 * Pseudo-random string generator
 * http://stackoverflow.com/a/27872144/383904
 * Default: return a random alpha-numeric string
 *
 * @param {Integer} len Desired length
 * @param {String} an Optional (alphanumeric), "a" (alpha), "n" (numeric)
 * @return {String}
 */
export function randomString(len, an) {
	an = an && an.toLowerCase()
	var str = '',
		i = 0,
		min = an === 'a' ? 10 : 0,
		max = an === 'n' ? 10 : 62
	for (; i++ < len; ) {
		var r = (Math.random() * (max - min) + min) << 0
		str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48))
	}
	return str
}

export function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some((field) => fieldsError[field])
}

export const phoneValidationRegex = new RegExp(/^[\s()+-]*([0-9][\s()+-]*){6,20}$/)

export const validatePhone = (mobile = '') => {
	return phoneValidationRegex.test(mobile)
}
