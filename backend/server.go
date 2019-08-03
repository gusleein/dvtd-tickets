package main

import (
	"fmt"
	"os"
	"runtime"

	"./web"
	"github.com/AlexeySpiridonov/goapp-config"
	"github.com/op/go-logging"
	"github.com/valyala/fasthttp"
	"github.com/valyala/fasthttprouter"
)

var log = logging.MustGetLogger("main")

func main() {

	// run file server for admin web
	aw := fasthttprouter.New()
	aw.GET("/*path", index)

	adminFileServer := &fasthttp.Server{
		Handler:            aw.Handler,
		MaxRequestBodySize: 100 * 1024 * 1024,
	}
	go adminFileServer.ListenAndServe(config.Local.Get("frontFileHost"))

	// run http api server
	r := fasthttprouter.New()

	r.OPTIONS("/*path", options)

	r.POST("/user/auth", web.UserAuth)

	r.POST("/user/confirm", web.UserConfirm)

	r.POST("/user/save", web.Auth(web.UserSave))

	r.GET("/user/list", web.UserList)

	r.GET("/books/list", web.BooksList)

	r.GET("/books/all", web.Auth(web.BooksAll))

	r.GET("/books/view", web.BooksView)

	r.GET("/qr/create", web.QRCreate)

	// admin
	r.POST("/books/save", web.Admin(web.BooksSave))

	r.POST("/books/delete", web.Admin(web.BooksDelete))

	log.Info("Run HTTP server on " + config.Local.Get("serverHost"))
	server := &fasthttp.Server{
		Handler:            r.Handler,
		MaxRequestBodySize: 100 * 1024 * 1024,
	}
	log.Fatal(server.ListenAndServe(config.Local.Get("serverHost")))
}

// переадрасация на index.html
func index(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
	uri := string(ctx.RequestURI())

	// проверяем папку с приложением
	filePath := config.Local.Get("frontDir") + uri
	if _, err := os.Stat(filePath); err == nil && uri != "/" {
		fasthttp.ServeFile(ctx, filePath)
		return
	}

	fasthttp.ServeFile(ctx, config.Local.Get("frontDir")+"/index.html")
}

func options(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
	ctx.Response.Header.Set("Access-Control-Allow-Origin", "*")
	ctx.Response.Header.Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	ctx.Response.Header.Set("Access-Control-Allow-Headers", "origin, content-type, accept, _t")
	ctx.Response.SetStatusCode(200)
	fmt.Fprint(ctx, "{status : 'ok'}")
}

func init() {
	format := logging.MustStringFormatter("MGR.%{module}.%{shortfile}.%{shortfunc}() > %{level:.8s} : %{message}")
	// file to stdout
	log1 := logging.NewLogBackend(os.Stderr, "", 0)
	log1F := logging.NewBackendFormatter(log1, format)

	// log to syslog
	log3, _ := logging.NewSyslogBackend("")
	log3LeveledF := logging.NewBackendFormatter(log3, format)

	// setup logs
	if config.GetEnv() == "prod" {
		log3Leveled := logging.AddModuleLevel(log3LeveledF)
		log3Leveled.SetLevel(logging.INFO, "")
		logging.SetBackend(log3Leveled)
	} else {
		logging.SetBackend(log1F, log3LeveledF)
	}

	log.Info("Logs ok")

	log.Info("GOMAXPROCS: ", runtime.GOMAXPROCS(0))

}
