import GithubButton from "./components/ui/GithubButton";
import GoogleButton from "./components/ui/GoogleButton"
import Logout from "./components/ui/Logout";

const App = () => {
  return (
    <div className="w-full flex-col gap-4 h-screen bg-black flex items-center justify-center p-4">
        <GoogleButton/>
        <GithubButton/>
        <Logout/>
    </div>
  )
}


export default App;
