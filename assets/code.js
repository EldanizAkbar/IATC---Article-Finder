const search_term = document.querySelector("#search-term");
const start_year = document.querySelector("#start-year");
const end_year = document.querySelector("#end-year");
const run_search = document.querySelector("#run-search");
const well_section = document.querySelector("#well-section");
const clear_all = document.querySelector("#clear-all");

clear_all.addEventListener("click", function () {
  for (var i = 0; i <= well_section.children.length; i++) {
    well_section.children[i].remove();
  }
});

run_search.addEventListener("click", function (e) {
  e.preventDefault();

  var url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${
    search_term.value
  }&begin_date=${
    start_year.value ? start_year.value + "0101" : "1900-01-01"
  }&end_date=${
    end_year.value ? start_year.value + "1231" : "2023-01-01"
  }&api-key=QbG1ZUfxEqGGjcb8Z3VFlWqT9y4WMHAa`;

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      var h3 = document.createElement("h3");
      var h3_inner = JSON.stringify(
        response.response.docs[0].headline.print_headline
      ).replaceAll('"', "");
      h3.innerHTML = h3_inner;

      var p = document.createElement("p");
      var p_inner = JSON.stringify(
        response.response.docs[0].lead_paragraph
      ).replaceAll('"', "");
      p.innerHTML = p_inner;

      var span = document.createElement("span");
      span.innerHTML = "Publish date : ";

      var pdate = document.createElement("strong");
      var pdate_inner = JSON.stringify(
        response.response.docs[0].pub_date
      ).replaceAll('"', "");
      pdate.innerHTML = pdate_inner.slice(0, 10);

      var a = document.createElement("a");
      a.innerHTML = "For reading this article in New York Times website -->";
      var a_inner = JSON.stringify(
        response.response.docs[0].web_url
      ).replaceAll('"', "");
      a.classList = "d-block";
      a.href = a_inner;
      a.target = "_blank";

      var div = document.createElement("div");
      div.classList = "article";
      div.append(h3, p, span, pdate, a);
      well_section.append(div);
    });
});
