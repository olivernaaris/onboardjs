import { ParseInput } from '../types'
export interface InputValidator {
    validate(input: ParseInput): boolean
    sanitize?(input: string): string
}
export declare class StringValidator implements InputValidator {
    validate(input: ParseInput): boolean
    sanitize(input: string): string
}
export declare class FunctionValidator implements InputValidator {
    validate(input: ParseInput): boolean
}
export declare class NumberValidator implements InputValidator {
    validate(input: ParseInput): boolean
}
export declare class CompositeInputValidator implements InputValidator {
    private _validators
    validate(input: ParseInput): boolean
    sanitize(input: string): string
}
//# sourceMappingURL=input-validator.d.ts.map
