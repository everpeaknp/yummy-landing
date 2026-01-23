import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes common icon aliases and UK spellings to Material Symbols names
 * e.g. "favourite" -> "favorite", "users" -> "group"
 */
export function normalizeIconName(name: string): string {
  if (!name) return "";
  const n = name.toLowerCase().trim();
  
  const aliases: Record<string, string> = {
    // UK to US
    "favourite": "favorite",
    "colour": "palette",
    "centre": "center_focus_strong",
    "calender": "calendar_today",
    
    // Plurals / Common Aliases
    "users": "group",
    "people": "group",
    "user": "person",
    "team": "groups",
    
    "staff": "badge",
    "employee": "badge",
    
    "chart": "bar_chart",
    "graph": "show_chart",
    "stats": "query_stats",
    
    "setting": "settings",
    "gear": "settings",
    "config": "settings",
    
    "money": "attach_money",
    "cash": "payments",
    "bill": "receipt",
    "invoice": "receipt_long",
    
    "phone": "call",
    "mobile": "smartphone",
    "email": "mail",
    
    "food": "restaurant",
    "drink": "local_bar",
    "cafe": "local_cafe",
    "coffee": "local_cafe",
  };
  
  return aliases[n] || n;
}
