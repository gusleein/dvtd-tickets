/*
-------------------------------------------------------------------------------
@name goS3.go
@version 0.1.0
@copyright 2014 Anthony D. Willis Sr.
@author Anthony D. Willis, Sr.
@license This file is part of software project and it is subject to the license terms in
the LICENSE file found at:

https://882a4c83c3ccb7f5fb5670d3ea4865440f854e4f.googledrive.com/host/0B8KbJJjw2kB0VE92RGpwR0tfRFk/ADWSRLICENSE.htm

No part of this software project, including this file, may be copied, modified,
propagated, or distributed except according to the terms contained in the LICENSE
file

package goS3 is a program that reformats CSV data to JSON
*/
package main

import (
	"fmt"
	"strings"
	"encoding/csv"
	"encoding/json"
)

type User struct {
	Email string `json:"email"`

	Phone      string   `json:"phone"`
	FirstName  string   `json:"firstname"`
	SecondName string   `json:"secondname"`
	LastName   string   `json:"lastname"`
	CardNumber string   `json:"cardnumber"`
	Card       Card     `json:"card"`
	Tickets    []Ticket `json:"tickets"`
	Notes      string   `json:"notes"`
	Vk         string   `json:"vk"`

	Password string `json:"-"`
	Token    string `json:"token"`
	Os       string `json:"os"`
	Version  string `json:"version"`
	Device   string `json:"device"`

	Admin   bool `json:"admin"`
	Seller  bool `json:"seller"`
	Checker bool `json:"checker"`
	Artist  bool `json:"artist"`

	Code        string `json:"-"`
	CreatedAt   int64  `json:"-"`
	ModifyAt    int64  `json:"-"`
	LastVisitAt int64  `json:"-"`
}

type Ticket struct {
	Uid     string `json:"uid"`
	EventId string `json:"eventId"`
	SoldAt  int64  `json:"soldAt"`
	QRLink  string `json:"qrLink"`
	Price   int    `json:"price"`
}

type Card struct {
	Number string `json:"number"`,
	Blocked bool `json:"blocked"`,
	Missed bool `json:"missed"`
}

func main() {
	// create a struct of the sample CSV

	// read all of the records in CSV in to an slice
	userLine, err := csv.NewReader(CsvFile).ReadAll()
	if err != nil {
		log.Fatal(err)
	}

	// create an empty slice to receive the data
	var users []User
	fmt.Println("\nOriginal data in CSV format\n")

	// loop through CSV records, create a slice and append it to slice array
	for i, user := range userLine {
		if i == 0 {
			// skip header line
			continue
		}
		var name, second, last string
		fullName := strings.Split(user[1], " ")
		if len(fullName) > 0 {
			name = fullName[0]
		}
		if len(fullName) == 2 {
			last = fullName[1]
		}
		if len(fullName) > 2 {
			second = fullName[1]
			last = fullName[2]
		}

		p := User{
			CardNumber: user[0],
			FirstName:  name,
			SecondName: second,
			LastName:   last,
			Phone:      user[2],
		}
		fmt.Println(p)
		users = append(users, []User{p}...)
	}

	// use MarshalIndent to reformat slice array as JSON
	res1a, _ := json.MarshalIndent(users, "", "   ")
	fmt.Println("\nOriginal data in JSON format\n")

	// print the reformatted struct as JSON
	fmt.Printf("%s\n", res1a)
}

var CsvFile = strings.NewReader(`Product,Color,Price
Widget 1,blue,$5
Widget 2,red,$10
Widget 3,green,$12
Widget 4,orange,$18
Widget 5,yellow,$25`)
