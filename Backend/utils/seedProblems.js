import dotenv from "dotenv";
dotenv.config();

import supabase from "../config/supabase.js";

const problems = [
  {
    problem_number: 1,
    title: "Incorrect Array Loop",
    problem_statement:
      "The function below is intended to calculate the sum of all elements in an array, but it produces an incorrect result. Analyze the code, identify the bug, fix it, and verify your solution using the provided test cases.",
    language: "javascript",
    difficulty: "Easy",
    category: "Arrays",
    buggy_code: `function calculateSum(arr) {
    let sum = 0;

    for (let i = 0; i <= arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}`,
    solution_code: `function calculateSum(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
}`,
    function_name: "calculateSum",
    test_cases: [
      { input: [1, 2, 3], expectedOutput: 6 },
      { input: [5, 10, 15], expectedOutput: 30 },
      { input: [2, 4, 6, 8], expectedOutput: 20 },
    ],
    hints: [
      "Take a closer look at the loop condition.",
      "Check whether the loop is accessing a valid array index.",
      "JavaScript arrays start at index 0 and the last valid index is length - 1. Using <= instead of < will access an undefined element.",
    ],
    xp_reward: 100,
    estimated_time: 10,
    is_published: true,
  },
  {
    problem_number: 2,
    title: "String Comparison Error",
    problem_statement:
      "The function below is supposed to check if two strings are equal (case-insensitive), but it always returns incorrect results for mixed-case inputs. Find and fix the bug.",
    language: "javascript",
    difficulty: "Easy",
    category: "Strings",
    buggy_code: `function areEqualIgnoreCase(str1, str2) {
    return str1.toUpperCase() === str2.toLowerCase();
}`,
    solution_code: `function areEqualIgnoreCase(str1, str2) {
    return str1.toLowerCase() === str2.toLowerCase();
}`,
    function_name: "areEqualIgnoreCase",
    test_cases: [
      { input: ["Hello", "hello"], expectedOutput: true },
      { input: ["World", "WORLD"], expectedOutput: true },
      { input: ["JavaScript", "python"], expectedOutput: false },
    ],
    hints: [
      "Look at what case transformations are applied to each string.",
      "For a fair comparison, both strings should be converted to the same case.",
      "str1 is converted to uppercase while str2 is converted to lowercase — they need to both use the same method (either both toLowerCase or both toUpperCase).",
    ],
    xp_reward: 100,
    estimated_time: 8,
    is_published: true,
  },
  {
    problem_number: 3,
    title: "Off-by-One Error",
    problem_statement:
      "The function below is meant to reverse an array in-place, but it produces incorrect results. Find the bug and fix it.",
    language: "javascript",
    difficulty: "Easy",
    category: "Loops",
    buggy_code: `function reverseArray(arr) {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }

    return arr;
}`,
    solution_code: `function reverseArray(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }

    return arr;
}`,
    function_name: "reverseArray",
    test_cases: [
      { input: [[1, 2, 3, 4, 5]], expectedOutput: [5, 4, 3, 2, 1] },
      { input: [[10, 20]], expectedOutput: [20, 10] },
      { input: [[7]], expectedOutput: [7] },
    ],
    hints: [
      "Check the initial value of the right pointer.",
      "Remember that the last valid index of an array is length - 1, not length.",
      "Setting right = arr.length means the first swap tries to access arr[arr.length], which is undefined. Change it to arr.length - 1.",
    ],
    xp_reward: 100,
    estimated_time: 10,
    is_published: true,
  },
  {
    problem_number: 4,
    title: "Incorrect Conditional Logic",
    problem_statement:
      "The function below is supposed to determine the grade letter based on a percentage score, but it gives wrong grades for several inputs. Find and fix the bug.",
    language: "javascript",
    difficulty: "Medium",
    category: "Logic",
    buggy_code: `function getGrade(score) {
    if (score >= 90) {
        return "A";
    }
    if (score >= 80) {
        return "B";
    }
    if (score >= 70) {
        return "C";
    }
    if (score >= 60) {
        return "D";
    }
    if (score > 0) {
        return "F";
    }
    return "Invalid";
}`,
    solution_code: `function getGrade(score) {
    if (score >= 90) {
        return "A";
    }
    if (score >= 80) {
        return "B";
    }
    if (score >= 70) {
        return "C";
    }
    if (score >= 60) {
        return "D";
    }
    if (score >= 0) {
        return "F";
    }
    return "Invalid";
}`,
    function_name: "getGrade",
    test_cases: [
      { input: [95], expectedOutput: "A" },
      { input: [72], expectedOutput: "C" },
      { input: [0], expectedOutput: "F" },
      { input: [-5], expectedOutput: "Invalid" },
    ],
    hints: [
      "Test the function with a score of exactly 0. What does it return?",
      "Look at the condition that determines when a score should be 'F'.",
      "The condition 'score > 0' excludes a score of 0 which should still be an 'F'. Change it to 'score >= 0'.",
    ],
    xp_reward: 150,
    estimated_time: 12,
    is_published: true,
  },
  {
    problem_number: 5,
    title: "Null/Undefined Handling",
    problem_statement:
      "The function below is supposed to safely access a nested property from a user object, but it crashes when certain properties are missing. Find and fix the bug.",
    language: "javascript",
    difficulty: "Medium",
    category: "JavaScript Basics",
    buggy_code: `function getUserCity(user) {
    if (user) {
        return user.address.city;
    }
    return "Unknown";
}`,
    solution_code: `function getUserCity(user) {
    if (user && user.address) {
        return user.address.city;
    }
    return "Unknown";
}`,
    function_name: "getUserCity",
    test_cases: [
      {
        input: [{ name: "Alice", address: { city: "Mumbai" } }],
        expectedOutput: "Mumbai",
      },
      {
        input: [{ name: "Bob" }],
        expectedOutput: "Unknown",
      },
      {
        input: [null],
        expectedOutput: "Unknown",
      },
    ],
    hints: [
      "Think about what happens when the user exists but doesn't have an address property.",
      "The code checks if user exists, but doesn't check if user.address exists before accessing .city.",
      "Add a check for user.address in the if condition: if (user && user.address). Without this, accessing user.address.city throws an error when address is undefined.",
    ],
    xp_reward: 150,
    estimated_time: 10,
    is_published: true,
  },
];

async function seed() {
  console.log("Seeding problems to Supabase...\n");

  for (const problem of problems) {
    if (!problem.function_name || !Array.isArray(problem.test_cases)) {
      throw new Error(`Problem #${problem.problem_number} is missing its function name or test cases`);
    }
    if (problem.test_cases.some((testCase) => !testCase || !Object.hasOwn(testCase, "input") || !Object.hasOwn(testCase, "expectedOutput"))) {
      throw new Error(`Problem #${problem.problem_number} has a malformed test case`);
    }

    // Check if problem already exists
    const { data: existing } = await supabase
      .from("problems")
      .select("id")
      .eq("problem_number", problem.problem_number)
      .single();

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from("problems")
        .update(problem)
        .eq("problem_number", problem.problem_number);

      if (error) {
        console.error(`Error updating problem #${problem.problem_number}:`, error.message);
      } else {
        console.log(`Updated: Problem #${problem.problem_number} — ${problem.title}`);
      }
    } else {
      // Insert new
      const { error } = await supabase
        .from("problems")
        .insert([problem]);

      if (error) {
        console.error(`Error inserting problem #${problem.problem_number}:`, error.message);
      } else {
        console.log(`Inserted: Problem #${problem.problem_number} — ${problem.title}`);
      }
    }
  }

  console.log("\nSeeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed script error:", err);
  process.exit(1);
});
