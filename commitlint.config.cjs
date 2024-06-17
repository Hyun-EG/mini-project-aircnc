module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
    'subject-full-stop': [0, 'never'],
    'header-max-length': [2, 'always', 72],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'feat',
        'add',
        'fix',
        'chore',
        'ci',
        'docs',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};
