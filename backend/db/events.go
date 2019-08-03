package db

import (
	"gopkg.in/mgo.v2/bson"
	"time"
)

type Event struct {
	Id        bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Title     string        `json:"title"`
	Price     float64       `json:"price"`
	Date      int64         `json:"date"`
	CreatedAt int64         `json:"createdAt"`
	ModifyAt  int64         `json:"modifyAt"`
}

func (events) All() (list []Event, err error) {
	list = make([]Event, 0)
	err = DBEvents.Find(nil).Sort("-_id").All(&list)
	refresh("events", err)
	return
}

func (o Event) Save() (err error) {
	o.ModifyAt = time.Now().Unix()
	if len(o.Id) == 0 {
		o.Id = bson.NewObjectId()
	}

	if o.CreatedAt == 0 {
		o.CreatedAt = time.Now().Unix()
	}

	_, err = DBEvents.UpsertId(o.Id, o)
	refresh("events", err)
	return
}

func (o Event) Delete() (err error) {
	defer refresh("events", err)
	err = DBEvents.RemoveId(o.Id)
	return
}
