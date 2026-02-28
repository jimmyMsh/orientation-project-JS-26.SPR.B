import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UserInfoForm from "./components/UserInfoForm";
import "./App.css";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <Routes>
        <Route
          path="/"
          element={
            <Resume userInfo={userInfo} />
          }
        />
        <Route
          path="/add-info"
          element={<UserInfoForm onSave={setUserInfo} />}
        />
        <Route
          path="/edit-info"
          element={<UserInfoForm existingInfo={userInfo} onSave={setUserInfo} />}
        />
      </Routes>
    </div>
  );
}

function Resume({ userInfo }) {
  return (
    <>
      <UserInfoDisplay userInfo={userInfo} />
      <div className="resumeSection">
        <h2>Experience</h2>
        <p>Experience Placeholder</p>
        <button>Add Experience</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Education</h2>
        <p>Education Placeholder</p>
        <button>Add Education</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Skills</h2>
        <p>Skill Placeholder</p>
        <button>Add Skill</button>
        <br></br>
      </div>
      <br></br>
      <button>Export</button>
    </>
  );
}

function UserInfoDisplay({ userInfo }) {
  if (!userInfo) {
    return (
      <div className="resumeSection userInfoSection">
        <p>No personal information added yet.</p>
        <a href="/add-info">
          <button>Add Personal Info</button>
        </a>
      </div>
    );
  }

  return (
    <div className="resumeSection userInfoSection">
      <h2>{userInfo.name}</h2>
      <p>{userInfo.phone}</p>
      <p>{userInfo.email}</p>
      <a href="/edit-info">
        <button>Edit Personal Info</button>
      </a>
    </div>
  );
}

export default App;
