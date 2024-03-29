////////////////////////////////////////////////////////////////////////////////

declare const nominalString: unique symbol;
type ExtString = string & { [nominalString]?: never };

////////////////////////////////////////////////////////////////////////////////

export { ExtString };