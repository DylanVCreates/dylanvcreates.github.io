const project = document.getElementById("project");
const toggle = document.getElementById("dropdown-toggle");
const dropdownMenu = document.getElementById("dropdown-menu");
function closeMenu() {
  dropdownMenu.classList.add("dropdown-menu");
  dropdownMenu.classList.remove("dropdown-menu-open");
}

async function showProject(e) {
  console.log(e);
  // We check that it's from a img...
  if (e.target.matches(".work-item")) {
    let id = parseInt(e.target.id);
    console.log(id);
    let data = await fetchData();
    let work = data[id];
    console.log(work);
    project.classList.remove("hide-project");
    project.classList.add("show-project");
    work.extra_imgs.forEach((img) => {
      document.getElementById("slider").innerHTML += `<div class="slide ">
            <img
              src="${img}"
              alt=""
              class="bg-[#2a3b77]"
            />
          </div>`;
    });

    document.getElementById("project-title").innerHTML = work.title;
    work.content.forEach((section, index) => {
      index % 2 === 0
        ? (document.getElementById("project-content").innerHTML += `
            <div class="grid lg:grid-cols-3 text-white">
                <div class="${
                  section.img === "" ? "lg:col-span-3" : "lg:col-span-2"
                } flex flex-col gap-4">
                    <h1 class="text-3xl font-bold">${section.title}</h1>
                    <p class="text-xl">${section.description}</p>
                </div>
                <div class=" flex justify-center items-center">
                    <img src="${section.img}" class="bg-[#2a3b77]" />
                </div>
            </div>
        `)
        : (document.getElementById("project-content").innerHTML += `
            <div class="grid grid-col lg:grid-cols-3 text-white">
                <div class="order-2 lg:order-1 flex justify-center items-center">
                    <img src="${section.img}" class="bg-[#2a3b77]"/>
                </div>
                <div class="order-1 lg:order-2 ${
                  section.img === "" ? "lg:col-span-3" : "lg:col-span-2"
                } flex flex-col gap-4">
                    <h1 class="text-3xl font-bold">${section.title}</h1>
                    <p class="text-xl">${section.description}</p>
                </div>
            </div>
        `);
    });
  }

  // Select all slides
  const slides = document.querySelectorAll(".slide");

  // loop through slides and set each slides translateX property to index * 100%
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
  });
  // select next slide button
  const nextSlide = document.querySelector(".btn-next");

  // current slide counter
  let curSlide = 0;
  // maximum number of slides
  let maxSlide = slides.length - 1;

  // add event listener and navigation functionality
  nextSlide.addEventListener("click", function () {
    // check if current slide is the last and reset current slide
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    //   move slide by -100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });

  // select prev slide button
  const prevSlide = document.querySelector(".btn-prev");

  // add event listener and navigation functionality
  prevSlide.addEventListener("click", function () {
    // check if current slide is the first and reset current slide to last
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }

    //   move slide by 100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });
}

function hideProject() {
  project.classList.add("hide-project");
  project.classList.remove("show-project");
  setTimeout(() => {
    document.getElementById(
      "slider"
    ).innerHTML = `<button class="btn btn-next">></button>
            <button class="btn btn-prev"><</button>`;
    document.getElementById("project-content").innerHTML = "";
  }, 700);
}

async function fetchData() {
  let data = await fetch("../../data.json").then((res) => res.json());
  return data.work;
}

window.addEventListener("load", async () => {
  let data = await fetch("../../data.json").then((res) => res.json());
  let works = data.work;
  const workGrid = document.getElementById("work-grid");

  dropdownMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("dropdown-menu");
    dropdownMenu.classList.toggle("dropdown-menu-open");
  });

  document
    .getElementById("closeProjectBtn")
    .addEventListener("click", hideProject);

  works.forEach((work, index) => {
    workGrid.innerHTML += `<div class="h-min w-full bg-[#2a3b77] relative group overflow-hidden ">
          <img
            id="${index}"
            onclick="showProject(event);"
            class="object-cover work-item"
            src="${work.cover_img}"
            alt="subway"
          />
            <h1 class="absolute left-2 -bottom-20 group-hover:bottom-2 transition-all duration-300 text-white group-hover:p-3 group-hover:bg-black">${work.title}</h1>
        </div>`;
  });
});
