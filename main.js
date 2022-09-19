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
      nameList.addEventListener("change", (e) => {
        for(const options of data){
          if (options.title === e.target.value) {
            movieTitle.innerText = options.title
            releaseYear.innerText = options.description;

            displayInfo.append(movieTitle, releaseYear)
          }

        }
      })
      const reviewForm = document.querySelector('form')
      let userReview = document.querySelector('#review')
      const reviewsContainer = document.querySelector('ul')
      const review = document.createElement('li')

      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        review.innerText = e.target['review'].value

        // review.innerHTML = `<strong>${nameList.value}:<strong> ${}
        // `

        reviewsContainer.append(review)
        console.log(review)

        

      })
    })
    .catch((err) => console.log(err));
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
