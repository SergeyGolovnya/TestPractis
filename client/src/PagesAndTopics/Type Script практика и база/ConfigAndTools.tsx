import React from 'react';

// 1. TypeScript Configuration (tsconfig.json)
interface TypeScriptConfig {
  compilerOptions: {
    // Target и Module
    target: 'ES3' | 'ES5' | 'ES6' | 'ES2015' | 'ES2016' | 'ES2017' | 'ES2018' | 'ES2019' | 'ES2020' | 'ESNext';
    module: 'None' | 'CommonJS' | 'AMD' | 'UMD' | 'System' | 'ES6' | 'ES2015' | 'ES2020' | 'ESNext' | 'ES2022';
    lib: string[];
    moduleResolution: 'node' | 'classic';
    
    // Строгость
    strict: boolean;
    noImplicitAny: boolean;
    strictNullChecks: boolean;
    strictFunctionTypes: boolean;
    strictBindCallApply: boolean;
    strictPropertyInitialization: boolean;
    noImplicitThis: boolean;
    alwaysStrict: boolean;
    
    // Проверки
    noUnusedLocals: boolean;
    noUnusedParameters: boolean;
    noImplicitReturns: boolean;
    noFallthroughCasesInSwitch: boolean;
    noUncheckedIndexedAccess: boolean;
    
    // Эмиссия
    outDir: string;
    rootDir: string;
    declaration: boolean;
    declarationMap: boolean;
    sourceMap: boolean;
    removeComments: boolean;
    noEmit: boolean;
    
    // Дженерики
    noImplicitOverride: boolean;
    allowUnusedLabels: boolean;
    allowUnreachableCode: boolean;
    
    // Экспериментальные
    experimentalDecorators: boolean;
    emitDecoratorMetadata: boolean;
    
    // Дополнительные
    skipLibCheck: boolean;
    forceConsistentCasingInFileNames: boolean;
    resolveJsonModule: boolean;
    allowSyntheticDefaultImports: boolean;
    esModuleInterop: boolean;
    allowJs: boolean;
    checkJs: boolean;
  };
  include: string[];
  exclude: string[];
  references: Array<{ path: string }>;
}

// 2. ESLint Configuration
interface ESLintConfig {
  env: {
    browser?: boolean;
    es2021?: boolean;
    node?: boolean;
  };
  extends: string[];
  parser: string;
  parserOptions: {
    ecmaVersion: 'latest' | number;
    sourceType: 'module' | 'script';
    ecmaFeatures: {
      jsx?: boolean;
    };
  };
  plugins: string[];
  rules: Record<string, 'off' | 'warn' | 'error' | [string, ...unknown[]]>;
  settings: Record<string, unknown>;
  overrides: Array<{
    files: string[];
    rules: Record<string, 'off' | 'warn' | 'error' | [string, ...unknown[]]>;
  }>;
}

// 3. Prettier Configuration
interface PrettierConfig {
  printWidth: number;
  tabWidth: number;
  useTabs: boolean;
  semi: boolean;
  singleQuote: boolean;
  quoteProps: 'as-needed' | 'consistent' | 'preserve';
  jsxSingleQuote: boolean;
  trailingComma: 'none' | 'es5' | 'all';
  bracketSpacing: boolean;
  bracketSameLine: boolean;
  arrowParens: 'avoid' | 'always';
  rangeStart: number;
  rangeEnd: number;
  requirePragma: boolean;
  insertPragma: boolean;
  proseWrap: 'always' | 'never' | 'preserve';
  htmlWhitespaceSensitivity: 'css' | 'strict' | 'ignore';
  endOfLine: 'auto' | 'lf' | 'crlf' | 'cr';
  embeddedLanguageFormatting: 'auto' | 'off';
}

// 4. Примеры конфигураций
const baseTypeScriptConfig: TypeScriptConfig = {
  compilerOptions: {
    // Target и Module
    target: 'ES2020',
    module: 'ESNext',
    lib: ['DOM', 'DOM.Iterable', 'ES6'],
    moduleResolution: 'node',
    
    // Строгость
    strict: true,
    noImplicitAny: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictBindCallApply: true,
    strictPropertyInitialization: true,
    noImplicitThis: true,
    alwaysStrict: true,
    
    // Проверки
    noUnusedLocals: true,
    noUnusedParameters: true,
    noImplicitReturns: true,
    noFallthroughCasesInSwitch: true,
    noUncheckedIndexedAccess: true,
    
    // Эмиссия
    outDir: './dist',
    rootDir: './src',
    declaration: true,
    declarationMap: true,
    sourceMap: true,
    removeComments: false,
    noEmit: false,
    
    // Дженерики
    noImplicitOverride: true,
    allowUnusedLabels: false,
    allowUnreachableCode: false,
    
    // Экспериментальные
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    
    // Дополнительные
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true,
    resolveJsonModule: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    allowJs: true,
    checkJs: false
  },
  include: ['src/**/*'],
  exclude: ['node_modules', 'dist'],
  references: []
};

const reactTypeScriptConfig: TypeScriptConfig = {
  compilerOptions: {
    ...baseTypeScriptConfig.compilerOptions,
    target: 'ES2020',
    lib: ['DOM', 'DOM.Iterable', 'ES6'],
    jsx: 'react-jsx',
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    moduleResolution: 'node',
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true
  },
  include: ['src/**/*'],
  exclude: ['node_modules', 'dist', 'build'],
  references: []
};

const baseESLintConfig: ESLintConfig = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'warn'
  },
  settings: {},
  overrides: [
    {
      files: ['*.test.ts', '*.test.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off'
      }
    }
  ]
};

const reactESLintConfig: ESLintConfig = {
  ...baseESLintConfig,
  extends: [
    ...baseESLintConfig.extends,
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: [
    ...baseESLintConfig.plugins,
    'react',
    'react-hooks'
  ],
  rules: {
    ...baseESLintConfig.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};

const basePrettierConfig: PrettierConfig = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto'
};

// 5. Утилиты для работы с конфигурациями
class ConfigManager {
  private static instance: ConfigManager;
  private configs: Map<string, unknown> = new Map();

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  setConfig(name: string, config: unknown): void {
    this.configs.set(name, config);
  }

  getConfig<T>(name: string): T | undefined {
    return this.configs.get(name) as T;
  }

  mergeConfigs<T extends Record<string, unknown>>(base: T, override: Partial<T>): T {
    return { ...base, ...override };
  }

  validateConfig<T>(config: unknown, schema: Record<string, string>): config is T {
    // Простая валидация схемы
    if (typeof config !== 'object' || config === null) {
      return false;
    }

    for (const [key, type] of Object.entries(schema)) {
      if (!(key in config)) {
        return false;
      }
      if (typeof (config as Record<string, unknown>)[key] !== type) {
        return false;
      }
    }

    return true;
  }
}

// 6. TypeScript Compiler API (симуляция)
interface CompilerOptions {
  target: string;
  module: string;
  strict: boolean;
  [key: string]: unknown;
}

interface CompilerHost {
  getSourceFile(fileName: string): unknown;
  writeFile(fileName: string, data: string): void;
  getCurrentDirectory(): string;
  getDirectories(path: string): string[];
  fileExists(fileName: string): boolean;
  readFile(fileName: string): string | undefined;
}

class TypeScriptCompiler {
  private options: CompilerOptions;
  private host: CompilerHost;

  constructor(options: CompilerOptions, host: CompilerHost) {
    this.options = options;
    this.host = host;
  }

  compile(files: string[]): CompilationResult {
    // Симуляция компиляции
    const diagnostics: Diagnostic[] = [];
    const emittedFiles: string[] = [];

    for (const file of files) {
      if (!this.host.fileExists(file)) {
        diagnostics.push({
          file,
          message: `File not found: ${file}`,
          category: 'error',
          code: 2307
        });
        continue;
      }

      const source = this.host.readFile(file);
      if (source) {
        // Простая проверка на TypeScript синтаксис
        if (source.includes('any') && this.options.strict) {
          diagnostics.push({
            file,
            message: 'Implicit any type not allowed in strict mode',
            category: 'error',
            code: 7006
          });
        }

        // Симуляция эмиссии файла
        const outputFile = file.replace('.ts', '.js').replace('.tsx', '.js');
        this.host.writeFile(outputFile, source);
        emittedFiles.push(outputFile);
      }
    }

    return {
      diagnostics,
      emittedFiles,
      success: diagnostics.length === 0
    };
  }
}

interface Diagnostic {
  file: string;
  message: string;
  category: 'error' | 'warning' | 'suggestion';
  code: number;
}

interface CompilationResult {
  diagnostics: Diagnostic[];
  emittedFiles: string[];
  success: boolean;
}

// 7. ESLint интеграция (симуляция)
class ESLintRunner {
  private config: ESLintConfig;

  constructor(config: ESLintConfig) {
    this.config = config;
  }

  lint(files: string[]): ESLintResult[] {
    const results: ESLintResult[] = [];

    for (const file of files) {
      const fileResults: ESLintMessage[] = [];
      
      // Симуляция проверки правил
      if (this.config.rules['no-console'] === 'error') {
        fileResults.push({
          ruleId: 'no-console',
          severity: 2,
          message: 'Unexpected console statement.',
          line: 1,
          column: 1
        });
      }

      if (this.config.rules['@typescript-eslint/no-unused-vars'] === 'error') {
        fileResults.push({
          ruleId: '@typescript-eslint/no-unused-vars',
          severity: 2,
          message: 'Unused variable.',
          line: 2,
          column: 5
        });
      }

      results.push({
        filePath: file,
        messages: fileResults,
        errorCount: fileResults.filter(m => m.severity === 2).length,
        warningCount: fileResults.filter(m => m.severity === 1).length
      });
    }

    return results;
  }
}

interface ESLintMessage {
  ruleId: string;
  severity: 0 | 1 | 2;
  message: string;
  line: number;
  column: number;
}

interface ESLintResult {
  filePath: string;
  messages: ESLintMessage[];
  errorCount: number;
  warningCount: number;
}

// 8. Prettier интеграция (симуляция)
class PrettierFormatter {
  private config: PrettierConfig;

  constructor(config: PrettierConfig) {
    this.config = config;
  }

  format(code: string): string {
    // Симуляция форматирования
    let formatted = code;

    // Применение правил
    if (this.config.singleQuote) {
      formatted = formatted.replace(/"/g, "'");
    }

    if (this.config.semi) {
      formatted = formatted.replace(/([^;])\n/g, '$1;\n');
    }

    if (this.config.trailingComma === 'es5') {
      formatted = formatted.replace(/,(\s*[}\]])/g, '$1');
    }

    return formatted;
  }

  check(code: string): boolean {
    const formatted = this.format(code);
    return code === formatted;
  }
}

// 9. Демонстрационные функции
const demonstrateConfigAndTools = () => {
  console.log('=== ДЕМОНСТРАЦИЯ КОНФИГУРАЦИИ И ИНСТРУМЕНТОВ ===');

  // Конфигурации
  console.log('Base TypeScript config:', baseTypeScriptConfig.compilerOptions.target);
  console.log('React TypeScript config:', reactTypeScriptConfig.compilerOptions.jsx);
  console.log('Base ESLint config rules:', Object.keys(baseESLintConfig.rules));
  console.log('React ESLint config plugins:', reactESLintConfig.plugins);
  console.log('Base Prettier config:', basePrettierConfig.printWidth);

  // Config Manager
  const configManager = ConfigManager.getInstance();
  configManager.setConfig('typescript', baseTypeScriptConfig);
  configManager.setConfig('eslint', baseESLintConfig);
  configManager.setConfig('prettier', basePrettierConfig);

  const tsConfig = configManager.getConfig<TypeScriptConfig>('typescript');
  console.log('Retrieved TypeScript config:', tsConfig?.compilerOptions.target);

  // TypeScript Compiler
  const compilerHost: CompilerHost = {
    getSourceFile: () => null,
    writeFile: (fileName, data) => console.log(`Writing ${fileName}:`, data.length, 'chars'),
    getCurrentDirectory: () => '/project',
    getDirectories: () => [],
    fileExists: (fileName) => fileName.endsWith('.ts'),
    readFile: (fileName) => `const x: any = 1; console.log(x);`
  };

  const compiler = new TypeScriptCompiler(
    { target: 'ES2020', module: 'ESNext', strict: true },
    compilerHost
  );

  const compilationResult = compiler.compile(['src/index.ts']);
  console.log('Compilation result:', compilationResult);

  // ESLint Runner
  const eslintRunner = new ESLintRunner(baseESLintConfig);
  const eslintResults = eslintRunner.lint(['src/index.ts']);
  console.log('ESLint results:', eslintResults);

  // Prettier Formatter
  const prettierFormatter = new PrettierFormatter(basePrettierConfig);
  const unformattedCode = 'const x=1;console.log(x)';
  const formattedCode = prettierFormatter.format(unformattedCode);
  const isFormatted = prettierFormatter.check(unformattedCode);

  console.log('Unformatted code:', unformattedCode);
  console.log('Formatted code:', formattedCode);
  console.log('Is formatted:', isFormatted);

  console.log('Config and Tools демонстрация завершена');
};

const ConfigAndToolsPractice: React.FC = () => {
  console.log('=== КОНФИГУРАЦИЯ И ИНСТРУМЕНТЫ TYPESCRIPT ===');
  demonstrateConfigAndTools();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Практика конфигурации и инструментов TypeScript</h1>
      
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">1. TypeScript Configuration</h2>
          <p className="mb-2">tsconfig.json с типизацией</p>
          <p className="text-sm text-gray-600">interface TypeScriptConfig {`{ compilerOptions: { target: string; } }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">2. ESLint Configuration</h2>
          <p className="mb-2">ESLint конфигурация с TypeScript</p>
          <p className="text-sm text-gray-600">interface ESLintConfig {`{ rules: Record<string, 'off' | 'warn' | 'error'>; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">3. Prettier Configuration</h2>
          <p className="mb-2">Prettier настройки форматирования</p>
          <p className="text-sm text-gray-600">interface PrettierConfig {`{ printWidth: number; tabWidth: number; }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">4. Config Manager</h2>
          <p className="mb-2">Управление конфигурациями</p>
          <p className="text-sm text-gray-600">class ConfigManager {`{ setConfig(name: string, config: unknown): void }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">5. TypeScript Compiler</h2>
          <p className="mb-2">Симуляция компилятора</p>
          <p className="text-sm text-gray-600">class TypeScriptCompiler {`{ compile(files: string[]): CompilationResult }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">6. ESLint Runner</h2>
          <p className="mb-2">Симуляция линтера</p>
          <p className="text-sm text-gray-600">class ESLintRunner {`{ lint(files: string[]): ESLintResult[] }`}</p>
        </div>
        
        <div className="p-4 border rounded">
          <h2 className="text-xl font-bold mb-4">7. Prettier Formatter</h2>
          <p className="mb-2">Симуляция форматтера</p>
          <p className="text-sm text-gray-600">class PrettierFormatter {`{ format(code: string): string }`}</p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h2 className="text-xl font-bold mb-2">Ключевые моменты:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>TypeScript конфигурация определяет поведение компилятора</li>
          <li>ESLint обеспечивает качество кода</li>
          <li>Prettier обеспечивает единообразное форматирование</li>
          <li>Config Manager для управления настройками</li>
          <li>TypeScript Compiler API для программной компиляции</li>
          <li>Интеграция инструментов для автоматизации</li>
          <li>Типизация конфигураций обеспечивает безопасность</li>
        </ul>
      </div>
    </div>
  );
};

export default ConfigAndToolsPractice; 