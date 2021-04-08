
//#region String Manipulation
export class StringUtilities {
    /**
     * Used to determine if a string ends with a specified string.
     *
     * @param str The string to check.
     * @param suffix The value to check for.
     * @returns True if str ends with the gtiven suffix, false otherwise.
     */
    static endsWith(str: string, suffix: string): boolean {

        if (str === null || str === '') {
            return false;
        }

        if (suffix === null || suffix === '') {
            return true;
        }

        return (str.substr(str.length - suffix.length) === suffix);
    }

    /**
     * Used to determine if a string starts with a specified string.
     *
     * @param str The string to check.
     * @param prefix The value to check for.
     * @returns True if str starts with the given prefix, false otherwise.
     */
    static startsWith(str: string, prefix: string): boolean {

        if (str === null || str === '') {
            return false;
        }

        if (prefix === null || prefix === '') {
            return true;
        }
        return (str.substr(0, prefix.length) === prefix);
    }

    /**
     * Used to morph a string to title-case; that is, any character that
     * is proceeded by a space will be capitalized.
     *
     * @param str The string to convert to title-case.
     * @returns The title-case version of the string.
     */
    static toTitleCase(str: string): string {

        if (!str) {
            return '';
        }

        // http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
        return str.replace(/\w\S*/g, function(txt: string) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }

    /**
     * Used to format a string by replacing values with the given arguments.
     * Arguments should be provided in the format of {x} where x is the index
     * of the argument to be replaced corresponding to the arguments given.
     *
     * For example, the string t = 'Hello there {0}, it is {1} to meet you!'
     * used like this: Utilities.format(t, 'dude', 'nice') would result in:
     * 'Hello there dude, it is nice to meet you!'.
     *
     * @param str The string value to use for formatting.
     * @param ... args The values to inject into the format string.
     */
    static format(formatString: string, ...args: any[]): string {
        let reg: RegExp;
        let i = 0;

        for (i = 0; i < arguments.length - 1; i += 1) {
            reg = new RegExp('\\{' + i + '\\}', 'gm');
            formatString = formatString.replace(reg, arguments[i + 1]);
        }

        return formatString;
    }
    /**
     * Format an integer number as a fixed width string padded with a specified character  .
     * @param n integer number to pad
     * @param width to pad to
     * @param z - character to use for padding
     */
    static pad(n: number, width: number, z: string): string {
        z = z || '0';
        let s = n.toString() + '';
        return s.length >= width ? s : new Array(width - s.length + 1).join(z) + s;
    }

    /** Make string lower case and remove spaces */
    static normalise(str: string) {

    }
}
    //#endregion
