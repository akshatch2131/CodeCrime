import vm from "node:vm";

/**
 * Safely execute user JavaScript code against predefined test cases.
 * Uses Node.js vm module with timeout for basic sandboxing.
 *
 * @param {string} userCode - The user's submitted JavaScript code
 * @param {Array} testCases - Array of { input, expectedOutput }
 * @param {string} functionName - The name of the function to test
 * @returns {Object} { results: [...], passed: number, total: number }
 */
export const runTestCases = (userCode, testCases, functionName) => {
  const results = [];
  let passed = 0;
  const total = testCases.length;

  for (const testCase of testCases) {
    try {
      // Create a sandbox context
      const sandbox = {
        console: { log: () => {} },
        result: undefined,
      };

      // Build the execution script:
      // 1. Define the user's function
      // 2. Call it with the test input
      // 3. Store the result
      const inputStr = JSON.stringify(testCase.input);
      const script = new vm.Script(
        `${userCode}\nresult = ${functionName}(${inputStr});`
      );

      // Create context and run with timeout
      const context = vm.createContext(sandbox);
      script.runInContext(context, { timeout: 3000 });

      const actualOutput = sandbox.result;
      const expectedOutput = testCase.expectedOutput;

      // Deep comparison
      const isEqual = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);

      if (isEqual) {
        passed++;
      }

      results.push({
        input: testCase.input,
        expectedOutput,
        actualOutput,
        status: isEqual ? "passed" : "failed",
      });
    } catch (error) {
      results.push({
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: error.message,
        status: "error",
      });
    }
  }

  return { results, passed, total };
};
