import AuthProvider from "./context/authContext.jsx";
import Router from "./routes/Router.jsx";


const App = () => {
  return (
      <div className={'h-screen flex flex-col'}>
        <AuthProvider>
        <Router/>
        </AuthProvider>

      </div>
  )
}

export default App