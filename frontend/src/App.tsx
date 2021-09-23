import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import { Home } from "./pages/Home";
import { NewComputer } from "./pages/NewComputer";
import { UpdateComputer } from "./pages/UpdateComputer";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/new" component={NewComputer}/>
          <Route path="/update" component={UpdateComputer}/>
        </Switch>
      </BrowserRouter>  
    </AppContextProvider>
  );
}

export default App;
