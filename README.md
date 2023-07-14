# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

### Current Issues

- when refreshed while on the main page, the app will break. This can probably be fixed by implementing pinia persist. Or rather, route to the landing page on refresh.
- Uploaded files are not deleted off of firebase storage when the task is deleted. The "file" field in firebase database only stores the downloadURL of the uploaded file.
- There is a "Remind Date" field, though it is corrent serve no purpose other than displaying the date entered. Currently unable to connect to Line notify.

#### note* working branch is temp
