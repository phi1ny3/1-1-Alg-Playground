# Adding TypeScript to Algorithm Playground
This is a short record of what I did to add TypeScript what I learned while debugging.
## Some things I learned

    -TypeScript is a superset of JavaScript. Any valid JS is valid TS.
    -Because of the config (tsconfig.json) with strict, etc, I had to adjust string type, char, etc -because they were technically undefined
    -I learned a trick from my freelance work: npm run watch lets me auto-compile TS to JS on save.

## What changed in the code?
### 1) var → let / const

    var has function scope and can leak out of blocks, which causes subtle bugs.
    let and const are block-scoped, which fits how we reason about code.
    Rule of thumb:
        Use const by default for values that don’t change.
        Use let for values that change (counters, accumulators).
        Avoid var.

### 2) Palindrome normalization

    I normalize input by:
        lowercasing
        removing whitespace
    This makes "Race Car" count as a palindrome.

### 3) Factorial overflow

    Number overflows for large n (beyond ~170!).
    I switched factorial to BigInt so it safely returns exact integer results for large n.
    It returns strings in the UI to avoid any formatting surprises.

### 4) Type safety and DOM access

    A small helper getEl<T>() asserts the element exists and narrows its type (e.g., HTMLInputElement).
    This avoids “undefined” access bugs and gives better autocompletion.

## How I added TypeScript
Initialize Node project (if needed):

npm init -y

