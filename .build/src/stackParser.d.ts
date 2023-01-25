export declare const applyParserSideEffects: (parsedStackResource: Record<string, any>) => Promise<void>;
export declare const cdkStackParser: (directory: string, filter?: string) => any[];
export declare const ymlStackParser: (directory: string, filter?: string) => any[];
export declare const stackParser: (type: string, directory: string, filter?: string) => Promise<void>;
