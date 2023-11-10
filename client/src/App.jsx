import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Chatpage from "./pages/Chatpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route path="/chat" element={<Chatpage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
