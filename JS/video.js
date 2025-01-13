// load categories 
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch((err) => console.log(err))
}
// load videos 
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch((err) => console.log(err))
}

//load categories video
const loadCategoriesVideos = (id) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add("active")

            displayVideos(data.category)
        })
        .catch((err) => console.log(err))

}


//remove active class
const removeActiveClass = () => {
    const getAllActiveBtn = document.getElementsByClassName('removeId')
    for (btn of getAllActiveBtn) {
        btn.classList.remove('active')
    }
}


//display categories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories')
    categories.forEach((item) => {
        // console.log(item.category)


        const btnContainer = document.createElement('div')
        btnContainer.innerHTML =
            `
            <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class="btn removeId">
            ${item.category}
            </button>
        `


        categoryContainer.appendChild(btnContainer)

    })
}


//Load video Details 
const showDetails = async (videoId) => {
    // console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    showDetailsInModal(data.video)

}


const showDetailsInModal = (data) => {
    // console.log(data)
    const modalContainer = document.getElementById('modal-content');
    modalContainer.innerHTML = `

        <img  src="${data.thumbnail}" />
        <p class="text-justify pt-2">${data.description}</p>
    `
    

    //show modal way-1
    document.getElementById('showModalBtn').click()
}


//     {
//       "category_id": "1001",
//       "video_id": "aaaa",
//       "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//       "title": "Shape of You",
//       "authors": [
//         {
//           "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//           "profile_name": "Olivia Mitchell",
//           "verified": ""
//         }
//       ],
//       "others": {
//         "views": "100K",
//         "posted_date": "16278"
//       },
//       "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
//     }



// getTimeString from second
function getTimeString(second) {
    const hour = parseInt(second / 3600)
    const minute = parseInt((second % 3600) / 60)
    const remainingSecond = ((second % 3600) % 60)

    return `${hour}hrs ${minute}mnt ${remainingSecond}scn`

}




//display videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videoContainer')
    videoContainer.innerHTML = ""

    if (videos.length == 0) {
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML =
            `
                <div class="min-h-[300px] flex flex-col justify-center items-center">
                    <img class="" src="assets/Icon.png"/>
                    <h2 class="text-center mt-6 text-xl font-bold">
                    Oops! Sorry.<br>
                    No content in this category.
                </h2>
                </div>
                
            `
    }
    else {
        videoContainer.classList.add("grid")
    }


    videos.forEach((video) => {
        // console.log(video)
        const videoCard = document.createElement('div')
        videoCard.classList = "card card-compact"

        videoCard.innerHTML = `
        <figure class= "h-[200px] relative">
        <img class="h-full w-full object-cover"
        src= ${video.thumbnail}
        alt="Shoes" />
        ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black px-2 py-1 rounded text-white text-xs">${getTimeString(video.others.posted_date)}</span>`
            }
        </figure>
        
        <div class="px-0 py-2 flex justify-between gap-2">
         <div class="flex gap-2">
             <div>
            <img class ="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
          </div>
          <div>
            <h2 class="font-bold">${video.title}</h2>
            <div class ="flex gap-2 items-center">
                <p class="text-gray-400">${video.authors[0].profile_name}</p>
                ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
            </div>
            </div>

         </div>
            <div>
              <p>
                    <button class = 'btn active2' onclick="showDetails('${video.video_id}')">
                        Details
                    <button>
              </p>
            </div>
        </div>
        `



        videoContainer.appendChild(videoCard)
    })
}


loadCategories()
loadVideos()