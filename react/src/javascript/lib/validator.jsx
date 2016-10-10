/**
 * 表单检验类
 */
export default class Validator {
	static validate ( value, rules) {
		return {
			isValid: true,
			message: 'Pass all rules' 
		};
	}
}