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
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'page',
    title: 'Pages',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Authentication',
        title: 'Authentication',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'login',
            title: 'Login',
            type: 'item',
            url: '/guest/login',
            target: true,
            breadcrumbs: false
          },
          {
            id: 'register',
            title: 'Register',
            type: 'item',
            url: '/guest/register',
            target: true,
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'Membership',
        title: 'Membership',
        type: 'group',
        icon: 'ti ti-users-group',
        children: [
          {
            id: 'members',
            title: 'Members',
            type: 'item',
            classes: 'nav-item',
            url: '/members',
            icon: 'ti ti-users-group',
            breadcrumbs: false
          },
          {
            id: 'attendance',
            title: 'Attendance',
            type: 'item',
            classes: 'nav-item',
            url: '/attendance',
            icon: 'ti ti-users'
          }
        ]
      },
      {
        id: 'Finance',
        title: 'Finance',
        type: 'group',
        icon: 'ti ti-users',
        children: [
          {
            id: 'offering',
            title: 'Offering',
            type: 'item',
            classes: 'nav-item',
            url: '/offering',
            icon: 'ti ti-cash-banknote',
            breadcrumbs: false
          },
          {
            id: 'budget',
            title: 'Budget',
            type: 'item',
            classes: 'nav-item',
            url: '/budget',
            icon: 'ti ti-businessplan',
            breadcrumbs: false
          },
          {
            id: 'projects',
            title: 'Projects',
            type: 'item',
            classes: 'nav-item',
            url: '/projects',
            icon: 'ti ti-building-church',
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'Calender',
        title: 'calender',
        type: 'group',
        icon: 'ti ti-users',
        children: [
          {
            id: 'events',
            title: 'Events',
            type: 'item',
            classes: 'nav-item',
            url: '/events',
            icon: 'ti ti-calendar-event',
            breadcrumbs: false
          }
        ]
      },
      
    ]
  },
  {
    id: 'elements',
    title: 'Elements',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'typography',
        title: 'Typography',
        type: 'item',
        classes: 'nav-item',
        url: '/typography',
        icon: 'ti ti-typography'
      },
      {
        id: 'color',
        title: 'Colors',
        type: 'item',
        classes: 'nav-item',
        url: '/color',
        icon: 'ti ti-brush'
      },
      {
        id: 'tabler',
        title: 'Tabler',
        type: 'item',
        classes: 'nav-item',
        url: 'https://tabler-icons.io/',
        icon: 'ti ti-plant-2',
        target: true,
        external: true
      }
    ]
  },
  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'ti ti-brand-chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/berry-angular/',
        icon: 'ti ti-vocabulary',
        target: true,
        external: true
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
