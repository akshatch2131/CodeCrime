import vm from "node:vm";
import { isDeepStrictEqual } from "node:util";

const isValidFunctionName = (name) =>
  typeof name === "string" && /^[A-Za-z_$][\w$]*$/.test(name);

/** Execute user JavaScript independently for each public test case. */
export const runTestCases = (userCode, testCases, functionName = "solution") => {
  const cases = Array.isArray(testCases) ? testCases : [];
  const results = [];
  let passed = 0;

  for (const testCase of cases) {
    const input = testCase?.input;
    const expectedOutput = testCase?.expectedOutput ?? testCase?.expected;
    try {
      if (typeof userCode !== "string" || !userCode.trim()) {
        throw new TypeError("Code is empty");
      }
      if (!isValidFunctionName(functionName)) {
        throw new TypeError("Invalid configured function name");
      }

      const sandbox = { console: { log() {}, error() {}, warn() {} } };
      const context = vm.createContext(sandbox);
      const source = `${userCode}\n;typeof ${functionName} === "function"`;
      new vm.Script(source).runInContext(context, { timeout: 3000 });

      if (vm.runInContext(`typeof ${functionName}`, context, { timeout: 3000 }) !== "function") {
        throw new ReferenceError(`${functionName} is not defined`);
      }

      const arity = vm.runInContext(`${functionName}.length`, context, { timeout: 3000 });
      // One-argument problems use input as that argument (including arrays);
      // multi-argument problems use input as the positional argument list.
      const args = Array.isArray(input)
        ? arity > 1
          ? input
          : [input.length === 1 ? input[0] : input]
        : [input];
      sandbox.__testArgs = JSON.parse(JSON.stringify(args));
      const rawOutput = vm.runInContext(
        `${functionName}(...__testArgs)`,
        context,
        { timeout: 3000 },
      );
      const serializedOutput = JSON.stringify(rawOutput);
      const actualOutput = serializedOutput === undefined
        ? undefined
        : JSON.parse(serializedOutput);
      const isEqual = isDeepStrictEqual(actualOutput, expectedOutput);
      if (isEqual) passed++;

      results.push({
        input,
        expectedOutput,
        actualOutput,
        status: isEqual ? "passed" : "failed",
        passed: isEqual,
      });
    } catch (error) {
      results.push({
        input,
        expectedOutput,
        actualOutput: `${error.name}: ${error.message}`,
        status: "error",
        passed: false,
        error: `${error.name}: ${error.message}`,
      });
    }
  }

  return { results, passed, total: cases.length };
};
