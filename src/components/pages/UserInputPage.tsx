import UserInputs from "@/app/userinputs/page";
import Header from "../Header";

export default function MainPage() {
  return (
    <>
      <Header user={{ username: 'momentier' }} onClickLogo={() => { }} />
      <UserInputs />
    </>
  )
}