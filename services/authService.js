// services/authService.js

export const loginUser = async (email, password) => {
  try {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Login successful',
        });
      }, 1000);
    });

    return response;
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signupUser = async (email, password) => {
  try {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Signup successful',
        });
      }, 1000);
    });

    return response;
  } catch (error) {
    return { success: false, error: error.message };
  }
};
