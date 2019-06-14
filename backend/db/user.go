package db

import (
	"errors"
	"time"

	"../helpers"
	"github.com/AlexeySpiridonov/goapp-config"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type User struct {
	Id          bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Email       string        `json:"email"`
	Name        string        `json:"name"`
	Phone       string        `json:"phone"`
	Token       string        `json:"token"`
	Os          string        `json:"os"`
	Version     string        `json:"version"`
	Device      string        `json:"device"`
	Admin       bool          `json:"admin"`
	Lifesaver   bool          `json:"lifesaver"`
	Code        string        `json:"-"`
	CreatedAt   int64         `json:"-"`
	LastVisitAt int64         `json:"-"`
}

func (users) GetByToken(token string) (user User, err error) {
	if len(token) < 4 {
		err = errors.New("Empty token")
		return
	}
	err = DBUsers.Find(bson.M{"token": token}).One(&user)
	refresh("user", err)
	go DBUsers.UpdateId(user.Id, bson.M{"$set": bson.M{"lastvisitat": time.Now().Unix()}})
	return
}

func (u *User) Save() (i *mgo.ChangeInfo, err error) {
	log.Debug(u)
	i, err = DBUsers.UpsertId(u.Id, u)
	if err != nil {
		log.Error(err, u, i)
	}
	return
}

func (users) Confirm(phone, code string) (user User, err error) {
	if len(phone) < 5 {
		err = errors.New("Empty phone")
		log.Error(err)
		return
	}
	err = DBUsers.Find(bson.M{"phone": phone}).One(&user)
	log.Debug(user)
	refresh("user", err)
	if err != nil {
		log.Error(err)
		return
	}
	if user.Code != code {
		err = errors.New("Wrong code")
		log.Error(err)
		return
	}

	if len(user.Token) == 0 {
		user.Token = bson.NewObjectId().Hex()
	}

	err = DBUsers.UpdateId(user.Id, bson.M{"$set": bson.M{"token": user.Token, "code": ""}})
	if err != nil {
		log.Error(err)
	}
	return
}

func (users) Auth(Name, Phone, Os, Version, Device string) (code string, err error) {
	if len(Phone) < 5 {
		err = errors.New("Empty phone")
		log.Error(err)
		return
	}
	if len(Name) < 1 {
		err = errors.New("Empty name")
		log.Error(err)
		return
	}
	user := User{}
	err = DBUsers.Find(bson.M{"phone": Phone}).One(&user)
	log.Debug(user)
	refresh("user", err)
	if err != nil {
		user.Id = bson.NewObjectId()
		user.Name = Name
		user.Phone = Phone
		user.CreatedAt = time.Now().Unix()
		err = DBUsers.Insert(user)
	}

	code = helpers.StringWithIntset(5)

	code2 := code
	if config.GetEnv() == "dev" {
		code2 = "00000"
	}

	err = DBUsers.UpdateId(user.Id, bson.M{"$set": bson.M{"code": code2, "os": Os, "version": Version, "device": Device}})
	if err != nil {
		log.Error(err)
	}
	return
}
