package web

import (
	"../db"
	"../helpers"
	"github.com/valyala/fasthttp"
)

func BooksAll(ctx *fasthttp.RequestCtx, user db.User) {
	lu := int(ctx.QueryArgs().GetUintOrZero("lu"))
	log.Debug(lu, user)
	result, err := db.Books.All(lu)
	if err != nil {
		helpers.OutputJsonMessageResult(ctx, 500, err.Error())
		return
	}
	helpers.OutputJSON(ctx, 200, result)
}

func BooksDelete(ctx *fasthttp.RequestCtx, user db.User) {
	item := db.Book{}
	helpers.JsonUnmarshal(string(ctx.Request.Body()), &item)
	log.Debug(item, user.Id)
	err := item.Delete()
	if err != nil {
		helpers.OutputJsonMessageResult(ctx, 500, err.Error())
		return
	}
	helpers.OutputJSON(ctx, 200, item.Id)
}

func BooksSave(ctx *fasthttp.RequestCtx, user db.User) {
	book := db.Book{}
	helpers.JsonUnmarshal(string(ctx.Request.Body()), &book)
	log.Debug(book, user.Id)
	err := book.Save()
	if err != nil {
		helpers.OutputJsonMessageResult(ctx, 500, "Error on server")
		return
	}
	helpers.OutputJSON(ctx, 200, true)
}
