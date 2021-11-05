import { BrowserRouter, Route, Switch } from "react-router-dom";
import ShowMagic from "./components/ShowMagic";
import Posts from "./pages/Posts";
import Header from "./components/Header";
import UserLogin from "./components/UserLogin"
import Table from "./components/Table"
import UserRegister from "./components/UserRegister"


function App() {
  return (
<BrowserRouter>
  <Route path="/" component={Header}/>
  <Switch>
    <Route exact path="/ShowMagic" component={ShowMagic} />
    <Route exact path="/Posts" component={Posts} />
    <Route exact path="/UserLogin" component={UserLogin} />
    <Route exact path="/Table" component={Table} />
    <Route exact path="/UserRegister" component={UserRegister} />
  </Switch>
</BrowserRouter>
  );
}


export default App;