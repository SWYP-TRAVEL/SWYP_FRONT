import UserInputs from "@/app/userinputs/page";
import Header from "../Header";
import { User } from "@/store/useAuthStore";

export default function UserInput() {
  const mockUser: User = {
    userName: 'Jane Doe',
    accessToken: 'dummy-access-token',
    profileImage: '/icons/Avatar.svg', // or 다른 이미지 URL
    expiresIn: 100000
  };
  return (
    <>
      <Header user={mockUser} onClickLogo={() => { }} />
      <UserInputs />
    </>
  )
}