const main = document.querySelector('.main');
const checkButton = document.querySelector('#check');
const body = document.querySelector('body');
const inputTitle = document.querySelector('.section__input__title');
const sectionForm = document.querySelector('.section__form');
const inputLocation = document.querySelector('.section__input__location');
const jobType = document.querySelector('.section__checkbox');


//! add side
const addForm = document.querySelector('.add__main__form');
let addId = document.querySelector('#add__form__input__id');
let addJobTitle = document.querySelector('#add__form__input__title');
let addJobImgUrl = document.querySelector('#add__form__input__imgUrl');
let addJobCompany = document.querySelector('#add__form__input__company');
let addJobLocation = document.querySelector('#add__form__input__location');
let addJobWorkType = document.querySelector('#add__form__select');
// ! edit form
const editForm = document.querySelector('.edit__main__form');
//! info page 
let devinfoimg = document.querySelector('.devinfo__section__img')
let devinfoName = document.querySelector('.devinfo__section__name')
let devinfoNameLink = document.querySelector('.devinfo__section__name__link')
let mainInfo = document.querySelector('.main__info')
let result = []
// ! Data
let data = []
// ! new data parse etemek
let jobsData = localStorage.getItem('jobsData')
if (jobsData) {
  try {
    data = JSON.parse(jobsData)
  }
  catch (err) {
    console.error(err);
  }
}
// ! page pathName and id
let page = getCurrentUrl();
// ! Get Data 
if (page.pathName == 'index.html') {
  getData(data)
  // ! deleteJob 
  function deleteJob(id) {
    event.preventDefault
    let newData = data.filter(item => item.id != id);
    localStorage.setItem('jobsData', JSON.stringify(newData))
    getData(newData)
  }
}
function getData(a) {
  let htmlData = '';
  a.map(item => {
    htmlData += `
<div class="main__content__box">
<div class="main__content1__img__box">
  <img src="${item.img}" 
  alt="" class="main__content1__img">
</div>
<div class="main__content__times__box">
  <p class="main__content__times__first">${item.time}</p>
  <span>.</span>
  <p class="main__content__times__second">${item.workType}</p>
</div>
<div class="main__content__name__box">
    <a href="./devjops_info.html?id=${item.id}" 
    target="_blank"  class="main__content__name">
    ${item.title}
  </a>
  </div>
  <p class="main__content__name__info">${item.company}</p>
  <div class="main__content__edit__delete__box">
  <p class="main__content__lacation">${item.location}</p>
  <a  href="/edit.html?id=${item.id}" class="main__content__edit cursor">Edit</a>
  <a href="#" onClick='deleteJob(${item.id})'
  class="main__content__delete cursor">Delete</a>
</div>
</div>
`
  })
  main.innerHTML = htmlData
}
// ! Change Dark Mode
checkButton.addEventListener('click', (e) => {
  if (e.target.checked) {
    localStorage.setItem('theme', 'dark')
  } else {
    localStorage.setItem('theme', 'light')
  }
  body.classList.toggle('dark')
})
// ! search function
function search(searchTerm, key, data) {
  searchTerm = searchTerm.toLowerCase();
  let filteredData = data.filter(item => {
    let currentItemValue = item[key].toLowerCase();
    return currentItemValue.includes(searchTerm);
  })
  return filteredData
}
//! getcurrentUrl
function getCurrentUrl() {
  let urlParams = new URLSearchParams(window.location.search)
  let id = urlParams.get('id')
  let pathName = window.location.pathname.split('/').pop()
  return {
    id: id,
    pathName: pathName
  }
}
// ! Job Search Side
sectionForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  result = search(inputTitle.value, 'title', data);
  result = search(inputLocation.value, 'location', result);
  if (jobType.checked) {
    result = search('Full Time', 'workType', result)
  } result.length <= 0 ? main.innerHTML = `<p class="empty__job">No Result...</p>` : getData(result)
})
// ! checkEmptyFields function
function checkEmptyFields(data,requiredFields){
  emptyFields=[];
for(const field of requiredFields){
  if(!data[field]){
  emptyFields.push(field)
  }
}
}
// ! add new data
addForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  let newData = {
    id: addId.value,
    img: addJobImgUrl.value,
    title: addJobTitle.value,
    workType: addJobWorkType.value,
    company: addJobCompany.value,
    location: addJobLocation.value,
    innerData: {
      jobLogo: "./assets/images/devinfo__img1.svg",
      jobUrl: "scoot.com",
      jobInfo:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.",
      requertmen: {
        info: "Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.   ",
        list: [
          {
            id: 1,
            text: "Morbi interdum mollis sapien. Sed",
          },
          {
            id: 2,
            text: "Morbi interdum mollis sapien.",
          },
          {
            id: 3,
            text: "Morbi interdum mollis sapi",
          },
          {
            id: 4,
            text: "Morbi interdum mollis",
          },
        ],
      },
      whatYouWillDo: {
        info: "Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus. Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.   ",
        list: [
          {
            id: 1,
            text: "Morbi interdum mollis sapien.",
          },
          {
            id: 2,
            text: "Morbi interdum mollis sapien",
          },
          {
            id: 3,
            text: "Morbi interdum mollis sap",
          },
          {
            id: 4,
            text: "Morbi interdum mollis",
          },
        ],
      },
    },
  }

  let requiredFields=['id','title','img','workType','company','location']
  checkEmptyFields(newData,requiredFields);
  if(emptyFields.length>0){
  alert(`Bu xanalari doldurun: ${emptyFields.join(', ')}`)
  }else{
    data.push(newData);
    localStorage.setItem('jobsData', JSON.stringify(data))
    alert('added data')
    window.location.href = "/index.html";
  }
})
// ! Window onload
window.onload = function () {
  let pageTheme = localStorage.getItem('theme');
  if (pageTheme == 'dark') {
    body.classList.add('dark')
    theme.checked = true;
  } else {
    body.classList.remove('dark')
  }

}
// ! data find by id
function getDataById(id, data) {
  return data.find(item => {
    return item.id == id
  })
}
// ! edit side
if (page.pathName == 'edit.html') {

  let editData = getDataById(page.id, data);
  addId.value = editData.id,
    addJobImgUrl.value = editData.img,
    addJobTitle.value = editData.title,
    '5h ago',
    addJobWorkType.value = editData.workType,
    addJobCompany.value = editData.company,
    addJobLocation.value = editData.location
  editForm.addEventListener('submit', (e) => {

    e.preventDefault();

    let newData = {
      id: addId.value,
      img: addJobImgUrl.value,
      title: addJobTitle.value,
      workType: addJobWorkType.value,
      company: addJobCompany.value,
      location: addJobLocation.value
    }






    let updateData = data.map(item => {
      if (item.id == page.id) {

        return {
          ...item,
          ...newData
        }
      }
      else {
        return item;
      }
    })
    localStorage.setItem('jobsData', JSON.stringify(updateData))
    alert('Data Edited');
    window.location.href = "/index.html"
  })
}




let findById = data.find(item => {
  return item.id == page.id
})

  generateInnerPage(findById);
//! generateInnerPage
function generateInnerPage(findById) {
  devinfoimg.src = findById.innerData.jobLogo,
  devinfoName.innerHTML = findById.company,
  devinfoNameLink.innerHTML = findById.innerData.jobUrl,
  mainInfo.innerHTML = `
 <div class="main__info__head main__pd">
<div class="main__info__head__texts__box">
  <p class="main__info__head__text__first">
    <span>1w ago</span>
    <span>${findById.workType}</span>
  </p>
  <h2 class="main__info__head__text__second">
  ${findById.title}
  </h2>
  <p class="main__info__head__text__third">${findById.loaction}</p>
</div>
<div class="main__info__head__button__box">
  <button class="main__info__head__button Search__button">
    Apply Now
  </button>
</div>
</div>
<p class="main__first__text main__pd light__texts">
${findById.innerData.jobInfo}
</p>
<div class="main__requirements__box main__pd">
<h3 class="main__requirements__h3">Requirements</h3>
<p class="main__requirements__text light__texts">
${findById.innerData.requertmen.info}
</p>
<ul class="main__requirements__lists light__texts">
  <li class="main__requirements__list">
  ${findById.innerData.requertmen.list[0].text}
  </li>
  <li class="main__requirements__list">
  ${findById.innerData.requertmen.list[1].text}
  </li>
  <li class="main__requirements__list">
  ${findById.innerData.requertmen.list[2].text}
  </li>
  <li class="main__requirements__list">
  ${findById.innerData.requertmen.list[3].text}
  </li>
</ul>
</div>
<div class="main__what__you__box  main__pd">
<h3 class="main__what__you__h3">What You Will Do</h3>
<p class="main__what__you__text light__texts">
${findById.innerData.whatYouWillDo.info}
</p>
<ol class="main__what__you__ol light__texts">
    <li class="main__what__you__li">${findById.innerData.whatYouWillDo.list[0].text}</li>
    <li class="main__what__you__li">${findById.innerData.whatYouWillDo.list[1].text}</li>
    <li class="main__what__you__li">${findById.innerData.whatYouWillDo.list[2].text}</li>
    <li class="main__what__you__li">${findById.innerData.whatYouWillDo.list[3].text}</li>

</ol>
</div> 
`
}