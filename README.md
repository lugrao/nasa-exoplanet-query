# NASA Exoplanet Query

This is a web app for querying the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/). It aims to meet the requirements of [this project idea](https://github.com/florinpop17/app-ideas/blob/master/Projects/3-Advanced/NASA-Exoplanet-Query.md).

## User Stories

- [x] User can see a query input panel containing dropdowns allowing the user to query on year of discovery, discovery method, host name, and discovery facility.
- [x] User can also see 'Clear' and 'Search' buttons in the query input panel.
- [x] User can select a single value from any one or all of the query dropdowns.
- [x] User can click the 'Search' button to search for exoplanets matching all of the selected query values.
- [x] User can see an error message if the 'Search' button was clicked, but no query values were selected.
- [x] User can see the matching exoplanet data displayed in tabular format in an results panel below the query panel Only the queriable fields should be displayed.
- [x] User can click the 'Clear' button to reset the query selections and clear any data displayed in the results panel, if a search had been performed.

## Bonus Features

- [x] User can see the host name as a hyperlink to NASA's Confirmed Planet Overview Page for that planet
- [x] User can click on the host name to display the Confirmed Planet Overview Page in a new browser tab.
- [x] User can see icons (such as up and down symbols) in the column headers
- [x] User can click on the up symbol to sort the rows in the results panel in ascending order on the values in that column.
- [x] User can click on the down symbol to sort the rows in the results panel in descending order on the values in the column.

## Additional Bonus Features

- [x] User can select only relevant values from the query dropdowns. The values are filtered based on previously selected values to match the results.
- [x] User can instantly scroll through a subset of the query options and the results, without needing to wait for the totality of these elements to be rendered to the DOM (thanks to list virtualization).
