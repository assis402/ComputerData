import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Computer } from "./pages/Computer";
import { Home } from "./pages/Home";
import { NewComputer } from "./pages/NewComputer";
import { UpdateComputer } from "./pages/UpdateComputer";

function App() {
  return (
    <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/computers/new" component={NewComputer}/>
            <Route path="/computers/update/:id" component={UpdateComputer}/>
            <Route path="/computers/:id" component={Computer}/>
          </Switch>
      </BrowserRouter>  
  );
}

export default App;