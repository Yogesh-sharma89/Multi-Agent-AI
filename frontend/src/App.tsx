
import AppProvider from "./provider/AppProvider";

const App = () => {
  return (
    <div className="w-full flex-col gap-4 h-screen bg-black flex items-center justify-center p-4">
        <AppProvider/>
    </div>
  )
}


export default App;
