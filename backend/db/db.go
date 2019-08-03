package db

import (
	"strings"
	"time"

	"github.com/AlexeySpiridonov/goapp-config"
	"github.com/op/go-logging"
	"gopkg.in/mgo.v2"
)

type (
	users  struct{}
	books  struct{}
	events struct{}
)

var (
	log = logging.MustGetLogger("db")
	Db  *mgo.Session

	DBUsers, DBBooks, DBEvents *mgo.Collection

	Users  users
	Books  books
	Events events
)

func init() {
	log.Info("Connect to DB: " + config.Local.Get("dbHost") + " " + config.Local.Get("dbName"))
	mongo, err := mgo.Dial(config.Local.Get("dbHost"))
	if err != nil {
		log.Panic(err.Error())
	}
	log.Info("DB ok")
	mongo.SetMode(mgo.Monotonic, true)
	mongo.SetSafe(nil)
	mongo.Fsync(false)

	Db := mongo.DB(config.Local.Get("dbName"))

	// set collections
	DBUsers = Db.C("users")
	DBBooks = Db.C("books")
	DBEvents = Db.C("events")

}

func Close() {
	Db.Close()
}

func refresh(source string, err error) {
	if err == nil {
		return
	}

	if err.Error() == "not found" {
		log.Noticef("%s %s", source, err.Error())
	}

	if strings.Contains(err.Error(), "timeout") {
		log.Warning("DB refresh by timeout", source, err)
		Db.Refresh()
	}

	if strings.Contains(err.Error(), "connection reset by peer") {
		log.Warning("DB refresh by reset by peer", source, err)
		Db.Refresh()
	}

	if err.Error() == "EOF" {
		log.Warning("DB refresh by EOF", source, err)
		Db.Refresh()
	}
}

func getTimestamp() int {
	return int(time.Now().Unix())
}
