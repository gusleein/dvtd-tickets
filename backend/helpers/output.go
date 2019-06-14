package helpers

import (
	"encoding/json"
	"fmt"

	"github.com/valyala/fasthttp"
)

type out struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
}

type PagingList struct {
	Total int         `json:"total"`
	List  interface{} `json:"list"`
}

func OutputJsonMessageResult(ctx *fasthttp.RequestCtx, code int, r string) {
	// Write content-type, statuscode, payload
	ctx.Response.Header.Set("Content-Type", "application/json")
	ctx.Response.Header.Set("Access-Control-Allow-Origin", "*")
	ctx.Response.Header.Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	ctx.Response.Header.Set("Access-Control-Allow-Headers", "_t")
	ctx.Response.Header.SetStatusCode(code)
	out := out{code, r}
	jsonResult, _ := json.Marshal(out)
	fmt.Fprint(ctx, string(jsonResult))
	ctx.Response.Header.Set("Connection", "close")
}

func OutputHTML(ctx *fasthttp.RequestCtx, r string) {
	ctx.Response.Header.Set("Content-Type", "text/html; charset=utf-8")
	fmt.Fprint(ctx, r)
	ctx.Response.Header.Set("Connection", "close")
}

func OutputJSON(ctx *fasthttp.RequestCtx, code int, result interface{}) {
	// Marshal provided interface into JSON structure
	jsonResult, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		log.Error(err.Error())
	}
	// Write content-type, statuscode, payload
	ctx.Response.Header.Set("Content-Type", "application/json")
	ctx.Response.Header.Set("Access-Control-Allow-Origin", "*")
	ctx.Response.Header.Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	ctx.Response.Header.Set("Access-Control-Allow-Headers", "_t")
	ctx.Response.SetStatusCode(code)
	fmt.Fprint(ctx, string(jsonResult))
	ctx.Response.Header.Set("Connection", "close")
}

func OutputJsonPagingList(ctx *fasthttp.RequestCtx, code int, total int, list interface{}) {
	// Write content-type, statuscode, payload
	ctx.Response.Header.Set("Content-Type", "application/json")
	ctx.Response.Header.Set("Access-Control-Allow-Origin", "*")
	ctx.Response.Header.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	ctx.Response.Header.Set("Access-Control-Allow-Headers", "_t")
	ctx.Response.Header.SetStatusCode(code)
	out := PagingList{total, list}
	jsonResult, _ := json.Marshal(out)
	fmt.Fprint(ctx, string(jsonResult))
	ctx.Response.Header.Set("Connection", "close")
}
