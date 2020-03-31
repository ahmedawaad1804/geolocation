const geolib = require('geolib');
var Points = require('./points.json')
// var arr = loadData();
const express = require('express') //express server
const app = express()

var cors = require('cors')
app.use(cors())// cors 

var points = arr;             //map external to internal array


//configuration
var clearance = 680         //minimum distance that could make infection
var arrayOfInfected = []    //array of infected individuals
var pointsClass = []        //array of source individuals
var initialTime = 1         //initial time stamp
var lastTime = 3            //last time stamp
var timeInterval = 1        //time interval between time stamps
var classArray = []           // array of specific class
var producedArray=[]        // array produced from scheduler equation
var superior_Category = "A"



indexOFts();                         // 1-first function to et index on time stamp column
getCountOfts();                      // 2- Second function to get number of time stamps available count(ts-column)
scheduler(superior_Category,Category);        // 3- is a scheduler that excutes sync ton every timestamp for specific superior_Category,Category





function getClass(superior_Category,TS) {
    if(TS==-1){
      /* SELECT * from data where class="&superior_Category " */  
    }
    let arrayOfInfected = []
    /* SELECT * from data where (class="&superior_Category AND ts=&TS)" */
    return 1;
}

function indexOFts() {
    /*CREATE INDEX timestamp
ON data (ts); */
    return 1;
}
function getCountOfts() {
    /* SELECT COUNT(ts) from data */
    return 1;
}

function scheduler(superior_Category, Category) {
    for (let index = initialTime; index < getCountOfts(); index+=timeInterval) {
        classArray = getClass(superior_Category,index); // 4- function to query specific category
        setGeoShape(classArray);                  // 5- function to set superior category geoshape in time stamp for declaring mino category example set A area to get B 
       joinGeometryVsPoints(Category) ;          // 6-this function uses join two tables as category from db and geometry from geoInfection
        rankPromotion() ;          // 7- function to check if score of category individuals exceed score
        dangerDecrease() ;          // 8- use mathematical equation to decrease danger of geoshape area of superior class
    }
    producedArray=getclass(Category,-1)
}
function setGeoShape(Array) {
    /*set geometry of points in array with specific buffer in different table named geoInfection
    as this table contain points buffer ,danger and timestamp */
    return 1;
}
function joinGeometryVsPoints(Category){
 /*join statement to add points to individual which are in specific area  */
 return 1;


}
function rankPromotion(){
/*that change category if point exceed specific score */
return 1;
}
function dangerDecrease(){
    /*that decrease area danger on bases of exponential or constant or linear function */
}
points.forEach(element => {

    if (element.catagory == "A") {

        pointsClass.push(element)
    }

});

function calculat(points, pointsClass) {
    // for (let time = initialTime; time < lastTime; time += timeInterval) {



    for (let i = 0; i < pointsClass.length; i++) {
        for (let index = 0; index < points.length; index++) {
            if (pointsClass[i].id != points[index].id && pointsClass[i].time == points[index].time) {
                var distanceDifference = geolib.getDistance(
                    { latitude: pointsClass[i].latitude, longitude: pointsClass[i].longitude },
                    { latitude: points[index].latitude, longitude: points[index].longitude }
                )
                console.log(distanceDifference);
                console.log(pointsClass[i].id + "  " + points[index].id);

                if (distanceDifference < clearance) {

                    addToArray(pointsClass[i], points[index], points[index].time)
                }

            }
        }
        console.log("------------");

    }
}
// }



function getInfectedIndividual() {// this functio is used to get data from any source

    //to run in a single time stamp 
    return Points;
}

function addToArray(firstPoint, SecondPoint, time) {
    obj = { firstpoint: firstPoint, secondpoint: SecondPoint, Time: time }
    arrayOfInfected.push(obj)

}
calculat(points, pointsClass);
console.log(arrayOfInfected);

app.get('/', function (req, res) {
    res.send(producedArray)
});


app.listen(4000, function () {
    console.log(' API Server listening on port 4000!')
});

