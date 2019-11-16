let events = [
  {
    "id": "5d44e3d63f096b506d5016da",
    "title": "СВЕТ | 31052019 |",
    "price": 700.0,
    "date": 1559260800,
    "createdat": 1564816690,
    "modifyat": 1564816690,
  },
  {
    "id": "5d44e46d3f096b506d5016db",
    "title": "DVTD | 2 YEARS",
    "price": 500.0,
    "date": 1551398400,
    "createdat": 1564816717,
    "modifyat": 1564816717,
  },
  {
    "id": "5d44e4ad3f096b506d5016dc",
    "title": "FABULA | Ночь аудиовизуального наследия",
    "price": 1000.0,
    "date": 1540512000,
    "createdat": 1564816745,
    "modifyat": 1564816745,
  },
  {
    "id": "5d44e58e3f096b506d5016dd",
    "title": "SCULPTURA [ACT2] 24/11/17",
    "price": 600.0,
    "date": 1511481600,
    "createdat": 1564816767,
    "modifyat": 1564816767,
  },
  {
    "id": "5d44e7243f096b506d5016de",
    "title": "SCULPTURA [ACT1] 29/09/17",
    "price": 500.0,
    "date": 1506643200,
    "createdat": 1564816788,
    "modifyat": 1564816788,
  },
  {
    "id": "5d452b003f096b569a578c79",
    "title": "DVTD | CAMP | 26-28/07/2019",
    "price": 900,
    "date": 1564099200, // deprecated

    "location": "55.027026, 82.93327",
    "startdate": "26/07/2019", // дата string
    "enddate": "28/07/2019", // дата string
    "starttime": "18:00", // время открытия
    "endtime": "14:00", // время закрытия
    // информация по трансферам (по рейсам)
    "transfers": [
      // массивом перечисляем все рейсы
      {
        "startlocation": "пл. Ленина, 'Аркада'",
        "destination": "55.027026, 82.93327",
        "startdate": "26/07/2019",
        "startime": "19:00",
        "carnumber": "А560ЕУ54",
        "seatscount": 20,
        "model": "Citroen Bus",
        "price": 2300,
        "ticketprice": 300,
        // компания, предоставляющая услуги перевозок
        "company":
          "individual" ||
          {
            // точное указание юр. низвания компании не требуется
            // все эти поля заполняем сами в произвольной форме
            "name": "ООО Вечное сияние",
            "address": "-----",
            "contacts": [
              "+79254436749",
              "+79254436955",
              "vechnoesianie43@mail.ru",
              "https://vk.com/vechnoesianie",
              "https://instagram.com/vechnoesianie",
            ],
          },
        // если водитель впиывается самостоятельно без компании,
        // то указываем
        // "company": "individual"
        "driver": {
          "name": "Виктор Михайлович Родригизе",
          "phones": [
            "+79137765488"
          ]
        },
      },
    ],
    "createdat": 1565108846,
    "modifyat": 1565108846,
  }
];