import { Component } from '@angular-devkit/build-angular';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import QuestionView from './components/QuestionView';
import QuizView from './components/QuizView';


class App extends Component {
  render() {
    return (
    <div className="App">
      <Header path />
      <Router>
        <Switch>
          <Route path="/" exact component={QuestionView} />
          <Route path="/play" component={QuizView} />
          <Route component={QuestionView} />
        </Switch>
      </Router>
    </div>
  );

  }
}

export default App;