package web

import (
	"../db"
	"../helpers"
	"github.com/valyala/fasthttp"
)

func ArticlesAll(ctx *fasthttp.RequestCtx, user db.User) {
	lu := int(ctx.QueryArgs().GetUintOrZero("lu"))
	log.Debug(lu, user)
	result, err := db.Articles.All(lu)
	if err != nil {
		helpers.OutputJsonMessageResult(ctx, 500, err.Error())
		return
	}
	helpers.OutputJSON(ctx, 200, result)
}

func ArticlesDelete(ctx *fasthttp.RequestCtx, user db.User) {
	item := db.Article{}
	helpers.JsonUnmarshal(string(ctx.Request.Body()), &item)
	log.Debug(item, user.Id)
	err := item.Delete()
	if err != nil {
		helpers.OutputJsonMessageResult(ctx, 500, err.Error())
		return
	}
	helpers.OutputJSON(ctx, 200, item.Id)
}

func ArticlesSave(ctx *fasthttp.RequestCtx, user db.User) {
	article := db.Article{}
	helpers.JsonUnmarshal(string(ctx.Request.Body()), &article)
	log.Debug(article, user.Id)
	err := article.Save()
	if err != nil {
		helpers.OutputJsonMessageResult(ctx, 500, "Error on server")
		return
	}
	helpers.OutputJSON(ctx, 200, true)
}
