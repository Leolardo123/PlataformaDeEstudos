import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.AnvilExtensionApi): void {
  plop.setGenerator("utils-pkg", {
    description: "Cria um novo pacote de utilitários gerenciado pelo Turborepo",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "Qual o nome do sub-pacote de utilitários? (ex: string, date, math)",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/utils-{{dashCase name}}/package.json",
        template: `{
        "name": "@repo/utils-{{dashCase name}}",
        "version": "0.0.0",
        "private": true,
        "main": "./src/index.ts",
        "types": "./src/index.ts"
        }`,
      },
      {
        type: "add",
        path: "packages/utils-{{dashCase name}}/src/index.ts",
        template: `export const exemplo = () => "Olá do utilitário {{name}}!";\n`,
      },
    ],
  });
}
