fetch('Groups.json')
  .then(response => response.json())
  .then(archive => console.log(archive))
.catch(error => console.error('Error fetching JSON:', error));

function homePageDiv(list, category) {
    list.forEach(person => {

        const div = document.createElement('div');
        div.setAttribute('class','peopleUnsorted');
    
        const picture = document.createElement('img');
        picture.setAttribute('class','homePage');
        picture.src = person.imgLink;
        div.appendChild(picture);
    
        const name = document.createElement('p');
        name.setAttribute('class','idolName');
        name.textContent = person.stageName;
        div.appendChild(name);
    
        const group = document.createElement('p');
        group.setAttribute('class','groupName');
        group.textContent = person.groupName;
        div.appendChild(group);

        document.getElementById(category).appendChild(div);
    })
}

// <div class="groupPageDivs">
//      <img class="personPicIndividual" src="ode.jpeg"></img>
//      <p id="stageName1" class="idolNameGroupPage">O.de</p>
//      <button onclick="addToUnsorted('BOYNEXTDOOR', 3, 'Myung Jaehyun', 'Myung Jaehyun', 'December 4, 2003', 'myungJaehyun.jpeg')">Add</button>
// </div>

function addToUnsorted(groupName, id, stageName, fullName, birthday, imgLink) {
    unsortedList.push(
        {
            "groupName": groupName,
            "#": id,
            "stageName": stageName,
            "fullName": fullName,
            "birthday": birthday,
            "imgLink": imgLink
        }
    )

    console.log(unsortedList);
}

const unsortedList = [
    {
        "groupName": "Xdinary Heroes",
        "#": 4,
        "stageName": "O.de",
        "fullName": "Oh Seungmin",
        "birthday": "June 11, 2002",
        "imgLink": "ode.jpeg"
    },
    {
        "groupName": "BOYNEXTDOOR",
        "#": 3,
        "stageName": "Myung Jaehyun",
        "fullName": "Myung Jaehyun",
        "birthday": "December 4, 2003",
        "imgLink": "myungJaehyun.jpeg"
    },
    {
        "groupName": "RIIZE",
        "#": 4,
        "stageName": "Wonbin",
        "fullName": "Park Wonbin",
        "birthday": "March 2, 2002",
        "imgLink": "wonbin.jpeg"
    }
]

const ultList = [
    {
        "groupName": "Xdinary Heroes",
        "#": 4,
        "stageName": "O.de",
        "fullName": "Oh Seungmin",
        "birthday": "June 11, 2002",
        "imgLink": "ode.jpeg"
    }
]

const semiList = [
    {
        "groupName": "BOYNEXTDOOR",
        "#": 3,
        "stageName": "Myung Jaehyun",
        "fullName": "Myung Jaehyun",
        "birthday": "December 4, 2003",
        "imgLink": "myungJaehyun.jpeg"
    }
]

const regList = [
    {
        "groupName": "RIIZE",
        "#": 4,
        "stageName": "Wonbin",
        "fullName": "Park Wonbin",
        "birthday": "March 2, 2002",
        "imgLink": "wonbin.jpeg"
    }
]
