import UserInputs from "@/app/userinputs/page";
import Header from "../Header";

export default function UserInput() {
  return (
    <>
      <Header user={{ username: 'momentier' }} onClickLogo={() => { }} />
      <UserInputs />
    </>
  )
}