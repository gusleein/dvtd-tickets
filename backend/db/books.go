package db

import (
	"time"

	"gopkg.in/mgo.v2/bson"
	_ "gopkg.in/mgo.v2/bson"
)

type Book struct {
	Id        bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Link      string        `json:"link"`
	Title     string        `json:"title"`
	Content   string        `json:"content"`
	Section   string        `json:"section"`
	Show      bool          `json:"show"`
	CreatedAt int64         `json:"createdAt"`
	ModifyAt  int64         `json:"modifyAt"`
}

func (books) All(lu int) (list []Book, err error) {
	list = make([]Book, 0)
	err = DBBooks.Find(nil).Sort("-show", "-_id").All(&list)
	refresh("books", err)
	return
}

func (books) List(lu int) (list []Book, err error) {
	list = make([]Book, 0)
	query := bson.M{"modtime": bson.M{"$gt": lu}, "show": true}
	err = DBBooks.Find(query).Sort("-_id").All(&list)
	refresh("books", err)
	return
}

func (books) GetByLink(link string) (book Book, err error) {
	err = DBBooks.Find(bson.M{"link": link}).One(&book)
	refresh("book", err)
	return
}

func (o Book) Save() (err error) {
	o.ModifyAt = time.Now().Unix()
	if len(o.Id) == 0 {
		o.Id = bson.NewObjectId()
	}

	//защищаем от дублирования линка
	//TODO не работает!
	/*
		c := Book{}
		cerr := DBBooks.Find(bson.M{"link": o.Link}).One(&c)
		if cerr == nil && c.Id != o.Id{
				o.Link = o.Id.Hex()
		}
	*/

	_, err = DBBooks.UpsertId(o.Id, o)
	refresh("books", err)
	return
}

func (o Book) Delete() (err error) {
	defer refresh("books", err)
	err = DBBooks.RemoveId(o.Id)
	return
}
