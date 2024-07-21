// services/codeExecutionService.js

// Simulated code execution function
export const executeCode = async (code) => {
    try {
      // Simulate an API call with a delay
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            output: `Executed code:\n${code}`
          });
        }, 1000); // Simulated delay of 1 second
      });
  
      // Check if the execution was successful
      if (response.success) {
        return response.output;
      } else {
        throw new Error('Code execution failed');
      }
    } catch (error) {
      return `Error: ${error.message}`;
    }
  };
  