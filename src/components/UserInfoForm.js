import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserInfoForm({ existingInfo, onSave }) {
  const navigate = useNavigate();
  const [name, setName] = useState(existingInfo?.name || "");
  const [phone, setPhone] = useState(existingInfo?.phone || "");
  const [email, setEmail] = useState(existingInfo?.email || "");
  const [errors, setErrors] = useState({});

  const validatePhone = (value) => {
    const internationalPhoneRegex = /^\+\d{1,3}\s?\d{4,14}$/;
    return internationalPhoneRegex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!validatePhone(phone)) {
      newErrors.phone =
        "Phone must include an international country code (e.g. +1 1234567890).";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({ name: name.trim(), phone: phone.trim(), email: email.trim() });
    navigate("/");
  };

  return (
    <div className="resumeSection">
      <h2>{existingInfo ? "Edit" : "Add"} Personal Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 1234567890"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="formGroup">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UserInfoForm;
