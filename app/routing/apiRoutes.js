var friendsData = require('../data/friends');

module.exports =  function(app) {
    
    app.get('/api/friends', function(req, res){
        res.json(friendsData);
    });

    app.post('/api/friends', function(req, res){

        var userData = req.body;
        var userScores = userData.scores;

        var userScores = userData.scores;
        var bestMatch = {
            name: "",
            photo: "",
            friendDiff: Infinity
        }

        var totalDiff;
        //[5,4,3,4,2,1] //friend1 scores
        //[4,2,1,5,3,1] //user entered scores
        //j=0
        //0 +(5-4) = 1
         //j=1
         //1+(4-2) = 3
         //i=0 //7
         //i=1
         //[6,4,3,5,6,2]
         //[4,2,1,5,3,1] //user entered scores
         //j=0
         //todiff =7

        for(var i=0; i<friendsData.length; i++){
            var currentFriend = friendsData[i];
            totalDiff = 0;
            for(var j=0; j< currentFriend.scores; j++){
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                totalDiff += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }
            if(totalDiff <= bestMatch.friendDiff){
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDiff = totalDiff;
            }
        }
        friendsData.push(userData);
        res.json(bestMatch);

    })

    

} 