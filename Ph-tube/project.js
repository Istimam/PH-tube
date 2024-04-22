let categoryId;

const loadButtons = () => {
    const buttonContainer = document.getElementById("buttons-container");
    fetch("https://openapi.programming-hero.com/api/videos/categories")
        .then((res) => res.json())
        // .then((data) => console.log(data.data));
        .then((data) => displayButtons(data.data));
};
const displayButtons = (btns) => {
  const buttonContainer = document.getElementById("buttons-container");
  btns.forEach((btn) => {
    console.log(btn);
    const button = document.createElement("button");
    button.innerText = btn.category;
    button.classList.add("buttons");
        
    if (btn.category_id == "1000") {
      button.classList.add("clicked");
      categoryId = btn.category_id;
    }

    button.addEventListener("click", function () {
      document.querySelectorAll(".buttons").forEach((bttn) => {
        // console.log(btn.category_id);
        bttn.classList.remove("clicked");
      });
      loadVideos(btn.category_id);
      button.classList.add("clicked");
  
      // console.log(btn.category_id);
      categoryId = btn.category_id;
    });

    buttonContainer.appendChild(button);
  });
};
loadButtons();

const loadVideos = (id) => {
    console.log(id);
    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
        .then((res) => res.json())
        // .then((data) => console.log(data.status));
        // .then((data) => console.log(data.data));
        .then((data) => displayvideos(data.data));
};
const displayvideos = (videos) => {
    const vidContainer = document.getElementById("vid-container");
    vidContainer.innerHTML = "";
    if (videos.length === 0) {
        const noDataDiv = document.createElement("div");
        noDataDiv.innerHTML = `
        <div class="col text-center noDivBorder">
        <img class="noDivImg" src="./PHero-Tube-main/Icon.png" class="card-img-top" style="width:100px; height:100px" alt="No Data">
        <h3>Oops!! No contents</h3>
        </div>
        `;
        vidContainer.appendChild(noDataDiv);
    } else {
        videos.forEach((video) => {
            const vidDiv = document.createElement("div");
            vidDiv.classList.add("vid-list");
            vidDiv.innerHTML = `
            <div class="position-relative">
                <a href=""><img class="thumbnail-img" src="${video.thumbnail
            }" class="img-fluid img-thumbnail" style="height:200px"></a>
            <div style="background-color: transparent; margin: 15px" class="position-absolute bottom-0 end-0 text-white">${formatPostedDate(
              video?.others?.posted_date
            )}</div>
            </div>
                <div class="flex-div">
                    <div class="channel-img">
                        <img src="${video?.authors[0]?.profile_picture}" style="width: 30px; height: 30px;" class="rounded-circle alt="channel-img">
                    </div>
                    <div class="vid-info">
                        <a href="">${video.title}</a>
                        <div class="channel">
                            <div class="channel-name">
                                <p>${video?.authors[0]?.profile_name}</p>
                            </div>
                            <div class="verified-tik">
                                ${video?.authors[0]?.verified? '<img src="./PHero-Tube-main/verified-tik.jpg" alt="verifiedImg">': ""}
                            </div>
                        </div>
                        <p class="views">${video?.others?.views} Views</p>
                    </div>
                </div>
            `;
            vidContainer.appendChild(vidDiv);
        });
    }
};
function convertSecondsToHoursMinutes(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return { hours, minutes };
}

function formatPostedDate(seconds) {
  const { hours, minutes } = convertSecondsToHoursMinutes(seconds);
  // console.log(hours, minutes);
  if (hours > 0) {
    return `${hours}hrs ${minutes}min ago`;
  } else {
    // return `${minutes}min ago`;
    return "";
  }
}

function sortByViews() {
  // console.log(categoryId);
  // fetch("https://openapi.programming-hero.com/api/videos/category/1000")
  fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  )
    .then((res) => res.json())
    .then((data) => {
      const sortedNews = data.data.sort((a, b) => {
        const viewsA = parseViews(a.others.views);
        const viewsB = parseViews(b.others.views);
        return viewsB - viewsA;
      });

      displayvideos(sortedNews);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function parseViews(views) {
  const numericViews = parseFloat(views.replace("K", "e3").replace("M", "e6"));
  return isNaN(numericViews) ? 0 : numericViews;
}

loadVideos("1000");

// Blog js 
const accordionItemHader = document.querySelectorAll(".accordion-item-header");

accordionItemHader.forEach((accordionItemHader) => {
  accordionItemHader.addEventListener("click", event => {
    accordionItemHader.classList.toggle("active");
  });
});