// Format pesan commit: `type(scope): ringkasan` — type Inggris (aturan bahasa
// repo), ringkasan boleh Indonesia. Diperiksa hook `.husky/commit-msg`.
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'refactor', 'chore', 'style', 'test', 'perf', 'ci', 'build', 'revert', 'wip']],
    // Ringkasan Indonesia memakai huruf besar untuk nama (Builder, Dice, …).
    'subject-case': [0],
    'header-max-length': [2, 'always', 200],
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
}
