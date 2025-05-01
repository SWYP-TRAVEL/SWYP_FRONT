import Header from "../Header";
import Main from "@/app/main/page";

export default function MainPage() {
  return (
    <>
      <Header user={{ username: 'momentier' }} onClickLogo={() => { }} />
      <Main />
    </>
  )
}