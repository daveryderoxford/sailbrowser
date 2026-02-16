/** String compatisopn function that first notmalised the strings  */
export function normalisedCompare(a: string | undefined | null, b: string | undefined | null): number {
   return (normaliseString(a).localeCompare(normaliseString(b)));
}

/** Normalises a string for comparision by triming, 
 * removing whitespece and lower casing it 
 */
export function normaliseString(str: string | undefined | null): string {
   return str?.toLowerCase().replace(/\s+/g, '')  || '';
}
