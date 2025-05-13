import { User } from "@/store/useAuthStore";
import Header from "../Header";
import Main from "@/app/main/page";

export default function MainPage() {
  const mockUser: User = {
    userName: 'Jane Doe',
    accessToken: 'dummy-access-token',
    profileImage: '/icons/Avatar.svg',
    expiresIn: 100000
  };

  return (
    <>
      <Header user={mockUser} onClickLogo={() => { }} />
      <Main />
    </>
  )
}