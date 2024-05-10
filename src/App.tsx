import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Sidebar from "./components/Sidebar";
import DepartmentList from "./components/DepartmentList";
import DepartmentDetails from "./components/DepartmentDetails";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div className="content" style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<DepartmentList />} />
              <Route
                path="/:deptName"
                element={
                  <>
                    <DepartmentDetails />
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
