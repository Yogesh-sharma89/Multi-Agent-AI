import GithubButton from "./components/ui/GithubButton";
import GoogleButton from "./components/ui/GoogleButton"

const App = () => {
  return (
    <div className="w-full flex-col gap-4 h-screen bg-black flex items-center justify-center p-4">
        <GoogleButton/>
        <GithubButton/>
    </div>
  )
}


export default App;
