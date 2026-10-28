export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

export const isPhone = (value) => /^[6-9]\d{9}$/.test(String(value).replace(/\s/g, ""));

export const required = (value) => String(value || "").trim().length > 0;

export const minLength = (value, n) => String(value || "").length >= n;

export const validateBookingCustomer = ({ name, email, phone, accepted }) => {
  const errors = {};
  if (!required(name) || name.trim().length < 2) errors.name = "Enter your full name.";
  if (!isEmail(email)) errors.email = "Enter a valid email address.";
  if (!isPhone(phone)) errors.phone = "Enter a 10-digit Indian mobile number.";
  if (!accepted) errors.accepted = "Please acknowledge the demo booking terms.";
  return errors;
};

export const validateAuth = ({ name, email, password, isSignup }) => {
  const errors = {};
  if (isSignup && (!required(name) || name.trim().length < 2)) {
    errors.name = "Enter your name.";
  }
  if (!isEmail(email)) errors.email = "Enter a valid email address.";
  if (!minLength(password, 6)) errors.password = "Password must be at least 6 characters.";
  return errors;
};

export const validateContact = ({ name, email, subject, message }) => {
  const errors = {};
  if (!required(name)) errors.name = "Enter your name.";
  if (!isEmail(email)) errors.email = "Enter a valid email address.";
  if (!required(subject)) errors.subject = "Add a subject.";
  if (!required(message) || message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
};
