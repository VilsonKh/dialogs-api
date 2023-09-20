require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const mysql = require("mysql2/promise");
const app = express();
const env = process.env;

const port = env.NODE_PORT;

//устанавливает лимит на запросы: 1000 запросов в 60мин (60мин*60сек*1000милсек)
const limiter = rateLimit({
	max: 1000,
	windowMs: 60 * 60 * 1000,
	message: "Are you ofigel? Dudosit tut",
	standartHeaders: true,
	legacyHeaders: false,
});

app.use(limiter);

const CONFIG = {
	db_access: {
		host: env.DB_HOST,
		database: env.DATABASE,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		port: env.DB_PORT,
	},
};

const API_KEY = env.API_KEY;

const cors = require("cors");
app.use(
	cors({
		origin: "*",
	})
);

async function queryData(sqlQuery) {
	const con = await mysql.createConnection(CONFIG.db_access);
	const [res] = await con.execute(sqlQuery);
	// console.log(res);
	return res;
}

app.get("/api/getText", async (req, res) => {
	// res.json(JSON.stringify([{ test: "test" }]));

	const currentKey = req.headers["x-api-key"];
	if (currentKey) {
		const toStringKey = currentKey.toString();

		if (toStringKey !== API_KEY) {
			return res.status(403).send({
				message: "Access Denied, loh",
			});
		}
	} else {
		return res.status(403).send({
			message: "Access Denied, loh",
		});
	}

	const groupId = req.query.groupId;

	if (groupId) {
		try {
			const receivedText = await queryData(`SELECT text FROM Texts WHERE group_id = ${groupId} `);
			if (receivedText.length > 0) {
				// const randNumb = Math.floor(Math.random() * receivedId.length);
				// console.log(receivedId);
				// const receivedText = await queryData(`SELECT text FROM Texts WHERE id = ${receivedId[randNumb].id} `);
				res.json(receivedText);
			} else {
				res.status(404).send({
					message: "There is no group with specified id.",
				});
			}
		} catch (e) {
			return res.status(500).send({
				message: "Error!",
			});
		}
	} else {
		res.status(400).send({
			message: "Didn't pass correct parameter!",
		});
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
