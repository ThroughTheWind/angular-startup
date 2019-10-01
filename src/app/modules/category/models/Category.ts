import { CategoryValue } from './CategoryValue';

export interface Category {
    id: string;
    label: string;
    description: string;
    values: CategoryValue[];
}