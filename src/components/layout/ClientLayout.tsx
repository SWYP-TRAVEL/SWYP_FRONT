'use client'

import QueryProvider from '@/components/QueryProvider'
import { ModalProvider } from '@/providers/ModalProvider'
import LayoutSelector from '@/components/layout/LayoutSelector'
import ToastContainer from '@/components/ToastContainer'
import { ReactNode } from 'react'

export default function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <QueryProvider>
            <ModalProvider>
                <LayoutSelector>
                    {children}
                    <ToastContainer />
                </LayoutSelector>
            </ModalProvider>
        </QueryProvider>
    )
}
