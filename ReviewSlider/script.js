const reviews = [{
        id: 1,
        name: "Jason Max",
        job: "Product Manager",
        img: "https://randomuser.me/api/portraits/men/10.jpg",
        review: "They are the best persons I have worked with. Don't hesitate to hire them.",

    },
    {
        id: 2,
        name: "Nick Fury",
        job: "IT Manager",
        img: "https://randomuser.me/api/portraits/men/8.jpg",
        review: "They are the best persons I have worked with. Don't hesitate to hire them.",

    },
    {
        id: 3,
        name: "Kante Kane",
        job: "Graphics Designer",
        img: "https://randomuser.me/api/portraits/men/7.jpg",
        review: "They are the best persons I have worked with. Don't hesitate to hire them.",

    },
    {
        id: 4,
        name: "Julia August",
        job: "UX Designer",
        img: "https://randomuser.me/api/portraits/women/6.jpg",
        review: "They are the best persons I have worked with. Don't hesitate to hire them.",

    },
];

var count = 0;
const personImage = document.querySelector(".person-img");
const personName = document.querySelector(".person-name");
const personJob = document.querySelector(".person-job");
const personReview = document.querySelector(".person-review");
const leftBtn = document.querySelector(".left-arrow");
const rightBtn = document.querySelector(".right-arrow");

window.addEventListener('DOMContentLoaded', function () {
    showPerson();
})

leftBtn.addEventListener('click', function () {
    if (count > 0) {
        count--;
        showPerson();
    } else {
        count = reviews.length - 1;
        showPerson();
    }
})
rightBtn.addEventListener('click', function () {
    if (count > reviews.length - 1) {
        count = 0;
        showPerson();
    } else {
        count++;
        showPerson();
    }

})

function showPerson() {
    var person = reviews[count];
    personImage.src = person.img;
    personJob.textContent = person.job;
    personName.textContent = person.name;
    personReview = person.review;
}