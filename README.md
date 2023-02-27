# ExchangeRate

This project is a test task from YADRO company

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## ESlint script

Run `ng lint` to check all files in directory for errors

## GitHub Pages

Navigate to `https://anof1r.github.io/currency-live/` to see the deployed version of this app

## API Warning

- FreequencyAPI has 4,5k requests per month. There are 3,5k left
- Api rarely updates currencies exchange rates, so if you want to see the UI logic, please, use Angular DevTools and change values in `data` fields

## Task additionals

- Date showing the last request time
- You can choose currency that will be added to the list
- You can delete necessary currency by clicking on delete button
- Adaptive layout for mobile devices
- ESLint

## Known Issues

- '+' option in select appears in Safari browser even if display is none
- '+' color is blue in Safari browser
- Sometimes it takes a while for application to add new currency (mb API problem), if this happens and user will try to add selected currency one more time, there will be duplicated currencies in a list
