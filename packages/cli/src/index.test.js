jest.mock('@emdaer/core', () => () => {});

jest.mock('util', () => ({
  promisify: fn => fn,
}));
jest.mock('glob');
jest.mock('fs-extra');

jest.mock('./util/logger');

const glob = require('glob');
const fs = require('fs-extra');
const logger = require('./util/logger');

const { NO_MATCHING_FILES, EMDAER_FAILED } = require('./errors');

const bin = require('./');

describe('@emdaer/cli', () => {
  test('logs warning when there are no matching files', async () => {
    const exitCode = await bin();
    expect(logger.warn).toHaveBeenLastCalledWith(NO_MATCHING_FILES);
    expect(exitCode).toBe(0);
  });
  test('logs error when emdaer fails', async () => {
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    fs.readFile.mockImplementationOnce(() => '{"name":"@emdaer/cli"}');
    fs.readFile.mockImplementationOnce(() => {
      throw new Error();
    });
    const exitCode = await bin();
    expect(logger.error).toHaveBeenLastCalledWith(
      EMDAER_FAILED,
      expect.anything()
    );
    expect(exitCode).toBe(1);
  });
  test('logs happy message on success', async () => {
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    fs.readFile.mockImplementationOnce(() => '{"name":"@emdaer/cli"}');
    fs.readFile.mockImplementationOnce(() => '');
    fs.outputFile.mockImplementation(() => {});
    const exitCode = await bin();
    expect(logger.log).toHaveBeenLastCalledWith(
      'Writing README.md for @emdaer/cli 👌'
    );
    expect(exitCode).toBe(0);
  });
  test('stamps the file', async () => {
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    fs.readFile.mockImplementationOnce(() => '{"name":"@emdaer/cli"}');
    fs.readFile.mockImplementationOnce(() => '');
    fs.outputFile.mockImplementation(() => {});
    const exitCode = await bin();
    expect(fs.outputFile).toHaveBeenLastCalledWith(
      'README.md',
      `<!--
  This file was generated by emdaer

  Its template can be found at ./.emdaer/README.emdaer.md
-->

undefined`
    );
    expect(exitCode).toBe(0);
  });
});
