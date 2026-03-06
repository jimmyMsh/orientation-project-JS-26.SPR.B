import { useState } from "react";
import "./App.css";
import SkillForm from "./components/SkillForm";

function App() {
  const [skills, setSkills] = useState([]);
  const [editingSkillIndex, setEditingSkillIndex] = useState(null);
  const [showSkillForm, setShowSkillForm] = useState(false);

  const handleAddSkill = (skill) => {
    setSkills([...skills, skill]);
    setShowSkillForm(false);
  };

  const handleEditSkill = (index, updatedSkill) => {
    setSkills(skills.map((s, i) => (i === index ? updatedSkill : s)));
    setEditingSkillIndex(null);
  };

  const handleCancelSkillForm = () => {
    setShowSkillForm(false);
    setEditingSkillIndex(null);
  };

  return (
    <div className="App">
      <h1>Resume Builder</h1>
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
        {skills.length === 0 && <p>No skills added yet.</p>}
        {skills.map((skill, index) => (
          <div key={index} className="skillItem">
            {editingSkillIndex === index ? (
              <SkillForm
                existingSkill={skill}
                onSave={(updatedSkill) => handleEditSkill(index, updatedSkill)}
                onCancel={handleCancelSkillForm}
              />
            ) : (
              <div className="skillDisplay">
                <p>
                  <strong>{skill.name}</strong> — {skill.proficiency}
                </p>
                <button
                  onClick={() => setEditingSkillIndex(index)}
                  className="editButton"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
        {showSkillForm ? (
          <SkillForm onSave={handleAddSkill} onCancel={handleCancelSkillForm} />
        ) : (
          <button onClick={() => setShowSkillForm(true)}>Add Skill</button>
        )}
        <br></br>
      </div>
      <br></br>
      <button>Export</button>
    </div>
  );
}

export default App;
