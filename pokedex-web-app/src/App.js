import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailPage from './pages/Detail'
import { Switch, Route } from 'react-router';
import { ApolloProvider } from '@apollo/client'
import client from './config/index'
import Home from './pages/Home'

function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route path="/:pokemon">
          <DetailPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </ApolloProvider>
  );
}

export default App;
