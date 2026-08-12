import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

export const cl = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
}