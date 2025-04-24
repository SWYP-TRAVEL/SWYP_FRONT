"use client"

import { RecoilRoot } from 'recoil'
import { AuthProvider } from '@/components/AuthProvider'

import "@fontsource/pretendard";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RecoilRoot>
          <AuthProvider>
            {children}
          </AuthProvider>
        </RecoilRoot>
      </body>
    </html>
  )
}