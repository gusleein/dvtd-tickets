package db

import (
	"errors"
	"time"

	"github.com/AlexeySpiridonov/goapp-config"
	"github.com/satori/go.uuid"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type User struct {
	Id bson.ObjectId `json:"id" bson:"_id,omitempty"`

	Email string `json:"email"`

	Phone      string   `json:"phone"`
	Name       string   `json:"name"`
	LastName   string   `json:"lastName"`
	CardNumber string   `json:"cardNumber"`
	Tickets    []Ticket `json:"tickets"`

	Password string `json:"-"`
	Token    string `json:"token"`
	Os       string `json:"os"`
	Version  string `json:"version"`
	Device   string `json:"device"`

	Admin   bool `json:"admin"`
	Seller  bool `json:"seller"`
	Checker bool `json:"checker"`
	Artist  bool `json:"artist"`

	Code        string `json:"-"`
	CreatedAt   int64  `json:"-"`
	ModifyAt    int64  `json:"-"`
	LastVisitAt int64  `json:"-"`
}

type Ticket struct {
	Uid     string `json:"uid"`
	EventId string `json:"eventId"`
	SoldAt  int64  `json:"soldAt"`
	QRLink  string `json:"qrLink"`
	Price   int    `json:"price"`
}

func (t *Ticket) GetQrCodeUri() string {
	return config.Local.Get("uploadsDir") + "/" + t.Uid + ".png"
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

func (users) All(lu int) (list []User, err error) {
	list = make([]User, 0)
	err = DBUsers.Find(nil).Sort("-_id").All(&list)
	refresh("users", err)
	return
}

func (users) CreateTicket(userId, eventId string, price int) (ticket Ticket, err error) {
	user := User{}
	// если у пользователя сгенерирован qr код на выбранную вечеринку, то отдаем ошибку
	err = DBUsers.Find(bson.M{"_id": bson.ObjectIdHex(userId)}).One(&user)
	defer refresh("users", err)
	if err != nil {
		return
	}
	event := Event{}
	err = DBEvents.Find(bson.M{"_id": bson.ObjectIdHex(eventId)}).One(&event)
	defer refresh("events", err)
	if err != nil {
		return
	}
	// находим билет по id вечеринки
	for _, t := range user.Tickets {
		if t.EventId == eventId {
			if err != nil {
				err = errors.New("Ticket already created")
				return
			}
		}
	}

	// иначе создаем создаем qr код
	uid, _ := uuid.NewV4()
	ticket.EventId = eventId
	ticket.Uid = uid.String()
	ticket.SoldAt = time.Now().Unix()
	ticket.QRLink = config.Local.Get("uploads") + "/" + ticket.Uid + ".png"
	ticket.Price = event.Price

	user.Tickets = append(user.Tickets, ticket)
	// todo: добавить транзакцию если продажа билета происходит

	err = DBUsers.UpdateId(user.Id, bson.M{"$set": bson.M{"tickets": user.Tickets}})
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

func (users) Auth(Phone, Password, Os, Version, Device string) (code string, err error) {
	if len(Phone) < 5 {
		err = errors.New("Empty phone")
		log.Error(err)
		return
	}
	if len(Password) < 1 {
		err = errors.New("Empty password")
		log.Error(err)
		return
	}
	user := User{}
	err = DBUsers.Find(bson.M{"phone": Phone}).One(&user)
	log.Debug(user)
	refresh("user", err)

	if err != nil {
		// иначе создаем нового
		user.Id = bson.NewObjectId()
		user.Phone = Phone
		user.Password = Password
		user.CreatedAt = time.Now().Unix()
		err = DBUsers.Insert(user)
	}
	err = errors.New(user.Password + "Неверный логин или пароль" + Password)
	return

	// найден пользователь, проверяем пароль
	// if user.Password != Password {
	// 	log.Error(err)
	// 	return
	// }
	//
	// code = helpers.StringWithIntset(5)
	//
	// code2 := code
	// if config.GetEnv() == "dev" {
	// 	code2 = "00000"
	// }
	//
	// err = DBUsers.UpdateId(user.Id, bson.M{"$set": bson.M{"code": code2, "os": Os, "version": Version, "device": Device}})
	// if err != nil {
	// 	log.Error(err)
	// }
	// return
}
