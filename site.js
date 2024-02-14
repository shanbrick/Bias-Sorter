function newDiv() {
    const para = document.createElement("p");
    para.innerText = "This is a paragraph";
    document.body.appendChild(para);
}

function newUnsortedDiv() {
    const div = document.createElement("div");
}

// <div class="groupPageDivs">
//      <img class="personPicIndividual" src="ode.jpeg"></img>
//      <p id="stageName1" class="idolNameGroupPage">O.de</p>
//      <button onclick="addToUnsorted('BOYNEXTDOOR', 3, 'Myung Jaehyun', 'Myung Jaehyun', 'December 4, 2003', 'myungJaehyun.jpeg')">Add</button>
// </div>

function addToUnsorted(groupName, id, stageName, fullName, birthday, imgLink) {
    unsortedList.push(
        {
            "groupName" : groupName,
            "#" : id,
            "stageName" : stageName,
            "fullName" : fullName,
            "birthday" : birthday,
            "imgLink" : imgLink
        }
    )

    console.log(unsortedList);
}

// const unsortedList = [
//     {
//         "groupName" : "Xdinary Heroes",
//         "#" : 4,
//         "stageName" : "O.de",
//         "fullName" : "Oh Seungmin",
//         "birthday" : "June 11, 2002",
//         "imgLink" : "ode.jpeg"
//     }
// ]

// console.log(unsortedList)
// addToUnsorted("BOYNEXTDOOR", 3, "Myung Jaehyun", "Myung Jaehyun", "December 4, 2003", "myungJaehyun.jpeg")
// console.log(unsortedList)
