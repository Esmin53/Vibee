import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toPusherKey(key: string) {
  
  return key.replace(/:/g, '__')
}

export function formatTime(dateValue: Date, dateToCompare: Date) {
    
}