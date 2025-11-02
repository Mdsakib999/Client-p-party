export const validatePassword = (value) => {
    const errors = [];
    if (value.length < 6) errors.push("at least 6 characters");
    if (value.length > 30) errors.push("maximum 30 characters");
    if (!/[a-z]/.test(value)) errors.push("one lowercase letter");
    if (!/[A-Z]/.test(value)) errors.push("one uppercase letter");
    if (!/[0-9]/.test(value)) errors.push("one number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      errors.push("one special character");

    return errors.length === 0 || `Password must contain ${errors.join(", ")}`;
  };