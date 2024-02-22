fetch('Groups.json')
  .then(response => response.json())
//   .then(archive => console.log(archive))
.catch(error => console.error('Error fetching JSON:', error));


function homePageDiv(category) {
    unsortedArray.forEach(person => {

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

let unsortedArray = JSON.parse(localStorage.getItem('unsorted'));

function addToUnsorted(groupName, id, stageName, fullName, birthday, imgLink) {
    unsortedArray.push(
        {
            "groupName": groupName,
            "#": id,
            "stageName": stageName,
            "fullName": fullName,
            "birthday": birthday,
            "imgLink": imgLink
        }
    )

    localStorage.setItem('unsorted',JSON.stringify(unsortedArray));
    console.log("JSON parse unsorted: ", JSON.parse(localStorage.getItem('unsorted')));
}

let ultListArray = JSON.parse(localStorage.getItem('ults'));
let semiListArray = JSON.parse(localStorage.getItem('semi'));
let regListArray = JSON.parse(localStorage.getItem('regs'));
