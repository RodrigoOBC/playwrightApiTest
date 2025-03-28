import { defineConfig, devices } from '@playwright/test';
require('dotenv').config()


const reportConfig = {
  open: process.env.CI ? "never" : "always",
  folderPath: "temp/ortoni-report",
  filename: "index.html",
  title: "Playwright Test Report",
  showProject: !true,
  projectName: "Playwright Test API",
  testType: "e2e",
  authorName: "RodrigoBOCabral",
  base64Image: false,
  stdIO: false,
  preferredTheme: "dark"
};

export default defineConfig({
  // Nome do projeto (opcional)
  name: 'API Tests',

  // Timeout padrão para os testes
  timeout: 30000, // 30 segundos

  // Expect timeout (tempo máximo para uma asserção)
  expect: {
    timeout: 5000, // 5 segundos
  },

  // Configurações globais para todos os testes
  use: {
    // URL base para as requisições da API
    baseURL: process.env.BASEURL, // Substitua pela URL da sua API

    // Headers globais (opcional)
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },

  // Configurações de relatórios
  reporter: [['line'],["ortoni-report", reportConfig]],

  // Hooks globais (opcional)
  // globalSetup: './global-setup.js', // Executa antes de todos os testes
  // globalTeardown: './global-teardown.js', // Executa após todos os testes

  // Configurações de projetos (opcional)
  projects: [
    {
      name: 'API Test Suite',
    },
  ],
});
