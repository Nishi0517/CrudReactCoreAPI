import StudentCrud from "./Components/StudentCrud";
import LoginPage from "./Components/LoginPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UsersList from "./Components/UersList";
// import './node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={StudentCrud} />
        <Route path="/login" component={LoginPage} />
        <Route path="/Admin/UsersList" component={UsersList} />
    </Switch>
    </Router>
  );
}

export default App;
