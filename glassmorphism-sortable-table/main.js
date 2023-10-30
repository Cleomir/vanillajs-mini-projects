const search = document.querySelector(".input-group input");
const tableRows = document.querySelectorAll("tbody tr");
const tableHeadings = document.querySelectorAll("thead th");

search.addEventListener("input", () => {
  tableRows.forEach((row) => {
    const tableData = row.textContent.toLowerCase();
    const searchedData = search.value.toLowerCase();

    if (!tableData.includes(searchedData)) {
      row.classList.add("hide");
    } else {
      row.classList.remove("hide");
    }
  });

  // add striped rows for found items
  document.querySelectorAll("tbody tr:not(.hide)").forEach((visibleRow, i) => {
    visibleRow.style.backgroundColor =
      i % 2 === 0 ? "transparent" : "#0000000b";
  });
});

tableHeadings.forEach((heading, i) => {
  let sortAsc = true;
  heading.onclick = () => {
    // remove existing classes and add for the clicked column
    tableHeadings.forEach((heading) => heading.classList.remove("active"));
    heading.classList.add("active");

    document
      .querySelectorAll("td")
      .forEach((td) => td.classList.remove("active"));
    tableRows.forEach((row) => {
      row.querySelectorAll("td")[i].classList.add("active");
    });
    heading.classList.toggle("asc", sortAsc);
    sortAsc = heading.classList.contains("asc") ? false : true;

    // sort and update table
    [...tableRows]
      .sort((a, b) => {
        const aValue = a.querySelectorAll("td")[i].textContent.toLowerCase();
        const bValue = b.querySelectorAll("td")[i].textContent.toLowerCase();

        return sortAsc ? (aValue < bValue ? 1 : -1) : aValue < bValue ? -1 : 1;
      })
      .forEach((sortedRow) => {
        document.querySelector("tbody").appendChild(sortedRow);
      });
  };
});
