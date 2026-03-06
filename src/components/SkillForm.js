import { useState } from "react";

function SkillForm({ existingSkill, onSave, onCancel }) {
  const [name, setName] = useState(existingSkill?.name || "");
  const [proficiency, setProficiency] = useState(
    existingSkill?.proficiency || ""
  );
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Skill name is required.";
    }

    if (!proficiency.trim()) {
      newErrors.proficiency = "Proficiency level is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({ name: name.trim(), proficiency: proficiency.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="skillForm">
      <h3>{existingSkill ? "Edit Skill" : "Add Skill"}</h3>
      <div className="formGroup">
        <label htmlFor="skillName">Skill Name</label>
        <input
          id="skillName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="formGroup">
        <label htmlFor="proficiency">Proficiency</label>
        <select
          id="proficiency"
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
        >
          <option value="">Select proficiency</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
        {errors.proficiency && (
          <span className="error">{errors.proficiency}</span>
        )}
      </div>
      <div className="formActions">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default SkillForm;
