const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

const urlencodedParser = express.urlencoded({ extended: false });

app.use(require("body-parser").json());
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
    next();
});


app.get("/about", function (request, response) {
    console.log('about-get');
    response.send("nisho?");
});

app.post("/get-days", urlencodedParser, async function (request, response) {
    try {
        if (!request.body) return response.sendStatus(400);
        const { year, month, login } = request.body;
        console.log('getDays request:', request.body);

        const user = await getUserByLogin(login);
        if (!user) return response.send([]);

        const monthDays = generateMonthDays(Number(year), month);
        const { rows } = await db.query(
            `SELECT day, item FROM todos WHERE user_id=$1 AND year=$2 AND month=$3 ORDER BY created_at ASC`,
            [user.id, Number(year), month]
        );
        const dayToItems = new Map();
        rows.forEach(r => {
            const list = dayToItems.get(r.day) || [];
            list.push(r.item);
            dayToItems.set(r.day, list);
        });
        let daysToSend = monthDays.map(d => ({ ...d, toDoList: dayToItems.get(d.day) || [] }));
        daysToSend = updateMonthToMonday(daysToSend);
        daysToSend = updateMonthTo42Days(daysToSend);
        response.send(daysToSend);
    } catch (e) {
        console.error(e);
        response.status(500).send({ error: 'Internal error' });
    }
});

app.post("/register", urlencodedParser, async function (request, response) {
    try {
        if (!request.body) return response.sendStatus(400);
        console.log('register request', request.body);
        const { login, password } = request.body;
        const existing = await getUserByLogin(login);
        if (existing) return response.send({ text: `User already exists` });
        const password_hash = await bcrypt.hash(password, 10);
        await db.query(`INSERT INTO users(login, password_hash) VALUES ($1, $2)`, [login, password_hash]);
        response.send({ text: `${login} Registered! Try to login now` });
    } catch (e) {
        console.error(e);
        response.status(500).send({ error: 'Internal error' });
    }
});

app.post("/login", urlencodedParser, async function (request, response) {
    try {
        if (!request.body) return response.sendStatus(400);
        console.log('login requstt:', request.body);
        const { login, password } = request.body;
        const user = await getUserByLogin(login);
        if (!user) return response.send({ text: `There are no user with login: ${login}` });
        const ok = await bcrypt.compare(password, user.password_hash);
        if (ok) return response.send({ text: 'success' });
        return response.send({ text: 'wrong password' });
    } catch (e) {
        console.error(e);
        response.status(500).send({ error: 'Internal error' });
    }
});

app.post("/get-day", urlencodedParser, async function (request, response) {
    try {
        if (!request.body) return response.sendStatus(400);
        console.log('getDay request:', request.body);
        const { day, month, year, userLogin } = request.body;
        const user = await getUserByLogin(userLogin);
        if (!user) return response.send({});
        const base = generateSingleDay(Number(year), month, Number(day));
        const { rows } = await db.query(
            `SELECT item FROM todos WHERE user_id=$1 AND year=$2 AND month=$3 AND day=$4 ORDER BY created_at ASC`,
            [user.id, Number(year), month, Number(day)]
        );
        response.send({ ...base, toDoList: rows.map(r => r.item) });
    } catch (e) {
        console.error(e);
        response.status(500).send({ error: 'Internal error' });
    }
});

app.post("/addToList", urlencodedParser, async function (request, response) {
    try {
        if (!request.body) return response.sendStatus(400);
        console.log('addToList request', request.body);
        const { day, month, year, business, login } = request.body;
        const user = await getUserByLogin(login);
        if (!user) return response.send({ text: 'no such user' });
        await db.query(
            `INSERT INTO todos(user_id, year, month, day, item) VALUES ($1,$2,$3,$4,$5)`,
            [user.id, Number(year), month, Number(day), business]
        );
        response.send({ text: 'list updated' });
    } catch (e) {
        console.error(e);
        response.status(500).send({ error: 'Internal error' });
    }
});

app.post("/removeFromList", urlencodedParser, async function (request, response) {
    try {
        if (!request.body) return response.sendStatus(400);
        console.log('removelist request', request.body);
        const { day, month, year, index, login } = request.body;
        const user = await getUserByLogin(login);
        if (!user) return response.send({ text: 'no such user' });
        const { rows } = await db.query(
            `SELECT id FROM todos WHERE user_id=$1 AND year=$2 AND month=$3 AND day=$4 ORDER BY created_at ASC OFFSET $5 LIMIT 1`,
            [user.id, Number(year), month, Number(day), Number(index)]
        );
        if (rows.length) {
            await db.query(`DELETE FROM todos WHERE id=$1`, [rows[0].id]);
        }
        response.send({ text: 'list removed' });
    } catch (e) {
        console.error(e);
        response.status(500).send({ error: 'Internal error' });
    }
});

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

async function getUserByLogin(login) {
    const { rows } = await db.query(`SELECT id, login, password_hash FROM users WHERE login=$1`, [login]);
    return rows[0];
}

function generateMonthDays(year, monthName) {
    const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = monthNames.indexOf(monthName);
    if (monthIndex < 0) return [];
    const d = new Date(year, monthIndex, 1);
    const result = [];
    while (d.getMonth() === monthIndex) {
        result.push({
            name: daysNames[d.getDay()],
            day: d.getDate(),
            month: monthNames[d.getMonth()],
            monthCount: d.getMonth(),
            year: d.getFullYear(),
            toDoList: []
        });
        d.setDate(d.getDate() + 1);
    }
    return result;
}

function generateSingleDay(year, monthName, day) {
    const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthIndex = monthNames.indexOf(monthName);
    const d = new Date(year, monthIndex, day);
    return {
        name: daysNames[d.getDay()],
        day: d.getDate(),
        month: monthNames[d.getMonth()],
        monthCount: d.getMonth(),
        year: d.getFullYear(),
        toDoList: []
    };
}