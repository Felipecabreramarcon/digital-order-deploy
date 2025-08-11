import { ReactNode } from "react";

export type FormModal<T> = {
    children: ReactNode
    toEdit?: T
};
