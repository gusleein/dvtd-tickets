package db

import (
	"time"

	"gopkg.in/mgo.v2/bson"
	_ "gopkg.in/mgo.v2/bson"
)

type Article struct {
	Id       bson.ObjectId `json:"id" bson:"_id,omitempty"`
	DateTime int64         `json:"dateTime"`
	ModTime  int64         `json:"modTime"`
	Link     string        `json:"link"`
	Title    string        `json:"title"`
	Content  string        `json:"content"`
	Section  string        `json:"section"`
	Show     bool          `json:"show"`
}

func (articles) All(lu int) (list []Article, err error) {
	list = make([]Article, 0)
	err = DBArticles.Find(nil).Sort("-show", "-_id").All(&list)
	refresh("articles", err)
	return
}

func (articles) List(lu int) (list []Article, err error) {
	list = make([]Article, 0)
	query := bson.M{"modtime": bson.M{"$gt": lu}, "show": true}
	err = DBArticles.Find(query).Sort("-_id").All(&list)
	refresh("articles", err)
	return
}

func (articles) GetByLink(link string) (article Article, err error) {
	err = DBArticles.Find(bson.M{"link": link}).One(&article)
	refresh("article", err)
	return
}

func (o Article) Save() (err error) {
	o.ModTime = time.Now().Unix()
	if len(o.Id) == 0 {
		o.Id = bson.NewObjectId()
	}

	//защищаем от дублирования линка
	//TODO не работает!
	/*
		c := Article{}
		cerr := DBArticles.Find(bson.M{"link": o.Link}).One(&c)
		if cerr == nil && c.Id != o.Id{
				o.Link = o.Id.Hex()
		}
	*/

	_, err = DBArticles.UpsertId(o.Id, o)
	refresh("articles", err)
	return
}

func (o Article) Delete() (err error) {
	defer refresh("articles", err)
	err = DBArticles.RemoveId(o.Id)
	return
}
