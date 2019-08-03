package web

import (
	"../db"
	"../helpers"
	"github.com/valyala/fasthttp"
	"github.com/valyala/fasthttprouter"
)

func EventSave(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
	event := db.Event{}
	helpers.JsonUnmarshal(string(ctx.Request.Body()), &event)
	log.Debug(event)

	err := event.Save()
	if err != nil {
		log.Error(err)
		helpers.OutputJsonMessageResult(ctx, 500, err.Error())
		return
	}
	helpers.OutputJSON(ctx, 200, event)
}

func EventList(ctx *fasthttp.RequestCtx, _ fasthttprouter.Params) {
	result, err := db.Events.All()
	if err != nil {
		helpers.OutputJsonMessageResult(ctx, 500, err.Error())
		return
	}
	helpers.OutputJSON(ctx, 200, result)
}
