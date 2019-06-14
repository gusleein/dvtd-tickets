package helpers

import (
	"encoding/json"
	"github.com/op/go-logging"
)

var (
	log = logging.MustGetLogger("helpers")
)

func JsonMarshal(v interface{}) string {
	result, err := json.Marshal(v)
	if err != nil {
		log.Error("Error marshal json : ", err)
	}
	return string(result)
}

func JsonUnmarshal(data string, v interface{}) error {
	err := json.Unmarshal([]byte(data), &v)
	if err != nil {
		log.Error("Error unmarshal json : ", err)
		return err
	}
	return nil
}
