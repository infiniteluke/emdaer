module.exports = `## Adding emdaer to your project

We recommend using emdaer with [husky](https://github.com/typicode/husky).

Install dependencies:

\`\`\`sh
npm install --save-dev @emdaer/cli @emdaer/plugin-value-from-package husky
\`\`\`

Add a \`precommit\` script:

\`\`\`json
  "scripts": {
    "emdaer": "emdaer && git add *.md",
    "precommit": "npm run emdaer -- --yes"
  }
\`\`\`

NOTE: In the case of a \`precommit\` hook (or CI/other automation), we don't want to be prompted about anything. The \`--yes\` flag will automatically answer "yes" to any prompts. For example, it will make emdaer write your READMEs without prompting about overwritting existing changes.

Add a \`.emdaer/README.emdaer.md\` file:

<!-- prettier-ignore -->
\`\`\`md
# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->
\`\`\`

And give it a whirl:

\`\`\`sh
npm run emdaer
\`\`\`

NOTE: By default, emdaer checks for existing changes to your READMEs before writing. If it detects changes, it will provide a prompt asking if you would like to overwrite the README with the newly generated content. If you accidentally edited README directly, you will want to answer \`n\` to the prompt, move any changes to the respective .emdaer/*.emdaer.md file, and rerun emdaer. In the case where you may be writting your README incrementally and running emdaer multiple times, you can either answer \`Y\` to the prompt or use the \`--yes\` flag to skip the prompt all together. In both cases, emdaer will overwrite the README with the newly generated content.
`;
