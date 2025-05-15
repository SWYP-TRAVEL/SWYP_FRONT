import React from 'react';

import Text from './Text';
import Image from 'next/image';
import { type User } from '@/store/useAuthStore';


export interface HeaderProps {
  user: User | null;
  onClickLogo: () => void;
  onClickProfile?: () => void;
}

export default function Header({ user, onClickLogo, onClickProfile }: HeaderProps) {
  return (
    <header className="w-full bg-white shadow z-50">
      <div className="mx-auto max-w-[1100px] px-5 py-3.5 h-[60px] flex items-center justify-between">
        <div className='cursor-pointer' onClick={onClickLogo}>
          <Image src='/icons/MainLogo.png' alt='모먼티어 메인로고 이미지' width={137} height={28} />
        </div>

        {/* 네비게이션 or 로그인 버튼 자리 (필요시 확장 가능) */}
        {user ?
          <div className="flex items-center gap-4">
            {/* TODO: kakao 로그인 시 유저프로필 이미지 주는지 검토 */}
            <Image
              // src={user.imgPath || '/icons/Avatar.svg'}
              src={'/icons/Avatar.svg'}
              alt="유저프로필이미지"
              width={40}
              height={40}
              onClick={onClickProfile}
            />
          </div>
          : null}
      </div>
    </header>
  )
}
