import { $ZodFlattenedError } from "zod/v4/core";

export type FormState<T> = {
    error?: string;
    errors?: $ZodFlattenedError<T>;
    success?: string;
    values?: T;
};