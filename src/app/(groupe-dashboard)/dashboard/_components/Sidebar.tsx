'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building, CalendarCheck, CirclePlus } from 'lucide-react';

const navItems = [
    { href: '/dashboard/add-facility', label: 'Add Facility', icon: CirclePlus },
    { href: '/dashboard/event-booking', label: 'Event Booking', icon: CalendarCheck },
    { href: '/dashboard/event-facilities', label: 'Event Facilities', icon: Building },
];

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 shrink-0 border-r border-border bg-card min-h-screen p-4">
            <nav className="flex flex-col gap-1">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;

                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={isActive ? 'page' : undefined}
                            className={
                                isActive
                                    ? 'flex items-center gap-3 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground'
                                    : 'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors'
                            }
                        >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
