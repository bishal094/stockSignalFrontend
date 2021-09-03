import { Component, OnInit } from "@angular/core";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children: Array<RouteInfo>;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/stock",
    title: "Stock",
    children: [],
    icon: "nc-bank",
    class: "",
  },
  {
    path: "/crypto",
    title: "Crypto",
    children: [],
    icon: "nc-money-coins",
    class: "",
  },
  {
    path: "#",
    title: "Watch List",
    children: [
      {
        path: "/manual/1",
        title: "Growth Stocks To Watch",
        children: [],
        icon: "",
        class: "",
      },
      {
        path: "/manual/2",
        title: "Dividend Stocks To Watch",
        children: [],
        icon: "",
        class: "",
      },
      {
        path: "/manual/3",
        title: "Cryptos To Watch",
        children: [],
        icon: "",
        class: "",
      },
      {
        path: "/manual/5",
        title: "Meme Buy Of The Week",
        children: [],
        icon: "",
        class: "",
      },
      {
        path: "/manual/6",
        title: "Long Term Stock List",
        children: [],
        icon: "",
        class: "",
      },
      {
        path: "/manual/7",
        title: "Long Term Crypto List",
        children: [],
        icon: "",
        class: "",
      },
    ],
    icon: "nc-paper",
    class: "",
  },
  {
    path: "/announcements",
    title: "News",
    children: [],
    icon: "nc-single-copy-04",
    class: "",
  },
  {
    path: "/add-notification",
    title: "AnnounceMents",
    children: [],
    icon: "nc-send",
    class: "",
  },
  {
    path: "/legal",
    title: "Legal Content",
    children: [],
    icon: "nc-glasses-2",
    class: "",
  },
  {
    path: "/app-variables",
    title: "Application Variables",
    children: [],
    icon: "nc-settings",
    class: "",
  },
  {
    path: "/app-users",
    title: "Application Users",
    children: [],
    icon: "nc-single-02",
    class: "",
  },
  // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
  // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
  // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
  // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
  // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
  // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
  // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  dropDown = [false, false];
  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
