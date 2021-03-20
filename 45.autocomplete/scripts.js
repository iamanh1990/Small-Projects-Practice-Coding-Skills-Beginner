const countriesArray = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antigua &amp; Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia &amp; Herzegovina',
  'Botswana',
  'Brazil',
  'British Virgin Islands',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central Arfrican Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo',
  'Cook Islands',
  'Costa Rica',
  'Cote D Ivoire',
  'Croatia',
  'Cuba',
  'Curacao',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Polynesia',
  'French West Indies',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macau',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauro',
  'Nepal',
  'Netherlands',
  'Netherlands Antilles',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Korea',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Pierre &amp; Miquelon',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Korea',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'St Kitts &amp; Nevis',
  'St Lucia',
  'St Vincent',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  "Timor L'Este",
  'Togo',
  'Tonga',
  'Trinidad &amp; Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks &amp; Caicos',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Virgin Islands (US)',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

const autocomplete = (searchInput, countriesArray) => {
  //1)tracking the current autocompleted value
  let currentFocus;

  //2)when someones type in the search input, do things inside of input event
  searchInput.addEventListener('input', function (event) {
    //grab the value of search input
    const searchInputValue = this.value;

    //close any already open lists of autocompleted values - to make sure we only have 1 autocompleteItems list whenever the searchInput changes
    closeAllAutocompleteItems();

    //if the searchInputValue is falsy, do nothing - end the function
    if (!searchInputValue) {
      return false;
    } //else

    //the current autocompleted value is none
    currentFocus = -1;

    //create a DIV container to contain all the autocompleted values
    const autocompleteItemsContainer = document.createElement('div');
    autocompleteItemsContainer.id = `${this.id}autocomplete-list`;
    autocompleteItemsContainer.setAttribute('class', 'autocomplete-items');

    //append the autocompleteItemsContainer into the parent element of the searchInput
    this.parentNode.appendChild(autocompleteItemsContainer);

    //With each item in the countriesArray, check if the item starts with the same letter as the searchInput
    countriesArray.forEach((country) => {
      if (country.toUpperCase().startsWith(searchInputValue.toUpperCase())) {
        //create a div element for each identical item
        autocompleteItemDiv = document.createElement('div');

        //cut the matching part, bold it and add it to the autocompleteItemDiv
        autocompleteItemDiv.innerHTML = `<strong>${country.substr(
          0,
          searchInputValue.length
        )}</strong>`;

        //add the left part of the item value
        autocompleteItemDiv.innerHTML += `${country.substr(
          searchInputValue.length
        )}`;

        // Insert an input fiel which will hold the current array item's value - doing this, later on when someone clicks on the current item, we can grab the value we put in the input:hidde, and pass it to the searchInput
        autocompleteItemDiv.innerHTML += `<input type="hidden" value=${country} />`;

        //when someone click on the current autocompleteItemDiv, grab the input:hidden value and pass it to the searchInput
        autocompleteItemDiv.addEventListener('click', function () {
          searchInput.value = this.querySelector('input').value;
          //then close all other autocompleteItemDivs
          closeAllAutocompleteItems();
        });

        //append the autocompleteItemDiv into autocompleteItemsContainer
        autocompleteItemsContainer.appendChild(autocompleteItemDiv);
      }
    });
  });

  //3)using arrow-down and arrow-up key to navigate the value of autocompleteItems
  searchInput.addEventListener('keydown', function (event) {
    //grab the autocompleteItemsContainer
    const autocompleteItemsContainer = document.getElementById(
      `${this.id}autocomplete-list`
    );

    //grab all items div inside of autocompleteItemsContainer
    if (autocompleteItemsContainer) {
      let autocompleteItems = autocompleteItemsContainer.querySelectorAll(
        'div'
      );

      if (event.keyCode === 40) {
        //if the users press arrow-down key
        currentFocus++;
        //add active class to the current focus autocompleteItem
        addActive(autocompleteItems);
      } else if (event.keyCode === 38) {
        //if the users press arrow-up key
        currentFocus--;
        addActive(autocompleteItems);
      } else if (event.keyCode === 13) {
        //if the user click ENTER key
        event.preventDefault();
        if (currentFocus > -1) {
          //simulate a click event on the current active autocompleteItem then its value can be passed to the searchInput
          if (autocompleteItems) autocompleteItems[currentFocus].click();
        }
      }
    }
  });

  //))))) Helper function to close already open autocomplete items when searchInput changes
  const closeAllAutocompleteItems = (element) => {
    //close all autocompleteItems lists in the document, except the one passed as an argument
    const allAutocompleteItems = document.querySelectorAll(
      '.autocomplete-items'
    );
    allAutocompleteItems.forEach((autocompleteItems) => {
      if (element !== autocompleteItems && element !== searchInput) {
        //Dont remove autocomplete-items when user click on searchInput or the autocompleteItems itself
        autocompleteItems.parentNode.removeChild(autocompleteItems);
      }
    });
  };

  //))) Helper function to add active class to currentFocus autocompleteItem
  const addActive = (autocompleteItems) => {
    if (!autocompleteItems) return false;

    //removing all active class from all items
    removeActive(autocompleteItems);
    //checking the currentFocus
    if (currentFocus >= autocompleteItems.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = autocompleteItems.length - 1;
    //add active class on current focus autocompleteItem
    autocompleteItems[currentFocus].classList.add('autocomplete--active');
  };

  //)))) Helper function to remove active class from all autocompleteItems
  const removeActive = (autocompleteItems) => {
    autocompleteItems.forEach((autocompleteItem) =>
      autocompleteItem.classList.remove('autocomplete--active')
    );
  };
};

//Initialize the function autocomplete
const searchInput = document.querySelector('#myInput');
autocomplete(searchInput, countriesArray);
