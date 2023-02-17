"use strict";

var _module$exports;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var data = {};

var db = require('../../database'); // _APPDIR


var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var auth = require('../middlewares/auth');

var registerUsers = function registerUsers(req, res) {
  var _req$body, login, password, email;

  return regeneratorRuntime.async(function registerUsers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, login = _req$body.login, password = _req$body.password, email = _req$body.email; // Champs envoyer dans la requête	

          _context3.prev = 1;

          if (!(login == null || password == null || email == null)) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            'error': 'missing params'
          }));

        case 6:
          //Vérification du login disponnible en base de donnée
          db.query("SELECT * FROM users WHERE login = '" + login + "'", function _callee2(err, response) {
            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(response.length > 0)) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt("return", res.status(400).json({
                      'error': 'Login not valid'
                    }));

                  case 2:
                    //Vérification si le mail existe en base de donnée
                    db.query("SELECT * FROM users WHERE email = '" + email + "' ", function _callee(err, response) {
                      var salt, hash;
                      return regeneratorRuntime.async(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              if (!(response.length > 0)) {
                                _context.next = 2;
                                break;
                              }

                              return _context.abrupt("return", res.status(400).json({
                                'error': 'email already used'
                              }));

                            case 2:
                              _context.next = 4;
                              return regeneratorRuntime.awrap(bcrypt.genSalt());

                            case 4:
                              salt = _context.sent;
                              _context.next = 7;
                              return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

                            case 7:
                              hash = _context.sent;
                              // Insert user into database
                              db.query("INSERT INTO users (login, password, email, id_role) VALUES (\"".concat(login, "\", \"").concat(hash, "\", \"").concat(email, "\", 1)"), function (err, response) {
                                if (err) {
                                  res.status(500).json({
                                    status: false,
                                    message: 'There was a problem with the query.'
                                  });
                                } else {
                                  // send the JWT to the client
                                  var sql = "SELECT users.id FROM users WHERE users.login = \"".concat(login, "\"");
                                  db.query(sql, function (error, data) {
                                    if (error) {
                                      throw error;
                                    } else {
                                      var _sql = "INSERT INTO participants (id_room, id_user) VALUES (0, ".concat(data[0].id, ")");

                                      db.query(_sql, function (error) {
                                        if (error) throw error;
                                        res.status(200).json({
                                          status: true,
                                          message: 'Inscription valider'
                                        });
                                      });
                                    }
                                  });
                                }
                              });

                            case 9:
                            case "end":
                              return _context.stop();
                          }
                        }
                      });
                    });

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });

        case 7:
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);
          res.status(500).send(_context3.t0);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

var authUsers = function authUsers(req, res) {
  var login = req.body.login;
  var password = req.body.password;
  db.query("SELECT users.id, users.login, users.email, users.id_role, users.password, GROUP_CONCAT(participants.id_room) AS rooms FROM users LEFT JOIN participants ON users.id = id_user WHERE login = '".concat(login, "' GROUP BY id"), function (error, results) {
    if (results.length > 0) {
      bcrypt.compareSync(password, results[0].password, function (err, result) {
        if (result) {
          return res.send({
            message: "Login Successful"
          });
        } else {
          return res.status(400).send({
            message: "Invalid Password"
          });
        }
      });
      var rooms = results[0].rooms.split(',');
      var mySecret = "mysecret";
      var token = jwt.sign({
        login: login,
        iat: ~~(Date.now() / 1000),
        type: 'authtoken',
        email: results[0].email,
        id: results[0].id.toString(),
        id_role: results[0].id_role,
        id_rooms: rooms
      }, mySecret, {
        expiresIn: "30d"
      });

      var _refreshToken = jwt.sign({
        message: "refresh Token info",
        iat: ~~(Date.now() / 1000),
        type: 'token',
        email: results[0].email,
        login: login,
        id_rooms: rooms,
        id: results[0].id.toString(),
        id_role: results[0].id_role
      }, mySecret, {
        expiresIn: "1m"
      });

      res.status(200).json({
        status: true,
        token: token,
        refresh: _refreshToken
      });
    } else {
      res.status(400).send("You cannot login.");
    }
  });
};

var connectedUser = function connectedUser(req, res) {
  res.status(200).json({
    user: req.user
  });
};

var refreshToken = function refreshToken(id, callback) {
  db.query("SELECT users.id, users.login, users.email, users.id_role, users.password, GROUP_CONCAT(participants.id_room) AS rooms FROM users LEFT JOIN participants ON users.id = id_user WHERE users.id = ".concat(id, " GROUP BY id"), function (err, results) {
    if (results.length > 0) {
      var rooms = results[0].rooms.split(',');
      var mySecret = "mysecret";
      var token = jwt.sign({
        message: "refresh Token info",
        iat: ~~(Date.now() / 1000),
        type: 'token',
        email: results[0].email,
        login: results[0].login,
        id_rooms: rooms,
        id: results[0].id.toString(),
        id_role: results[0].id_role
      }, mySecret, {
        expiresIn: "1m"
      }); //je place un callback en paramètre 

      callback(token);
    }
  });
};

var getUsers = function getUsers(req, res) {
  var sql = 'SELECT `login` FROM users';
  db.query(sql, function (error, data) {
    if (error) throw error;else res.send(data);
  });
};

var getAllFromUsers = function getAllFromUsers(req, res) {
  var sql = 'SELECT * FROM users';
  db.query(sql, function (error, data) {
    if (error) throw error;else res.send(data);
  });
};

var addUserToRoom = function addUserToRoom(req, res) {
  var verifyRoles = "SELECT role FROM  users INNER JOIN roles \n\tON roles.id = users.id_role WHERE users.id = ?";
  db.query(verifyRoles, [req.user.id], function (error, data) {
    if (data.length !== 0) {
      if (data[0].role !== "ban") {
        var verifyParticipation = "SELECT id_room FROM participants WHERE id_user = ? AND id_room = ?";
        db.query(verifyParticipation, [req.user.id, req.params.idRoom], function (error, dataIdRoom) {
          if (dataIdRoom[0] == undefined) {
            var insertUser = insertToRoom(req.body.id_room, req.user.id);
            res.status(200).send({
              message: 'Request succeed.'
            });
          } else res.status(400).send({
            message: 'The id user ' + [req.user.id] + ' is already related to the id room ' + [req.body.id_room] + ' .'
          });
        });
      } else res.status(400).send({
        message: 'You were ban of this room.'
      });
    }
  });
};

var getUserDetails = function getUserDetails(req, res) {
  var sql = "SELECT users.login, users.email, GROUP_CONCAT(rooms.name) AS rooms_name FROM users, rooms WHERE users.id = ".concat(req.params.userId);
  db.query(sql, function (error, data) {
    if (error) throw error;else res.send(data);
  });
};

var updateUser = function updateUser(req, res) {
  var _req$body2 = req.body,
      login = _req$body2.login,
      email = _req$body2.email,
      password = _req$body2.password,
      confPassword = _req$body2.confPassword;

  if (!login.length || !password.length || !email.length) {
    return res.status(400).json({
      message: 'missing params'
    });
  }

  var sql2 = "SELECT id FROM users WHERE NOT id = '" + req.user.id + "' AND (email = '" + req.body.email + "' OR login = '" + req.body.login + "')";
  db.query(sql2, function _callee3(response, data) {
    var passwordRegex, emailRegex, salt, hash, sqlUpdate;
    return regeneratorRuntime.async(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(data.length == 0)) {
              _context4.next = 19;
              break;
            }

            console.log('first');
            passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //minimum 8char, 1maj, 1minuscule ett 1 chiffre

            emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!(password == confPassword)) {
              _context4.next = 17;
              break;
            }

            _context4.next = 7;
            return regeneratorRuntime.awrap(bcrypt.genSalt());

          case 7:
            salt = _context4.sent;
            _context4.next = 10;
            return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

          case 10:
            hash = _context4.sent;
            sqlUpdate = "UPDATE users SET `login` = '" + req.body.login + "', `password`= '" + hash + "', `email`= '" + req.body.email + "' WHERE id = '" + req.user.id + "' ";

            if (passwordRegex.test(req.body.password)) {
              _context4.next = 14;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: 'Erreur, le mot de passe doit contenir au minimum 8 charactères, 1 majuscule et 1 minuscule'
            }));

          case 14:
            if (emailRegex.test(req.body.email)) {
              _context4.next = 16;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: 'Erreur, email invalide'
            }));

          case 16:
            db.query(sqlUpdate, [req.params.id], function (err, data) {
              return res.status(200).json({
                message: "Utilisateur modifié avec succès"
              });
            });

          case 17:
            _context4.next = 20;
            break;

          case 19:
            return _context4.abrupt("return", res.status(401).json({
              message: "Error, an account is already linked to this email or login"
            }));

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
};

module.exports = (_module$exports = {
  registerUsers: registerUsers,
  authUsers: authUsers,
  connectedUser: connectedUser,
  getUsers: getUsers
}, _defineProperty(_module$exports, "authUsers", authUsers), _defineProperty(_module$exports, "addUserToRoom", addUserToRoom), _defineProperty(_module$exports, "getUserDetails", getUserDetails), _defineProperty(_module$exports, "updateUser", updateUser), _defineProperty(_module$exports, "refreshToken", refreshToken), _defineProperty(_module$exports, "getAllFromUsers", getAllFromUsers), _module$exports);