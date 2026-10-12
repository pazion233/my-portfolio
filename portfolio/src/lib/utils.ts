import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const btn =
  'inline-flex min-h-11 items-center gap-2 rounded-lg px-5 text-sm transition-[transform,background-color] duration-200 ease-out-expo active:scale-[0.97]'
export const btnPrimary = `${btn} bg-primary font-semibold text-primary-foreground hover:bg-orange-600`
export const btnGhost = `${btn} border border-border font-medium text-foreground hover:bg-secondary`
