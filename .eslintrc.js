module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'prettier'
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-trailing-spaces': [
      'error',
      {
        'skipBlankLines': false
      }
    ],
    'max-len': [
      'error',
      {
        'code': 120
      }
    ],
    'comma-dangle': [
      'error',
      'never'
    ],
    'no-unused-vars': [
      'warn',
      'always'
    ]
  },
  ignorePatterns: [
    '/config/**',
    '.eslintrc.js',
    './src/js/opencv.js'
  ]
};
