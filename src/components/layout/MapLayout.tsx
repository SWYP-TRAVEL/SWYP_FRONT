'use client';

import Header from '@/components/Header';
import KakaoMap from '@/components/KakaoMap';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useEffect } from 'react';

interface MapLayoutProps {
    children: React.ReactNode;
}

export default function MapLayout({ children }: MapLayoutProps) {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        console.log('🗺️ MapLayout children:', children);
    }, [children]);

    return (
        <div className="flex h-screen">
            <aside className="relative w-[980px] border-r border-gray-200">
                <div className="fixed w-[980px] top-0 z-10 bg-white shadow-md">
                    <Header
                        user={user}
                        onClickLogo={() => router.push('/')}
                        onClickProfile={() => router.push('/mypage')}
                    />
                </div>
                <main className="pt-[60px]">
                    {children || (
                        <div className="p-4 text-red-500">❌ No Content Found</div>
                    )}
                </main>
            </aside>

            <section className="flex-grow h-full">
                <KakaoMap latitude={37.787138} longitude={128.899383} />
            </section>
        </div>
    );
}
