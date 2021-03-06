const addStamp = require('./addStamp');

describe('addStamp', () => {
  test('adds a stamp', () => {
    expect(
      addStamp(
        `# Hello, World!
`,
        './emdaer/HELLO_WORLD.emdaer.md'
      )
    ).toBe(`<!--
  This file was generated by emdaer

  Its template can be found at ./emdaer/HELLO_WORLD.emdaer.md
-->

# Hello, World!
`);
  });
});
