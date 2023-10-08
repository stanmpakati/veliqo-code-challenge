import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'home',
        title: 'Home',
        type: 'item',
        classes: 'nav-item',
        url: '/user/applications',
        icon: 'ti ti-home',
        breadcrumbs: false
      },
      {
        id: 'insurance',
        title: 'Available Insurances',
        type: 'item',
        classes: 'nav-item',
        url: '/admin/insurances',
        icon: 'ti ti-coins',
        breadcrumbs: false
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
