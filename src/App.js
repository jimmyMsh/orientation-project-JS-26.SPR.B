import { useState } from "react";
import LogoDropzone from "./components/LogoDropzone";
import "./App.css";

function App() {
  const [logos, setLogos] = useState({
    experience: null,
    education: null,
    skills: null,
  });

  const handleLogoChange = (section, logo) => {
    setLogos((prev) => ({ ...prev, [section]: logo }));
  };

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <div className="resumeSection">
        <h2>Experience</h2>
        <LogoDisplay logo={logos.experience} />
        <LogoDropzone
          logo={logos.experience}
          onLogoChange={(logo) => handleLogoChange("experience", logo)}
        />
        <p>Experience Placeholder</p>
        <button>Add Experience</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Education</h2>
        <LogoDisplay logo={logos.education} />
        <LogoDropzone
          logo={logos.education}
          onLogoChange={(logo) => handleLogoChange("education", logo)}
        />
        <p>Education Placeholder</p>
        <button>Add Education</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Skills</h2>
        <LogoDisplay logo={logos.skills} />
        <LogoDropzone
          logo={logos.skills}
          onLogoChange={(logo) => handleLogoChange("skills", logo)}
        />
        <p>Skill Placeholder</p>
        <button>Add Skill</button>
        <br></br>
      </div>
      <br></br>
      <button>Export</button>
    </div>
  );
}

function LogoDisplay({ logo }) {
  if (!logo) {
    return <p className="logoEmpty">No logo uploaded</p>;
  }

  return (
    <div className="logoDisplayContainer">
      <img src={logo} alt="Section logo" className="logoDisplayImage" />
    </div>
  );
}

export default App;
