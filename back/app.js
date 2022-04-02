const express = require("express");
const fs = require("fs");

const app = express();

const urlencodedParser = express.urlencoded({ extended: false });

app.use(require("body-parser").json());
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    next();
});

/*fs.access('back/file.json', fs.F_OK, (err) => {
    if (err) {
        createFileJSON();
    }
})*/

app.get("/about", function (request, response) {
    console.log('about-get');
    response.send("nisho?");
});

app.post("/get-days", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log('getDays request:', request.body);
    fs.readFile(`back/users/${request.body.login}.json`, 'utf8', function (err, data) {
        if (err) throw err;
        let parsedData = JSON.parse(data);
        let days = parsedData.days;
        let requestYear = Number(request.body.year);
        let requstMonth = request.body.month;
        let daysToSend = [];
        days.forEach(element => {
            if (element.year === requestYear && element.month === requstMonth) {
                daysToSend.push(element);
            }
        });
        daysToSend = updateMonthToMonday(daysToSend);
        daysToSend = updateMonthTo42Days(daysToSend);
        response.send(daysToSend);
    });

});
app.post("/register", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log('register request', request.body);
    createFileJSON(request.body);
    response.send({ text: `${request.body.login} Registered! Try to login now` });
});
app.post("/login", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log('login requstt:', request.body);
    fs.access(`back/users/${request.body.login}.json`, fs.F_OK, (err) => {
        if (err) {
            response.send({ text: `There are no user with login: ${request.body.login}` });
        } else {
            fs.readFile(`back/users/${request.body.login}.json`, 'utf8', function (err, data) {
                if (err) throw err;
                let parsedData = JSON.parse(data);
                if (parsedData.password === request.body.password) {
                    response.send({ text: `success` });
                } else { response.send({ text: `wrong password` }); }
            });

        }
    })
});
app.post("/get-day", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log('getDay request:', request.body);
    fs.readFile(`back/users/${request.body.userLogin}.json`, 'utf8', function (err, data) {
        if (err) throw err;
        let parsedData = JSON.parse(data);
        let days = parsedData.days;
        let requestYear = Number(request.body.year);
        let requstMonth = request.body.month;
        let requstDay = request.body.day;
        let dayToSend = {};
        days.forEach(element => {
            if (element.year === requestYear && element.month === requstMonth && element.day === requstDay) {
                dayToSend = element;
            }
        });
        response.send(dayToSend);
    });

});
app.post("/addToList", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    fs.readFile(`back/users/${request.body.login}.json`, 'utf8', function (err, data) {
        if (err) throw err;
        console.log('addToList request', request.body);
        let parsedData = JSON.parse(data);
        let days = parsedData.days;
        for (let i = 0; i < 37000; i++) {
            if (days[i]) {
                if (days[i].day === request.body.day && days[i].month === request.body.month && days[i].year === request.body.year) {
                    days[i].toDoList = [...days[i].toDoList, request.body.business];
                    console.log(days[i]);
                }
            }
        }
        parsedData.days = days;
        fs.writeFile(`back/users/${request.body.login}.json`, JSON.stringify(parsedData), (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('File saved');
            }
        })
        response.send({ text: 'list updated' });
    });
});
app.post("/removeFromList", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log('removelist request',request.body);
    fs.readFile(`back/users/${request.body.login}.json`, 'utf8', function (err, data) {
        if (err) throw err;
        console.log('addToList request', request.body);
        let parsedData = JSON.parse(data);
        let days = parsedData.days;
        for (let i = 0; i < 37000; i++) {
            if (days[i]) {
                if (days[i].day === request.body.day && days[i].month === request.body.month && days[i].year === request.body.year) {
                    days[i].toDoList.splice(request.body.index,1);
                }
            }
        }
        parsedData.days = days;
        fs.writeFile(`back/users/${request.body.login}.json`, JSON.stringify(parsedData), (err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('File saved');
            }
        })
        response.send({ text: 'list removed' });
    });
});
/*
fs.readFile('back/file.json', 'utf8', function (err, data) {
    if (err) throw err;
    console.log('Readed:',JSON.parse(data).text);
  });
  */
/*
let objToWrite = {
    text: 'textik'
}


fs.writeFile("back/file.json", JSON.stringify(objToWrite), (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('File saved');
    }
})
*/

/*
 fs.readFile('back/file.json', 'utf8', function (err, data) {
   if (err) throw err;
   console.log('Readed:',JSON.parse(data).text);
 });*/

app.listen(4000);

function updateMonthToMonday(days) {
    if (days[0].name !== 'Monday') {
        let daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let d = new Date(days[0].year, days[0].monthCount, days[0].day);
        while (true) {
            d.setDate(d.getDate() - 1);
            let tempDate = {
                name: daysNames[d.getDay()],
                day: d.getDate(),
                month: monthNames[d.getMonth()],
                monthCount: d.getMonth(),
                year: d.getFullYear(),
                toDoList: []
            }
            if (tempDate.name === 'Sunday') {
                break;
            } else {
                days.unshift(tempDate);
            }
        }
        return days;
    } else { return days }
}

function updateMonthTo42Days(days) {
    let daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let d = new Date(days[days.length - 1].year, days[days.length - 1].monthCount, days[days.length - 1].day);
    while (days.length < 42) {
        d.setDate(d.getDate() + 1);
        let tempDate = {
            name: daysNames[d.getDay()],
            day: d.getDate(),
            month: monthNames[d.getMonth()],
            monthCount: d.getMonth(),
            year: d.getFullYear(),
            toDoList: []
        }
        days.push(tempDate);

    }
    return days;
}

function createFileJSON(user) {
    let dates = [];
    let daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let d = new Date(2000, 0, 1);

    while (d.getFullYear() < 2100) {
        let date = {
            name: daysNames[d.getDay()],
            day: d.getDate(),
            month: monthNames[d.getMonth()],
            monthCount: d.getMonth(),
            year: d.getFullYear(),
            toDoList: []
        }
        dates.push(date)
        d.setDate(d.getDate() + 1);
    }

    let infoToWrite = { login: user.login, password: user.password, days: dates }
    fs.writeFile(`back/users/${user.login}.json`, JSON.stringify(infoToWrite), (err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log('File saved');
        }
    })
}