/** The npm package spec readers run. */
export declare const KLIPING_CLI: string
/** `npx kliping@latest <args>`. */
export declare function klipingCommand(args: string): string
/** `npx kliping@latest add <names…>` — names are registry item names. */
export declare function klipingAdd(names: string | readonly string[]): string
/** `npx kliping@latest add <names…> --page <file>`, names in order, repeats included. */
export declare function klipingAddPage(names: readonly string[], file: string): string
