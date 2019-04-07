// load json data from file for tabs

function loadJSON(callback) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'fitness.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function buildTabs(fitnessData, elementId) {

    // the element to which data is to be attached (tab)
    let tabPane = document.getElementById(elementId);

    // for the number of cards
    for (let i = 0; i < fitnessData.length; i++) {
        let fitness = fitnessData[i];

        // card element
        let card = document.createElement('div');
        card.classList.add('card');

        // add image of trainer
        let trainerImageContainer = document.createElement('div');
        trainerImageContainer.classList.add('card-trainer-image-container');
        let trainerImageElement = document.createElement('img');
        trainerImageElement.classList.add('card-trainer-image');
        trainerImageElement.setAttribute('src', fitness.trainerImage);
        trainerImageContainer.appendChild(trainerImageElement);
        card.appendChild(trainerImageContainer);

        // add details of the fitness program
        let cardInfoDetails = document.createElement('div');
        let cardInfoHeader = document.createElement('div');
        let cardInfoBy = document.createElement('span');
        let cardInfoTrainer = document.createElement('span');
        let cardInfoPara = document.createElement('div');
        cardInfoDetails.classList.add('card-info-details');
        cardInfoHeader.classList.add('card-info-header');
        cardInfoBy.classList.add('card-info-by');
        cardInfoTrainer.classList.add('card-info-trainer');
        cardInfoPara.classList.add('card-info-para');
        cardInfoHeader.innerText = fitness.program;
        cardInfoBy.innerText = 'by ';
        cardInfoTrainer.innerText = fitness.trainer;
        if (fitness.info.length > 250) {
            cardInfoPara.innerText = fitness.info.substring(0, 250) + "...";
        } else {
            cardInfoPara.innerText = fitness.info;
        }
        cardInfoDetails.appendChild(cardInfoHeader);
        cardInfoDetails.appendChild(cardInfoBy);
        cardInfoDetails.appendChild(cardInfoTrainer);
        cardInfoDetails.appendChild(cardInfoPara);

        // add details of club, partners and members
        let cardSubInfo = document.createElement('div');
        // club
        let cardInfoClub = document.createElement('div');
        cardInfoClub.classList.add('card-info-row');
        let cardInfoClubSub = document.createElement('span');
        cardInfoClubSub.classList.add('card-sub');
        cardInfoClubSub.innerText = 'club: ';
        let cardInfoSubInfo = document.createElement('span');
        cardInfoSubInfo.classList.add('card-sub-info');
        cardInfoSubInfo.innerText = fitness.club;
        cardInfoClub.appendChild(cardInfoClubSub);
        cardInfoClub.appendChild(cardInfoSubInfo);
        // partners
        let cardInfoPartners = document.createElement('div');
        cardInfoPartners.classList.add('card-info-row');
        let cardInfoPartnerSub = document.createElement('span');
        cardInfoPartnerSub.classList.add('card-sub');
        cardInfoPartnerSub.innerText = 'partners: ';
        let cardInfoPartnerInfo = document.createElement('span');
        cardInfoPartnerInfo.classList.add('card-sub-info');
        cardInfoPartnerInfo.innerText = fitness.partners;
        cardInfoPartners.appendChild(cardInfoPartnerSub);
        cardInfoPartners.appendChild(cardInfoPartnerInfo);
        // members
        let cardInfoMembers = document.createElement('div');
        cardInfoMembers.classList.add('card-info-row');
        let cardInfoMembersSub = document.createElement('span');
        cardInfoMembersSub.classList.add('card-sub');
        cardInfoMembersSub.innerText = 'members: ';
        let cardInfoMemberInfo = document.createElement('span');
        cardInfoMemberInfo.classList.add('card-sub-info');
        cardInfoMemberInfo.innerText = `${fitness.members}/${fitness.totalMembers}`;
        cardInfoMembers.appendChild(cardInfoMembersSub);
        cardInfoMembers.appendChild(cardInfoMemberInfo);
        // append club, partners and members parent
        cardSubInfo.appendChild(cardInfoClub);
        cardSubInfo.appendChild(cardInfoPartners);
        cardSubInfo.appendChild(cardInfoMembers);

        // rating stars
        let cardRating = document.createElement('div');
        cardRating.classList.add('card-info-rating');

        // reviews
        let reviews = document.createElement('div');
        reviews.classList.add('card-reviews');
        reviews.innerText = `(${fitness.reviews}) Reviews`;

        // creating stars
        let stars = document.createElement('div');
        stars.classList.add('stars');
        let starsOuter = document.createElement('div');
        starsOuter.classList.add('stars-outer');
        let starsInner = document.createElement('div');
        starsInner.classList.add('stars-inner');
        starsOuter.appendChild(starsInner);
        stars.appendChild(starsOuter);
        cardRating.appendChild(stars);
        cardRating.appendChild(reviews);
        starsInner.style.width = `${fitness.rating * 20}%`;

        // members circles
        let cardUsers = document.createElement('div');
        cardUsers.classList.add('card-info-users');
        for (let j = 0; j < fitness.members && j < 4; j++) {
            let outerCircle = document.createElement('div');
            outerCircle.classList.add('outer-circle');
            outerCircle.classList.add(`circle-${j}`);
            let innerCircle = document.createElement('div');
            innerCircle.classList.add('inner-circle', `inner-circle-${j}`);
            outerCircle.appendChild(innerCircle);
            cardUsers.appendChild(outerCircle);
        }

        // if count exceeds four, display the count - 4 in the last circle
        if (fitness.members > 4) {
            let outerCircle = document.createElement('div');
            outerCircle.classList.add('outer-circle', `circle-4`);
            let innerCircle = document.createElement('div');
            innerCircle.classList.add('inner-circle', 'inner-circle-4');
            let innerCircleText = document.createElement('span');
            innerCircleText.innerText = `+${fitness.members - 4}`;
            innerCircleText.classList.add('inner-circle-4-text');
            innerCircle.appendChild(innerCircleText);
            outerCircle.appendChild(innerCircle);
            cardUsers.appendChild(outerCircle);
        }

        // schedule button
        let cardschedulers = document.createElement('div');
        cardschedulers.classList.add('card-info-scheduler');
        let scheduleButton = document.createElement('button');
        scheduleButton.classList.add('button-primary');
        scheduleButton.classList.add('button-schedule');
        scheduleButton.innerText = 'schedule';
        cardschedulers.appendChild(scheduleButton);

        scheduleButton.setAttribute('id', elementId + i + "schedule");
        scheduleButton.addEventListener('click', schedule);

        // add all the elements to card
        card.appendChild(trainerImageContainer);
        card.appendChild(cardInfoDetails);
        card.appendChild(cardSubInfo);
        card.appendChild(cardRating);
        card.appendChild(cardUsers);
        card.appendChild(cardschedulers);

        tabPane.appendChild(card);
    }
}

// event listener for schedule button click
function schedule(event) {
    let targetElementId = event.target.id;
    let targetElement = document.getElementById(targetElementId);
    let parentElement = targetElement.parentElement;
    let newElement = targetElement.cloneNode(true);
    newElement.classList.toggle('button-schedule-active');
    if (targetElement.innerHTML === 'schedule') {
        newElement.innerText = 'scheduled';
    } else {
        newElement.innerText = 'schedule';
    }
    newElement.addEventListener('click', schedule);
    parentElement.removeChild(targetElement);
    parentElement.appendChild(newElement);
}

function buildHTML(jsonData) {
    // send data and ids
    buildTabs(jsonData.fitness, 'tab-data-1');
    buildTabs(jsonData.running, 'tab-data-2');
    buildTabs(jsonData.dance, 'tab-data-3');
    buildTabs(jsonData.pilates, 'tab-data-4');
}

(function () {
    loadJSON(function (response) {
        let actual_JSON = JSON.parse(response);
        buildHTML(actual_JSON);
    });
})()