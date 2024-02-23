fetch('groupList.json')
    .then(response => response.json())
    .then(archive => console.log(archive[1]))
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


function groupPageDiv() {
    unsortedArray.forEach(person => {
        if (person.groupName === 'Xdinary Heroes') {
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
        }
    })
}

{/* <div class="groupPageDivs">
            <img class="personPicIndividual" src="ode.jpeg"></img>
            <p id="stageName1" class="idolNameGroupPage">O.de</p>
            <button onclick="addToUnsorted('BOYNEXTDOOR', 3, 'Myung Jaehyun', 'Myung Jaehyun', 'December 4, 2003', 'myungJaehyun.jpeg')">Add</button>
    </div> */}