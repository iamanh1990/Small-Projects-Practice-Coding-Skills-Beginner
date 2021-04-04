const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

//Show modal, focus on Input
function showModal() {
  modal.classList.add('show-modal');
  websiteNameEl.focus();
}

//Modal event listener
modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', () =>
  modal.classList.remove('show-modal')
);
window.addEventListener('click', (e) => {
  e.target === modal ? modal.classList.remove('show-modal') : false;
});

//Validate form
function validate(nameValue, urlValue) {
  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert('Please submit values for both fields.');
    return false;
  }
  if (!urlValue.match(regex)) {
    alert('Please provide a valid url');
    return false;
  }
  return true;
}

//buildBookmarks DOM
function buildBookmarks() {
  //remove all bookmark elements
  bookmarksContainer.textContent = '';
  //build items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    //item
    const item = document.createElement('div');
    item.classList.add('item');
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    closeIcon.setAttribute('title', 'Delete Bookmark');
    closeIcon.setAttribute('onClick', `deleteBookmark('${url}')`);
    //Favicon /Link container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    //Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute(
      'src',
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute('alt', 'favicon');
    //link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    //append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

//delete bookmark
function deleteBookmark(url) {
  bookmarks.forEach((bookmark, index) => {
    if (bookmark.url === url) {
      bookmarks.splice(index, 1);
    }
  });
  //update bookmarks array in the localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
}

//Fecth bookmarks
function fetchBookmarks() {
  //get bookmarks from localStorage if available
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    //creare bookmarks array in localStorage
    bookmarks = [
      {
        name: 'Jacinto Design',
        url: 'https://jacinto.design',
      },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

//Handle data from form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes('http') && !urlValue.includes('https')) {
    urlValue = `https://${urlValue}`;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

//Event listener
bookmarkForm.addEventListener('submit', storeBookmark);
//On load

fetchBookmarks();
