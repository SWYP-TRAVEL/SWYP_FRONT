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
    const loadingType = useLoadingStore((state) => state.loadingType);

    return (
        <>
            {(isLoading && loadingType === 'fullscreen') ? <FullScreenLoader /> : null}
            {(isLoading && loadingType === 'login') ? <FullScreenLoader title='로그인 처리중입니다.' /> : null}
            {isMapPage
                ? <MapLayout>{children}</MapLayout>
                : <AppLayout>{children}</AppLayout>
            }
        </>
    )

}
