var friendsArray = require("./friends.js");

function reducer(accumulator, currentValue) {

    return accumulator + currentValue;
}

let Friend = function (name, photo, scores) {
    this.name = name;
    this.photo = photo;
    this.scores = scores.map(function (score) {
        return parseInt(score);
    })

    this.findBestMatch = function (array) {

        let totalMatches = [];

        for (let i = 0; i < array.length; i++) {
            let matchScore = [];

            for (let y = 0; y < array[i].scores.length; y++) {
                matchScore.push(Math.abs(this.scores[y] - array[i].scores[y]))
            }

            totalMatches.push(matchScore);
        }


        var chosenFriendArray = [];

        for (let i = 0; i < totalMatches.length; i++) {
            chosenFriendArray.push(totalMatches[i].reduce(reducer));
        }

        console.log(chosenFriendArray);

        var matchedFriendIndex = Math.min.apply(null, chosenFriendArray);

        console.log(matchedFriendIndex);

        var friendsDataIndex = chosenFriendArray.indexOf(matchedFriendIndex);

        console.log(friendsDataIndex);

        return array[friendsDataIndex];


    }
}


module.exports = function (app) {
    app.post("/api/survey", function (req, res) {




        var newFriend = new Friend(req.body.name, req.body.photo, req.body.total);

        var comparableFriends = createFriendObjs(friendsArray);

        var matchedFriend = newFriend.findBestMatch(comparableFriends);

        console.log(matchedFriend);

        res.json(matchedFriend);

    })
}




function createFriendObjs(array) {

    let friends = [];
    for (let i = 0; i < array.length; i++) {


        friends.push(new Friend(array[i].name, array[i].photo, array[i].scores));
    }

    return friends;
}