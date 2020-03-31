const geolib = require('geolib');
var Points = require('./points.json')
var arr = loadData();
const express = require('express') //express server
const app = express()

var cors = require('cors')
app.use(cors())// cors 

var points=arr;             //map external to internal array


//configuration
var clearance = 680         //minimum distance that could make infection
var arrayOfInfected = []    //array of infected individuals
var pointsClass = []        //array of source individuals
var initialTime = 1         //initial time stamp
var lastTime = 3            //last time stamp
var timeInterval = 1        //time interval between time stamps


points.forEach(element => {

    if (element.catagory == "A") {

        pointsClass.push(element)
    }

});

function calculat(points, pointsClass) {
    // for (let time = initialTime; time < lastTime; time += timeInterval) {



        for (let i = 0; i < pointsClass.length; i++) {
            for (let index = 0; index < points.length; index++) {
                if (pointsClass[i].id != points[index].id && pointsClass[i].time == points[index].time ) {
                    var distanceDifference = geolib.getDistance(
                        { latitude: pointsClass[i].latitude, longitude: pointsClass[i].longitude },
                        { latitude: points[index].latitude, longitude: points[index].longitude }
                    )
                    console.log(distanceDifference);
                    console.log(pointsClass[i].id + "  " + points[index].id);

                    if (distanceDifference < clearance) {

                        addToArray(pointsClass[i], points[index],points[index].time)
                    }

                }
            }
            console.log("------------");
            
        }
    }
// }



function loadData() {// this functio is used to get data from any source

    return Points;
}

function addToArray(firstPoint, SecondPoint,time) {
    obj={ firstpoint: firstPoint, secondpoint: SecondPoint,Time:time}
    arrayOfInfected.push(obj)

}
calculat(points, pointsClass);
console.log(arrayOfInfected);

app.get('/', function (req, res) {
 res.send(arrayOfInfected)
});


app.listen(4000, function () {
    console.log(' API Server listening on port 4000!')
});

