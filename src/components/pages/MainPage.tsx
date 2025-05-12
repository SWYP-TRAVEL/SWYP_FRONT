import { User } from "@/store/useAuthStore";
import Header from "../Header";
import Main from "@/app/main/page";

export default function MainPage() {
  const mockUser: User = {
    userName: 'Jane Doe',
    accessToken: 'dummy-access-token',
    refreshToken: 'dummy-refresh-token',
    profileImage: '/icons/Avatar.svg', // or 다른 이미지 URL
  };

  return (
    <>
      <Header user={mockUser} onClickLogo={() => { }} />
      <Main />
    </>
  )
}