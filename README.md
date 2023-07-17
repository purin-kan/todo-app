# Vue 3 + Vite

## Current Issues

- when refreshed while on the main page, the app will break. This can probably be fixed by implementing pinia persist. Or rather, route to the landing page on refresh.
- Uploaded files are not deleted off of firebase storage when the task is deleted. The "file" field in firebase database only stores the downloadURL of the uploaded file.
- There is a "Remind Date" field, though it is corrent serve no purpose other than displaying the date entered. Currently unable to connect to Line notify.

### note* working branch is temp