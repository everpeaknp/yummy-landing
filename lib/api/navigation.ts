/**
 * Navigation API Functions
 * Navbar and Footer data fetching
 */

import { get } from './client';
import type { NavbarData, FooterData } from './types';

export async function getNavbar(): Promise<NavbarData> {
  return get<NavbarData>('/navigation/main/');
}

export async function getFooter(): Promise<FooterData> {
  return get<FooterData>('/navigation/footer/');
}

export interface LayoutData {
  navbar: NavbarData;
  footer: FooterData;
}

export async function getLayoutData(): Promise<LayoutData> {
  const [navbar, footer] = await Promise.all([
    getNavbar(),
    getFooter(),
  ]);
  
  return { navbar, footer };
}
