function get(id) {
  return document.getElementById(id);
}

function showResult(id, message, isError) {
  var el = get(id);
  el.textContent = message;
  if (isError) {
    el.classList.add("error");
  } else {
    el.classList.remove("error");
  }
}

// 1) Reverse a String
function handleReverse() {
  var value = get("rev-input").value;
  if (!value) {
    showResult("rev-result", "Please enter some text.", true);
    return;
  }

  var chars = value.split("");
  var left = 0;
  var right = chars.length - 1;
  while (left < right) {
    var tmp = chars[left];
    chars[left] = chars[right];
    chars[right] = tmp;
    left++;
    right--;
  }

  showResult("rev-result", chars.join(""), false);
}

// 2) Factorial Calculator
function handleFactorial() {
  var raw = get("fact-input").value;
  if (!raw) {
    showResult("fact-result", "Please enter a number.", true);
    return;
  }

  var n = Number(raw);
  if (!Number.isInteger(n) || n < 0) {
    showResult("fact-result", "Enter a non-negative integer.", true);
    return;
  }

  var result = 1;
  for (var i = 2; i <= n; i++) {
    result = result * i;
  }
  showResult("fact-result", String(result), false);
}

// 3) Check Palindrome
function handlePalindrome() {
  var value = get("pal-input").value;
  if (!value) {
    showResult("pal-result", "Please enter some text.", true);
    return;
  }

  var reversed = "";
  for (var i = value.length - 1; i >= 0; i--) {
    reversed += value[i];
  }

  if (value === reversed) {
    showResult("pal-result", "Yes, it's a palindrome!", false);
  } else {
    showResult("pal-result", "No, not a palindrome.", false);
  }
}

// 4) Find Max Num
function handleFindMax() {
  var raw = get("max-input").value;
  if (!raw) {
    showResult("max-result", "Please enter numbers like: 3, 7, 2, 9", true);
    return;
  }

  var parts = raw.split(",");
  var hasAny = false;
  var maxValue = -Infinity;

  for (var i = 0; i < parts.length; i++) {
    var trimmed = parts[i].trim();
    if (trimmed.length === 0) {
      continue;
    }
    var num = Number(trimmed);
    if (!isNaN(num)) {
      hasAny = true;
      if (num > maxValue) {
        maxValue = num;
      }
    }
  }

  if (!hasAny) {
    showResult("max-result", "Please enter a valid comma-separated list of numbers.", true);
    return;
  }

  showResult("max-result", String(maxValue), false);
}

// 5) Count Vowels
function handleCountVowels() {
  var value = get("vowel-input").value;
  if (!value) {
    showResult("vowel-result", "Please enter some text.", true);
    return;
  }

  var lower = value.toLowerCase();
  var count = 0;
  for (var i = 0; i < lower.length; i++) {
    var ch = lower[i];
    if (ch === "a" || ch === "e" || ch === "i" || ch === "o" || ch === "u") {
      count++;
    }
  }

  showResult("vowel-result", String(count), false);
}

// 6) Fibonacci Num (nth, 0-indexed)
function handleFibonacci() {
  var raw = get("fib-input").value;
  if (!raw) {
    showResult("fib-result", "Please enter an integer n (e.g., 6).", true);
    return;
  }

  var n = Number(raw);
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

  var a = 0;
  var b = 1;
  for (var i = 2; i <= n; i++) {
    var next = a + b;
    a = b;
    b = next;
  }
  showResult("fib-result", String(b), false);
}

// 7) Sum of 1 to N
function handleSumToN() {
  var raw = get("sum-input").value;
  if (!raw) {
    showResult("sum-result", "Please enter an integer n (e.g., 10).", true);
    return;
  }

  var n = Number(raw);
  if (!Number.isInteger(n) || n < 0) {
    showResult("sum-result", "Enter a non-negative integer.", true);
    return;
  }

  var sum = (n * (n + 1)) / 2;
  showResult("sum-result", String(sum), false);
}

// 8) Even or Odd
function handleEvenOdd() {
  var raw = get("eo-input").value;
  if (!raw) {
    showResult("eo-result", "Please enter an integer.", true);
    return;
  }

  var n = Number(raw);
  if (!Number.isInteger(n)) {
    showResult("eo-result", "Enter a whole number (integer).", true);
    return;
  }

  if (n % 2 === 0) {
    showResult("eo-result", "Even", false);
  } else {
    showResult("eo-result", "Odd", false);
  }
}

// Button Event Setup
function setup() {
  get("rev-btn").addEventListener("click", handleReverse);
  get("fact-btn").addEventListener("click", handleFactorial);
  get("pal-btn").addEventListener("click", handlePalindrome);
  get("max-btn").addEventListener("click", handleFindMax);
  get("vowel-btn").addEventListener("click", handleCountVowels);
  get("fib-btn").addEventListener("click", handleFibonacci);
  get("sum-btn").addEventListener("click", handleSumToN);
  get("eo-btn").addEventListener("click", handleEvenOdd);
}

document.addEventListener("DOMContentLoaded", setup);
