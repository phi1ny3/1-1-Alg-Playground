// Some changes to be made esp with guards
function getEl<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element with id "${id}" not found`);
  return el as T;
}

function getInput(id: string): HTMLInputElement {
  return getEl<HTMLInputElement>(id);
}

function showResult(id: string, message: string, isError: boolean): void {
  const el = getEl<HTMLElement>(id);
  el.textContent = message;
  if (isError) el.classList.add("error");
  else el.classList.remove("error");
}

// 1) Reverse a String
function handleReverse(): void {
  const value = getInput("rev-input").value ?? "";
  if (!value) {
    showResult("rev-result", "Please enter some text.", true);
    return;
  }

  const chars = value.split("");
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    const tmp = chars[left]!;
    chars[left] = chars[right]!;
    chars[right] = tmp;
    left++;
    right--;
  }

  showResult("rev-result", chars.join(""), false);
}

// 2) Factorial Calculator (use BigInt to avoid Number overflow)
function factorialBigInt(n: number): bigint {
  let result = 1n;
  for (let i = 2; i <= n; i++) result *= BigInt(i);
  return result;
}

function handleFactorial(): void {
  const raw = getInput("fact-input").value ?? "";
  if (!raw) {
    showResult("fact-result", "Please enter a number.", true);
    return;
  }

  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) {
    showResult("fact-result", "Enter a non-negative integer.", true);
    return;
  }

  // This renders very large integers as strings (expected and safe).
  const result = factorialBigInt(n).toString();
  showResult("fact-result", result, false);
}

// 3) Check Palindrome (ignore whitespace & capitalization)
function handlePalindrome(): void {
  const raw = getInput("pal-input").value ?? "";
  if (!raw) {
    showResult("pal-result", "Please enter some text.", true);
    return;
  }

  const value = raw.toLowerCase().replace(/\s+/g, ""); // normalize
  let reversed = "";
  for (let i = value.length - 1; i >= 0; i--) {
    reversed += value.charAt(i);
  }

  const msg = value === reversed ? "Yes, it's a palindrome!" : "No, not a palindrome.";
  showResult("pal-result", msg, false);
}

// 4) Find Max Num
function handleFindMax(): void {
  const raw = getInput("max-input").value ?? "";
  if (!raw) {
    showResult("max-result", "Please enter numbers like: 3, 7, 2, 9", true);
    return;
  }

  const parts = raw.split(",");
  let hasAny = false;
  let maxValue = -Infinity;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part === undefined) continue;       // <-- guard for noUncheckedIndexedAccess
    const trimmed = part.trim();
    if (!trimmed) continue;

    const num = Number(trimmed);
    if (!Number.isNaN(num)) {
      hasAny = true;
      if (num > maxValue) maxValue = num;
    }
  }

  if (!hasAny) {
    showResult("max-result", "Please enter a valid comma-separated list of numbers.", true);
    return;
  }

  showResult("max-result", String(maxValue), false);
}


// 5) Count Vowels
function handleCountVowels(): void {
  const value = getInput("vowel-input").value ?? "";
  if (!value) {
    showResult("vowel-result", "Please enter some text.", true);
    return;
  }

  const lower = value.toLowerCase();
  let count = 0;
  for (let i = 0; i < lower.length; i++) {
    const ch = lower.charAt(i);             // <-- avoids possible undefined
    if (ch === "a" || ch === "e" || ch === "i" || ch === "o" || ch === "u") {
      count++;
    }
  }

  showResult("vowel-result", String(count), false);
}


// 6) Fibonacci Num (nth, 0-indexed)
function handleFibonacci(): void {
  const raw = getInput("fib-input").value ?? "";
  if (!raw) {
    showResult("fib-result", "Please enter an integer n (e.g., 6).", true);
    return;
  }

  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) {
    showResult("fib-result", "Enter a non-negative integer.", true);
    return;
  }

  if (n === 0) {
    showResult("fib-result", "0", false);
    return;
  }
  if (n === 1) {
    showResult("fib-result", "1", false);
    return;
  }

  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    const next = a + b;
    a = b;
    b = next;
  }
  showResult("fib-result", String(b), false);
}

// 7) Sum of 1 to N
function handleSumToN(): void {
  const raw = getInput("sum-input").value ?? "";
  if (!raw) {
    showResult("sum-result", "Please enter an integer n (e.g., 10).", true);
    return;
  }

  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0) {
    showResult("sum-result", "Enter a non-negative integer.", true);
    return;
  }

  const sum = (n * (n + 1)) / 2;
  showResult("sum-result", String(sum), false);
}

// 8) Even or Odd
function handleEvenOdd(): void {
  const raw = getInput("eo-input").value ?? "";
  if (!raw) {
    showResult("eo-result", "Please enter an integer.", true);
    return;
  }

  const n = Number(raw);
  if (!Number.isInteger(n)) {
    showResult("eo-result", "Enter a whole number (integer).", true);
    return;
  }

  showResult("eo-result", n % 2 === 0 ? "Even" : "Odd", false);
}

// Button Event Setup (explicit and simple)
function setup(): void {
  getEl<HTMLButtonElement>("rev-btn").addEventListener("click", handleReverse);
  getEl<HTMLButtonElement>("fact-btn").addEventListener("click", handleFactorial);
  getEl<HTMLButtonElement>("pal-btn").addEventListener("click", handlePalindrome);
  getEl<HTMLButtonElement>("max-btn").addEventListener("click", handleFindMax);
  getEl<HTMLButtonElement>("vowel-btn").addEventListener("click", handleCountVowels);
  getEl<HTMLButtonElement>("fib-btn").addEventListener("click", handleFibonacci);
  getEl<HTMLButtonElement>("sum-btn").addEventListener("click", handleSumToN);
  getEl<HTMLButtonElement>("eo-btn").addEventListener("click", handleEvenOdd);
}

document.addEventListener("DOMContentLoaded", setup);
