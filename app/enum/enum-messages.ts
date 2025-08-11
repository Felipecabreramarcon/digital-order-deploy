export enum ErrorMessages {
    DEFAULT = "Preencha corretamente",
}

export const ErrorMessageHelpers = {
    MIN_CHAR: (field: string, min: number) => ` ${field} deve ter no mínimo ${min} caracteres`,
    MIN_SELECT: (field: string, min: number) => ` ${field} deve ter pelo menos ${min} itens selecionado`
}