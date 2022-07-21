import bcrypt from 'bcryptjs';

/**
 * Encryption handler
 */
class Encrypt {
	/**
   * @author frank harerimana
   * @param {*} _value
   * @returns {*} value
   */
	private static salt(): any {
		return bcrypt.genSaltSync(10);
	}

	/**
   * encrypting method
   * @returns {*} encrypted value
   */
	public static encrypt(value: string): string {
		return bcrypt.hashSync(value, this.salt());
	}

	/**
   * @param {*} storedValue
   * @returns {*} true or false
   */
	public static decrypt(value: string, storedValue: string): any {
		return bcrypt.compareSync(value, storedValue);
	}
}

export default Encrypt;
