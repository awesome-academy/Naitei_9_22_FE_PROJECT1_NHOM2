export const validationRules = {
  required: (value: string, fieldName: string) => {
    return value.trim() ? null : `Vui lòng nhập ${fieldName}`;
  },

  email: (value: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(value) ? null : "Email không hợp lệ";
  },

  phone: (value: string) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(value.replace(/\s/g, '')) ? null : "Số điện thoại không hợp lệ";
  },

  url: (value: string) => {
    try {
      new URL(value.startsWith('http') ? value : `https://${value}`);
      return null;
    } catch {
      return "Website không hợp lệ";
    }
  },

  minLength: (value: string, min: number) => {
    return value.length >= min ? null : `Phải có ít nhất ${min} ký tự`;
  },

  maxLength: (value: string, max: number) => {
    return value.length <= max ? null : `Không được vượt quá ${max} ký tự`;
  },

  confirmPassword: (password: string, confirmPassword: string) => {
    return password === confirmPassword ? null : "Mật khẩu xác nhận không khớp";
  },

};

// Interface for registration data
export interface RegistrationData {
  fullName: string;
  phone: string;
  email: string;
  website: string;
  password: string;
  confirmPassword: string;
}

export const validateRegistrationData = (data: RegistrationData) => {
  const errors: string[] = [];

  const addError = (error: string | null) => {
    if (error) errors.push(error);
  };

  addError(validationRules.required(data.fullName, "họ và tên"));
  
  addError(validationRules.required(data.phone, "số điện thoại"));
  if (data.phone.trim()) {
    addError(validationRules.phone(data.phone));
  }
  
  addError(validationRules.required(data.email, "email"));
  if (data.email.trim()) {
    addError(validationRules.email(data.email));
  }
  
  addError(validationRules.required(data.website, "website"));
  if (data.website.trim()) {
    addError(validationRules.url(data.website));
  }
  
  addError(validationRules.required(data.password, "mật khẩu"));
  if (data.password) {
    addError(validationRules.minLength(data.password, 8));
  }
  
  addError(validationRules.required(data.confirmPassword, "xác nhận mật khẩu"));
  if (data.password && data.confirmPassword) {
    addError(validationRules.confirmPassword(data.password, data.confirmPassword));
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

