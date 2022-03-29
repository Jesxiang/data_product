module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    "airbnb-base/legacy",
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    // 放弃了prettier见 https://github.com/prettier/prettier/issues/5501
    // "@vue/prettier",
    // "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    Kt: "readonly",
    KtForm: "readonly",
    KtTable: "readonly",
    KtApi: "readonly"
  },
  rules: {
    'no-console': 'off',
    
    'no-debugger': 'off',
    
    'no-use-before-define': 'off',
    
    // require trailing commas in multiline object literals
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],

    // disallow redundant `return await`
    // https://eslint.org/docs/rules/no-return-await#disallows-unnecessary-return-await-no-return-await
    'no-return-await': 'off',

    // Disallow Reassignment of Function Parameters
    // https://eslint.org/docs/rules/no-param-reassign#disallow-reassignment-of-function-parameters-no-param-reassign
    'no-param-reassign': 'off',

    // require return statements to either always or never specify values
    // https://eslint.org/docs/rules/consistent-return#require-return-statements-to-either-always-or-never-specify-values-consistent-return
    'consistent-return': 'off',

    // disallow bitwise operators
    // https://eslint.org/docs/rules/no-bitwise#disallow-bitwise-operators-no-bitwise
    'no-bitwise': 'off',

    // Disallow Unused Expressions
    // https://eslint.org/docs/rules/no-unused-expressions#disallow-unused-expressions-no-unused-expressions
    'no-unused-expressions': 'off',

    // require or disallow padding within blocks
    // https://eslint.org/docs/rules/padded-blocks#require-or-disallow-padding-within-blocks-padded-blocks
    'padded-blocks': 'off',
    
    'no-plusplus': 'off',
    
    'no-shadow': 'off',
    
  
    // specify the maximum length of a line in your program
    // https://eslint.org/docs/rules/max-len
    'max-len': ['error', 140, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],

    // Enforce line breaks after opening and before closing block-level tags
    'vue/block-tag-newline': 'error',

    // Enforce the maximum number of attributes per line
    'vue/max-attributes-per-line': ['error', {
      'singleline': {
        'max': 2,
        'allowFirstLine': true,
      },
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      },
    }],

    // 替换eslint max-len
    'vue/max-len': ['error', {
      code: 160,
      template: 160,
      tabWidth: 4,
    }],
    // vue template script indent
    'vue/html-indent': ['error', 2],
    'vue/script-indent': ['error', 2, {
      baseIndent: 1,
    }],
    // Require template literals instead of string concatenation
    'vue/prefer-template': 'warn',
    // require spaces around operators
    'space-infix-ops': 'error',
    'vue/space-infix-ops': 'error',
    // Require or disallow spaces before/after unary operators
    'space-unary-ops': ['error', {
      words: true,
      nonwords: false,
      overrides: {
      },
    }],
    'vue/space-unary-ops': ['error', {
      words: true,
      nonwords: false,
      overrides: {
      },
    }],
    // require or disallow spaces inside parentheses
    'space-in-parens': ['error', 'never'],
    'vue/space-in-parens': ['error', 'never'],
    // require padding inside curly braces
    'object-curly-spacing': ['error', 'always'],
    'vue/object-curly-spacing': ['error', 'always'],
    // enforce line breaks between braces
    // https://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
    }],
    'vue/object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 4, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 4, multiline: true, consistent: true },
    }],
    // enforce "same line" or "multiple line" on object properties.
    // https://eslint.org/docs/rules/object-property-newline
    'object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: true,
    }],
    'vue/object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: true,
    }],
  
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'indent': 'off',
        'max-len': 'off'
      }
    },
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
