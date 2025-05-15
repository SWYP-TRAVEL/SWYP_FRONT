'use client';

import FullScreenLoader from '@/components/FullScreenLoader';
import AppLayout from '@/components/layout/AppLayout';
import MapLayout from '@/components/layout/MapLayout';
import { useLoadingStore } from "@/store/useLoadingStore";
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutSelectorProps {
    children: ReactNode;
}

const DUAL_LAYOUT_PATHS = ['/travel/detail'];

export default function LayoutSelector({ children }: LayoutSelectorProps) {
    const pathname = usePathname();
    const isMapPage = DUAL_LAYOUT_PATHS.some((path) => pathname.startsWith(path));
    const isLoading = useLoadingStore((state) => state.isLoading);

    return (
        <>
            {isLoading ? <FullScreenLoader /> : null}
            {isMapPage
                ? <MapLayout>{children}</MapLayout>
                : <AppLayout>{children}</AppLayout>
            }
        </>
    )

}
