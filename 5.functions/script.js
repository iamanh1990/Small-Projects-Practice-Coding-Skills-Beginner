(function () {
  //Moving the script to the top of html file, there won't be extra row being added cause browser reads js first, the code will try adding the new row to the table which has not been rendered yet
  //Solution using <script defer ></script>
  // or putting the code inside of document.addEventListener('DOMContentLoaded', function);

  const getUsers = () => [
    {
      studentNo: 123,
      name: "harry",
      age: 15,
    },
    {
      studentNo: 234,
      name: "Ron",
      age: 16,
    },
    {
      studentNo: 135,
      name: "Hermione",
      age: 17,
    },
    {
      studentNo: -1,
      name: "Snape",
      age: 55,
    },
    {
      studentNo: -1,
      name: "Hagrid",
      age: 65,
    },
  ];

  //append new row to the table
  const renderUser = (user) => {
    const table = document.querySelector(".table tbody");
    const newTableRow = document.createElement("tr");
    const keys = Object.keys(user);
    for (let key of keys) {
      const newTableData = document.createElement("td");
      newTableData.textContent = user[key];
      newTableRow.appendChild(newTableData);
    }
    table.appendChild(newTableRow);
  };

  //get users data and store it in users variable
  const users = getUsers();

  //function addUser
  const addUser = (users) => {
    users.forEach((user) => renderUser(user));
  };
  //excute the addUser function
  addUser(users);

  //finding the older person
  const getOldest = (users) => {
    let oldestUser = users[0];
    for (let user of users) {
      if (user.age > oldestUser.age) {
        oldestUser = user;
      }
    }
    console.log(oldestUser);
    return oldestUser;
  };

  //What if there is more than 1 oldest person????
  getOldest(users);

  //   const isStaff = (users) => {
  //     //Create isStaff column
  //     const newTableHeading = document.createElement("th");

  //     newTableHeading.textContent = "isStaff";
  //     const firstTableRow = document.querySelector(".table tbody tr");
  //     firstTableRow.appendChild(newTableHeading);
  //     //running a loop through users and create table data according to the user student number
  //     for (let i = 0; i < users.length; i++) {
  //       if (users[i].studentNo < 0) {
  //         const newTableData = document.createElement("td");
  //         newTableData.textContent = "true";
  //         document
  //           .querySelectorAll("table tr:not(:first-child)")
  //           [i].appendChild(newTableData);
  //       } else {
  //         const newTableData = document.createElement("td");
  //         newTableData.textContent = "false";
  //         document
  //           .querySelectorAll("table tr:not(:first-child)")
  //           [i].appendChild(newTableData);
  //       }
  //     }
  //   };

  //Update DOM function
  const updateDOM = (users) => {
    //Clearing the table - remove the past table rows
    document
      .querySelectorAll(".table tbody tr:not(:first-child)")
      .forEach((el) => el.remove());
    //render new users
    users.forEach((user) => renderUser(user));
  };

  //Creating staff - solution 2
  // create a function to add property isStaff into users data
  // create isStaff table header
  //render the users again with the modified data
  const isStaff = (users) => {
    const newTableHeading = document.createElement("th");

    newTableHeading.textContent = "isStaff";
    const firstTableRow = document.querySelector(".table tbody tr");
    firstTableRow.appendChild(newTableHeading);

    //modify the users data - array methos not allowed
    for (let user of users) {
      if (user.studentNo < 0) {
        user.isStaff = true;
      } else {
        user.isStaff = false;
      }
    }

    //update DOM
    updateDOM(users);
  };

  //Excute the isStaff func
  isStaff(users);

  //sort the users descendingly according to user age
  const sortUsers = (users) => {
    const sortedUsers = [];
    const spliceUsers = (users) => {
      // const newUsers = users.sort((a, b) => b.age - a.age); sort method is not allowed

      if (users.length > 0) {
        const oldestUser = getOldest(users); //get the oldest
        sortedUsers.push(oldestUser);
        users.splice(users.indexOf(oldestUser), 1);
        spliceUsers(users); //call the func again to get the oldest out
      }
    };
    //sort the users
    spliceUsers(users);
    //update DOM
    updateDOM(sortedUsers);
  };

  //Add event listener to the sort button
  document
    .getElementById("sort-button")
    .addEventListener("click", () => sortUsers(users));
})();
