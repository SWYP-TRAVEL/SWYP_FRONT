'use client';

import AppLayout from '@/components/layout/AppLayout';
import MapLayout from '@/components/layout/MapLayout';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

interface LayoutSelectorProps {
    children: ReactNode;
}

const DUAL_LAYOUT_PATHS = ['/travel/detail'];

export default function LayoutSelector({ children }: LayoutSelectorProps) {
    const pathname = usePathname();
    const isMapPage = DUAL_LAYOUT_PATHS.some((path) => pathname.startsWith(path));

    console.log(isMapPage);

    return isMapPage ? (
        <MapLayout>
            {children}
        </MapLayout>
    ) : (
        <AppLayout>
            {children}
        </AppLayout>
    );
}
