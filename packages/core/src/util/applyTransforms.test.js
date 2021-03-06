jest.mock('./applyTransform', () => jest.fn().mockImplementation(() => ''));

const applyTransforms = require('./applyTransforms');
const applyTransform = require('./applyTransform');
const EmdaerError = require('./EmdaerError');
const { NO_TRANSFORM } = require('../errors');

describe('applyTransforms', () => {
  test('returns unaltered content when no transforms are found', async () => {
    const CONTENT = 'sup dawg';
    expect(await applyTransforms(CONTENT, [])).toBe(CONTENT);
  });
  test('applies transforms', async () => {
    const TRANSFORM_CALL = `<!--emdaer-t
  - '@emdaer/transform-a'
  - foo: 1
    bar: 2
-->`;
    const CONTENT = `# <!--emdaer-p
  - '@emdaer/plugin-a'
  - foo: 1
-->

---

${TRANSFORM_CALL}
`;

    await applyTransforms(CONTENT, [TRANSFORM_CALL]);
    expect(applyTransform).toHaveBeenCalledWith(
      CONTENT,
      ['@emdaer/transform-a', { foo: 1, bar: 2 }],
      `<!--emdaer-t
  - '@emdaer/transform-a'
  - foo: 1
    bar: 2
-->`
    );
  });

  test('throws for invalid comments', async () => {
    const CONTENT = `<!--emdaer-t -->`;

    try {
      await applyTransforms(CONTENT, [CONTENT]);
    } catch (err) {
      expect(err).toBeInstanceOf(EmdaerError);
      expect(err.code).toBe(NO_TRANSFORM);
    }
  });
});
