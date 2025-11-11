/**
 * Mock API for Jules AI Command Center
 * This function simulates sending a command to a backend service.
 */

// This function simulates a network request.
// It returns a Promise that resolves or rejects after a delay.
function sendCommandToJules(command) {
  console.log(`Simulating sending command: ${command.name}`);

  return new Promise((resolve, reject) => {
    // Simulate a network delay of 1.5 seconds
    setTimeout(() => {
      // Simulate a random success or failure
      // Math.random() returns a number between 0 and 1.
      // So, there's a 90% chance of success.
      if (Math.random() < 0.9) {
        // Resolve the promise with a success message
        resolve({
          status: 'success',
          message: `Command "${command.name}" executed successfully.`,
          data: {
            timestamp: new Date().toISOString(),
            // You could add more simulated data here
          }
        });
      } else {
        // Reject the promise with an error message
        reject({
          status: 'error',
          message: `Command "${command.name}" failed. Simulated backend error.`,
          error_code: 'JULES-500'
        });
      }
    }, 1500);
  });
}
