import {
    BiTrendingUp,
    BiCheckSquare,
    BiChevronDownSquare,
    BiCreditCard,
    BiGroup,
    BiPackage,
    BiStore,
    BiBarChart,
    BiBriefcase,
    BiCog,
    BiBook
} from 'react-icons/bi'



import type { MenuItemData } from '../headless-menu'
export const menuItems: MenuItemData[] = [
    { id: 'Trends', url: '/trends', label: 'Trends', icon: <BiTrendingUp /> },
    { id: 'Tasks', url: '/tasks', label: 'Tasks', icon: <BiCheckSquare /> },
    { id: 'tickets', url: '/tickets', label: 'tickets', icon: <BiChevronDownSquare /> },
    { id: 'Payments', url: '/payments', label: 'Payments', icon: <BiCreditCard /> },
    {
        id: 'clients',
        url: '/clients',
        label: 'clients',
        icon: <BiGroup />,
        children: [
            { id: 'clients/List', url: '/list', label: 'List' },
            { id: 'clients/Reviews', url: '/reviews', label: 'Reviews' },
            { id: 'clients/Notifications', url: '/notifications', label: 'Notifications' },
        ],
    },
    {
        id: 'Inventory',
        url: '/inventory',
        label: 'Inventory',
        icon: <BiPackage />,
        children: [
            { id: 'Inventory/Products', url: '/products', label: 'Products' },
            { id: 'Inventory/Orders', url: '/orders', label: 'Orders' },
            { id: 'Inventory/Suppliers', url: '/suppliers', label: 'Suppliers' },
        ],
    },
    {
        id: 'Shop',
        url: '/shop',
        label: 'Shop',
        icon: <BiStore />
    },
    { id: 'Reports', url: '/reports', label: 'Reports', icon: <BiBarChart /> },
    { id: 'Tender', url: '/tender', label: 'Tender', icon: <BiBriefcase /> },
    { id: 'Settings', url: '/settings', label: 'Settings', icon: <BiCog /> },
    { id: 'Knowledge Base', url: '/knowledge_base', label: 'Knowledge Base', icon: <BiBook /> },
]