
import { useState } from "react";
import "./App.css";

function App() {
  const initialData = {
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "phone"
          ? value.replace(/\D/g, "").slice(0, 10)
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit inquiry to MongoDB through backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (loading || !validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/inquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit inquiry");
      }

      setSuccess("Thank you! Your inquiry has been submitted successfully.");

      setFormData(initialData);
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
      setSuccess("");
      alert(
        error.message ||
          "Unable to submit inquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Let's Connect</h1>
        <p>Tell us about your project. We'd love to hear from you.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div>
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
              />
              <small className="error">{errors.name}</small>
            </div>

            <div>
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              <small className="error">{errors.email}</small>
            </div>

            <div>
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="10-digit number"
                value={formData.phone}
                onChange={handleChange}
              />
              <small className="error">{errors.phone}</small>
            </div>

            <div>
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                placeholder="Your organization"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="industry">Industry</label>
              <input
                id="industry"
                name="industry"
                placeholder="e.g. Healthcare"
                value={formData.industry}
                onChange={handleChange}
              />
            </div>

            <div className="full">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
              />
              <small className="error">{errors.message}</small>
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Send Inquiry"}
          </button>

          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </div>
  );
}

export default App;
