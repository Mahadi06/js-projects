const movieName = document.querySelector('#movie-input');
const movieDate = document.querySelector('#movie-date');
const fullMovieList = document.querySelector('.whole-list');
const addBtn = document.querySelector('#add-btn');
const movieForm = document.querySelector('#movie-form');
const clearBtn = document.querySelector('#clear-btn');
const alert = document.querySelector('#alert');

var isEdit = false;
var editId = '';
var editMovName;
var editMovDate;

window.addEventListener("DOMContentLoaded", loadMovieItem);
movieForm.addEventListener('submit', addMovie);
clearBtn.addEventListener('click', function () {
    localStorage.clear();
    fullMovieList.innerHTML = "";
    clearBtn.classList.add('d-none');
})

function addMovie(e) {
    e.preventDefault();
    if (movieName.value != "" && movieDate.value != "") {
        if (!isEdit) {
            let movieId = new Date().getTime().toString();

            createMovieList(movieId.value, movieName.value, movieDate.value);

            alert.textContent = "Movie successfully added";
            alert.classList.add('alert-success');
            setTimeout(function () {
                alert.textContent = "";
                alert.classList.remove('alert-success');
            }, 2000)
            clearBtn.classList.remove('d-none');
            addToLocalStorage(movieId, movieName.value, movieDate.value);
            reset();



        } else {

            editMovName.innerHTML = movieName.value;
            editMovDate.innerHTML = movieDate.value;
            editLocalStorage(editId, movieName.value, movieDate.value);
            reset();

        }
    } else {
        alert.textContent = "Please fill all the fields";
        alert.classList.add('alert-danger');
        setTimeout(function () {
            alert.textContent = "";
            alert.classList.remove('alert-danger');
        }, 2000)

    }


}



//edit item
function editItem(e) {

    const element = e.currentTarget.parentElement.parentElement;
    editMovName = element.querySelector('.name');
    editMovDate = element.querySelector('.date');

    movieName.value = editMovName.innerHTML;
    movieDate.value = editMovDate.innerHTML;

    isEdit = true;
    editId = element.dataset.id;
    addBtn.textContent = "Save";
    console.log(editId);


}

function deleteItem(e) {
    const movie = e.currentTarget.parentElement.parentElement;
    const movieId = movie.dataset.id;
    fullMovieList.removeChild(movie);
    removeItem(movieId);
    if (fullMovieList.children.length == 0) {

        clearBtn.classList.add('d-none');
    }

}

// reset function
function reset() {
    isEdit = false;
    addBtn.textContent = "Add";
    movieDate.value = "";
    movieName.value = "";
}

// add list to local storage
function addToLocalStorage(id, name, date) {
    const movie = {
        id,
        name,
        date
    };
    var movieList = getMovieList();

    movieList.push(movie);
    localStorage.setItem('movieList', JSON.stringify(movieList));

    console.log(movieList);
}

function removeItem(id) {
    let movieList = getMovieList();
    movieList = movieList.filter(function (movie) {
        if (movie.id != id) {
            return movie;
        }
    });
    localStorage.setItem('movieList', JSON.stringify(movieList));
}

function getMovieList() {
    if (localStorage.getItem('movieList')) {
        return JSON.parse(localStorage.getItem('movieList'));
    } else {
        return [];
    }
}

function editLocalStorage(id, name, date) {
    let movieList = getMovieList();
    movieList = movieList.map(function (movie) {
        if (movie.id == id) {
            movie.name = name;
            movie.date = date;
        }
        return movie;
    })
    localStorage.setItem('movieList', JSON.stringify(movieList));
}

function createMovieList(movieId, movieName, movieDate) {

    const element = document.createElement("div");
    let attr = document.createAttribute("data-id");
    attr.value = movieId;
    element.setAttributeNode(attr);
    element.classList.add("movie-list");

    element.innerHTML =
        `<div class="movie-values">
        <p class="name ">${movieName}</p>
        <p class="date">${movieDate}</p>
    </div>

    <div class="actions">
        <button  class="edit-btn"><i class="fas fa-edit text-warning"></i></button>
        <button class="delete-btn"><i class="fas fa-trash-alt text-danger"></i></button>
    </div`;


    const editBtn = element.querySelector('.edit-btn');
    const deleteBtn = element.querySelector('.delete-btn');

    editBtn.addEventListener('click', editItem);
    deleteBtn.addEventListener('click', deleteItem);
    fullMovieList.appendChild(element);

    console.log(movieName);

}

function loadMovieItem() {
    let movieList = getMovieList();
    if (movieList.length > 0) {
        movieList.forEach(function (movie) {
            createMovieList(movie.id, movie.name, movie.date);
        });

        clearBtn.classList.remove('d-none');
    }
}