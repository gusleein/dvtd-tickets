package web

import (
	"../db"
	"../helpers"
	"github.com/valyala/fasthttp"
	"github.com/valyala/fasthttprouter"
)

func ArticlesList(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
	lu := int(ctx.QueryArgs().GetUintOrZero("lu"))
	log.Debug(lu, string(ctx.Request.Header.Peek("_t")))
	result, err := db.Articles.List(lu)
	if err != nil {
		helpers.OutputJsonMessageResult(ctx, 500, err.Error())
		return
	}
	helpers.OutputJSON(ctx, 200, result)
}

func ArticlesView(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
	link := string(ctx.QueryArgs().Peek("link"))
	log.Debug(link, string(ctx.Request.Header.Peek("_t")))
	result, err := db.Articles.GetByLink(link)
	if err != nil {
		helpers.OutputJsonMessageResult(ctx, 500, err.Error())
		return
	}
	helpers.OutputHTML(ctx, result.Content)
}
