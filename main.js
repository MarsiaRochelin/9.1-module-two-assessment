// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
  // Add code you want to run on page load here
  const BASE_URL = "https://ghibliapi.herokuapp.com/films";

  fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);

      const displayInfo = document.querySelector("#display-info");
      let nameList = document.querySelector("#titles");

      for (const film of data) {
        const option = document.createElement("option");
        option.textContent = film.title;
        nameList.append(option);
      }

      const movieTitle = document.createElement("h3");
      const releaseYear = document.createElement("p");
      const moviesDescription = document.createElement("p");

      nameList.addEventListener("change", (e) => {

        for (const options of data) {
          if (options.title === e.target.value) {
            movieTitle.innerText = options.title;

            releaseYear.innerText = `${options.release_date}
            `;
            moviesDescription.innerText = `${options.description}`;

            displayInfo.append(movieTitle, releaseYear, moviesDescription);
          }
        }
      });

      const reviewForm = document.querySelector("form");
      const reviewsContainer = document.querySelector("ul");
      
      reviewForm.addEventListener("submit", (e) => {
        
        e.preventDefault()
        
        const review = document.createElement("li");
        review.innerText = e.target["review"].value;
        
        if (!nameList.value) {
          window.confirm("Please select a movie first");
        }
       
        if (nameList.value && review.innerText) {
          review.innerHTML = `
          <strong>${nameList.value}:<strong> ${review.innerText}
            `;

          reviewsContainer.append(review);
        }
        reviewForm.reset();
      });

        const reviewReset = document.querySelector('#reset-reviews')
        
        reviewReset.addEventListener('click', () => {
          
          const allReviews = document.querySelectorAll('li')
          
          allReviews.forEach((review) => 
            review.remove())
        })

        
    })
    .catch((err) => console.log(err));
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
