// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const API_URL = "https://byabbe.se/on-this-day/";
const API_URL_END = "/events.json";
let day = 1;
let month = 1;

function pickRandom(numberOfOptions) {
  let randomPicker = Math.random();
  randomPicker = randomPicker * numberOfOptions;
  randomPicker = Math.floor(randomPicker);
  return randomPicker;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(API_URL + month + "/" + day + API_URL_END);
    let numberOfEvents = result.data.events.length;
    res.render("index.ejs", {
      content: result.data.events[pickRandom(numberOfEvents)],
      dates: { Month: "1", day: "1" },
      dayNice: "1st",
      monthNice: "Jan",
    });
  } catch (error) {
    console.error("Failed to fetch secret:", error.message);
    res.render("index.ejs", { content: "Failed to fetch secret" });
  }
});

app.post("/get-date", async (req, res) => {
  try {
    console.log(req.body);
    day = req.body.day;
    month = req.body.Month;
    let dayNice = dayith(req.body.day);
    console.log(dayNice);
    let  monthNice = monthith(req.body.Month);
    console.log(monthNice);
    console.log(API_URL + month + "/" + day + API_URL_END);
    const result = await axios.get(API_URL + month + "/" + day + API_URL_END);
    let numberOfEvents = result.data.events.length;
    let theEvent = result.data.events[pickRandom(numberOfEvents)];
    console.log(theEvent);
    res.render("index.ejs", {
      content: theEvent,
      dates: req.body,
      dayNice: dayNice,
      monthNice: monthNice,
    });
  } catch (error) {
    console.error("Failed to fetch secret:", error.message);
    res.render("index.ejs", { content: "Failed to fetch secret" });
  }
});

function dayith(day) {
  console.log("dayith has been called with " + day);
  let dayFound = false;
  let daysIndexArray = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21",
    "22", "23", "24", "25", "26", "27", "28", "29", "30", "31",
  ];
  let daysPolite = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "13th",
    "14th",
    "15th",
    "16th",
    "17th",
    "18th",
    "19th",
    "20th",
    "21st",
    "22nd",
    "23rd",
    "24th",
    "25th",
    "26th",
    "27th",
    "28th",
    "29th",
    "30th",
    "31st",
  ];
  let theDayResult = "";

  for (let i = 0; i < 31; i++) {
    if (dayFound === false) {
        if (day === daysIndexArray[i]) {
          console.log("dayith has been run " + i + " Times")
        theDayResult = daysPolite[i];
        dayFound = true;
        console.log("The Day Results is " + theDayResult);
        return theDayResult;
      }
    }
  }
}

function monthith(month) {
  console.log("monthith has been called with " + month);
  let monthFound = false;
  let monthIndexArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let monthPolite = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let theMonthResult = "";

  for (let i = 0; i < 31; i++) {
    if (monthFound === false) {
      if (month === monthIndexArray[i]) {
        theMonthResult = monthPolite[i];
        monthFound = true;
        console.log(theMonthResult);
        return theMonthResult;
      }
    }
  }
}

app.listen(3000, () => {
  console.log(`Server is running on port `);
});
