const data = {};
const db = require('../../database');
// _APPDIR
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/auth')


const registerUsers = async (req, res) => {
	const { login, password, email } = req.body;
	// Champs envoyer dans la requête	
	try {
		//Verification champs renseigné
		if (login == null || password == null || email == null) {
			return res.status(400).json({ 'error': 'missing params' });
		} else {
			//Vérification du login disponnible en base de donnée
			db.query("SELECT * FROM users WHERE login = '" + login + "'", async (err, response) => {

				if (response.length > 0) {
					//Si le login existe déjà en base de donnée on return l'erreur
					return res.status(400).json({ 'error': 'Login not valid' });
				}

				//Vérification si le mail existe en base de donnée
				db.query("SELECT * FROM users WHERE email = '" + email + "' ", async (err, response) => {

					if (response.length > 0) {
						//Si l'email existe déjà en base de donnée on return l'erreur
						return res.status(400).json({ 'error': 'email already used' });
					}

					// Hash password
					const salt = await bcrypt.genSalt()
					const hash = await bcrypt.hash(password, salt);

					// Insert user into database
					db.query(
						`INSERT INTO users (login, password, email, id_role) VALUES ("${login}", "${hash}", "${email}", 1)`, (err, response) => {
							if (err) {
								res.status(500).json({
									status: false,
									message: 'There was a problem with the query.'
								});
							}
							else {
								// send the JWT to the client
								const sql = `SELECT users.id FROM users WHERE users.login = "${login}"`
								db.query(sql, function (error, data) {
									if (error) {
										throw error;
									}
									else {
										const sql = `INSERT INTO participants (id_room, id_user) VALUES (0, ${data[0].id})`
										db.query(sql, function (error) {
											if (error) throw error;

											res.status(200).json({
												status: true,
												message: 'Inscription valider'
											});
										})
									}
								})
							}
						});
				});
			})
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
}

const authUsers = (req, res) => {
	const login = req.body.login;
	const password = req.body.password;
	console.log("----------")
	console.log(login)
	console.log(password)
	console.log("----------")


	db.query(`SELECT users.id, users.login, users.email, users.id_role, users.password, GROUP_CONCAT(participants.id_room) AS rooms FROM users LEFT JOIN participants ON users.id = id_user WHERE login = '${login}' GROUP BY id`, function (error, results) {
		console.log("results1: ",results)
		console.log(results.length);
		if (results.length > 0) {
			console.log('compare bcrypt:', bcrypt.compareSync(password, results[0].password))
			if(bcrypt.compareSync(password, results[0].password)) {
				const rooms = results[0].rooms?.split(',')

				const mySecret = "mysecret";
	
				const token = jwt.sign({
					login: login,
					iat: ~~(Date.now() / 1000),
					type: 'authtoken',
					email: results[0].email,
					id: results[0].id.toString(),
					id_role: results[0].id_role,
					id_rooms: rooms
				}, mySecret,{
					expiresIn: "60d",
					});
	
				const refreshToken = jwt.sign({
					message: "refresh Token info",
					iat: ~~(Date.now() / 1000),
					type: 'token',
					email: results[0].email,
					login: login,
					id_rooms: rooms,
					id: results[0].id.toString(),
					id_role: results[0].id_role,
				},
					mySecret,
					{
						expiresIn: "10d",
					}
				);
	
				res.status(200).json({
					status: true,
					token: token,
					refresh: refreshToken,
				});
			}
			else {
				return res.status(400).send({ message: "The login or the password is invalid" });	
			}
			};
	})
}

const connectedUser = (req, res) => {
	res.status(200).json({
		user: req.user
	})
}

const refreshToken = (id, callback) => {
	db.query(`SELECT users.id, users.login, users.email, users.id_role, users.password, GROUP_CONCAT(participants.id_room) AS rooms FROM users LEFT JOIN participants ON users.id = id_user WHERE users.id = ${id} GROUP BY id`, (err, results) => {
		if (results.length > 0) {
			const rooms = results[0].rooms.split(',')
			const mySecret = "mysecret";
			const token = jwt.sign({
				id: results[0].id,
			}, mySecret)
			//je place un callback en paramètre 
			callback(token)
		}
	})
}

const getUsers = (req, res) => {
	const sql = 'SELECT `login` FROM users'
	db.query(sql, function (error, data) {
		if (error) throw error;
		else res.send(data);
	})
}

const getAllFromUsers = (req, res) => {
	const sql = 'SELECT * FROM users'
	db.query(sql, function (error, data) {
		if (error) throw error;
		else res.send(data);
	})
}

const addUserToRoom = (req, res) => {

	const verifyRoles = `SELECT role FROM  users INNER JOIN roles 
	ON roles.id = users.id_role WHERE users.id = ?`
	db.query(verifyRoles, [req.user.id], function (error, data) {

		if (data.length !== 0) {
			if (data[0].role !== "ban") {

				const verifyParticipation = `SELECT id_room FROM participants WHERE id_user = ? AND id_room = ?`
				db.query(verifyParticipation, [req.user.id, req.params.idRoom], function (error, dataIdRoom) {
					if (dataIdRoom[0] == undefined) {
						var insertUser = insertToRoom(req.body.id_room, req.user.id);
						res.status(200).send({ message: 'Request succeed.' })

					} else res.status(400).send({ message: 'The id user ' + [req.user.id] + ' is already related to the id room ' + [req.body.id_room] + ' .' });
				})
			} else res.status(400).send({ message: 'You were ban of this room.' })
		}
	})
}

const getUserDetails = (req, res) => {
	const sql = `SELECT users.login, users.email, GROUP_CONCAT(rooms.name) AS rooms_name FROM users, rooms WHERE users.id = ${req.params.userId}`
	db.query(sql, function (error, data) {
		if (error) throw error;
		else res.send(data);
	})
}

const updateUser = (req, res) => {

	const { login, email, password, confPassword } = req.body;

	if (!login.length || !password.length || !email.length) {
		return res.status(400).json({ message: 'missing params' });
	}

	const sql2 = "SELECT id FROM users WHERE NOT id = '" + req.user.id + "' AND (email = '" + req.body.email + "' OR login = '" + req.body.login + "')"
	db.query(sql2, async (response, data) => {

		if (data.length == 0) {
			console.log('first')
			const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;                                                 //minimum 8char, 1maj, 1minuscule ett 1 chiffre
			const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (password == confPassword) {

				const salt = await bcrypt.genSalt()
				const hash = await bcrypt.hash(password, salt);

				const sqlUpdate = "UPDATE users SET `login` = '" + req.body.login + "', `password`= '" + hash + "', `email`= '" + req.body.email + "' WHERE id = '" + req.user.id + "' ";

				if (!passwordRegex.test(req.body.password)) {
					return res.status(400).json({ message: 'Erreur, le mot de passe doit contenir au minimum 8 charactères, 1 majuscule et 1 minuscule' })
				}

				if (!emailRegex.test(req.body.email)) {
					return res.status(400).json({ message: 'Erreur, email invalide' })
				}

				db.query(sqlUpdate, [req.params.id], (err, data) => {
					return res.status(200).json({ message: "Utilisateur modifié avec succès" });
				})
			}
		}
		else {
			return res.status(401).json({ message: "Error, an account is already linked to this email or login" });
		}
	})
}

module.exports = {
	registerUsers,
	authUsers,
	connectedUser,
	getUsers,
	authUsers,
	addUserToRoom,
	getUserDetails,
	updateUser,
	refreshToken,
	getAllFromUsers
}
