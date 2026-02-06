export const validation = {
  isEmail: (email: string): boolean => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return re.test(email);
  },

  isURL: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  isStrongPassword: (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars
    );
  },

  isPhoneNumber: (phone: string): boolean => {
    const re = /^\+?[\d\s-]{10,}$/;
    return re.test(phone);
  },

  isNumeric: (value: string): boolean => {
    return !Number.isNaN(Number.parseFloat(value)) && Number.isFinite(Number(value));
  },
};
