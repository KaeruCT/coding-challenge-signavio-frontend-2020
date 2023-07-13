# Signavio front-end coding challenge

Welcome to the Signavio front-end coding challenge!
The coding challenge consists of a small React.js application which shall be extended by you.

The next sections describe the three tasks and give some general hints.
At the end you can leave any comments about design decisions, instructions or general feedback.

## Task 1

Your task is to extend the component `src/components/Table` to render a table with a dynamically defined column schema.

The schema and the content for the table are provided in a JSON structure.

Example:

```json
{
  "columns": [
    { "id": "myFirstValue", "title": "Column One" },
    { "id": "mySecondValue", "title": "Column Two" }
  ],
  "rows": [
    { "myFirstValue": "Row One", "mySecondValue": 1 },
    { "myFirstValue": "Row Two", "mySecondValue": 2 }
  ]
}
```

The table rendered based on the example structure would look like this:

| Column One | Column Two |
| ---------- | ---------- |
| Row One    | 1          |
| Row Two    | 2          |

The `columns` property is an array which defines the number and order of table columns.
Each column object has two properties:

- `id` - Defines the name of the row objects property to show as the content of the cell
- `title` - Defines the column header title

The `rows` property is an array which contains one JSON object per row.
The property keys match the names referenced by the columns `id` values.
The property values shall be shown in the table cells.

For the coding challenge, the file `src/data.json` should be used and its content should be rendered in the table.
The application (`src/App.js`) already loads the data and provides it to the `Table` component.

The table should look like this:
![screen](/resources/table.png)

The sorting icons are in the `/resources` folder. The font in the screen is the [OpenSans](https://fonts.google.com/specimen/Open+Sans).

## Task 2

As the second task the `Table` component shall be extended to offer sorting capabilities.
It should be possible to sort the table by columns.
Once the user clicks on a column header, the table is sorted by that respective column.

- First click on a column header sorts the table by this column in ascending order
- Any additional click on the same column header toggles the sorting order to descending and back to ascending
- A click on a different column header resets the sorting order to ascending and sorts the table by the newly selected column
- The table indicates which column is currently sorted and the sorting order by showing the corresponding icon in the header

## Task 3

Add a second row in the header with an input field. The input will be used to filter content of the column.
Only rows that match the filter string for this column should be displayed.

## General hints

- The application was bootstrapped using [Create React App](https://github.com/facebook/create-react-app)
- Yarn is used for dependency management
- Run `yarn` to install all dependencies
- Start the development server with `yarn start`
- Run tests with `yarn test`
  - Jest is already available as a test framework
- You can choose and add your favorite testing libraries
- Don't add any _other_ libraries
- Don't change the `./src/data.json` file
- If anything is unclear don't hesitate to contact us

## Design decisions and feedback

I solved this but I think I accepted another offer before finally submitting back to the company.

If you want to run it for whatever reason, you will need this environment variable if you use a current node version: `export NODE_OPTIONS=--openssl-legacy-provider`. I can't be bothered to update the dependencies.