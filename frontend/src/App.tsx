import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewComputer } from "./pages/NewComputer";
import { UpdateComputer } from "./pages/UpdateComputer";

function App() {
  return (
    <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/computers/new" component={NewComputer}/>
            <Route path="/computers/update" component={UpdateComputer}/>
          </Switch>
      </BrowserRouter>  
  );
}

export default App;
