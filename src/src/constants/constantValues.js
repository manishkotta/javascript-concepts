import * as Date from '../lib/date-conversion';

export const timezoneList = [
	{
		"value": "Dateline Standard Time",
		"label": "(UTC-12:00) International Date Line West",
		"tz": -12,
		"hasDST": false
	},
	{
		"value": "UTC-11",
		"label": "(UTC-11:00) Coordinated Universal Time-11",
		"tz": -11,
		"hasDST": false
	},
	{
		"value": "Aleutian Standard Time",
		"label": "(UTC-10:00) Aleutian Islands",
		"tz": -10,
		"hasDST": true
	},
	{
		"value": "Hawaiian Standard Time",
		"label": "(UTC-10:00) Hawaii",
		"tz": -10,
		"hasDST": false
	},
	{
		"value": "Marquesas Standard Time",
		"label": "(UTC-09:30) Marquesas Islands",
		"tz": -9,
		"hasDST": false
	},
	{
		"value": "Alaskan Standard Time",
		"label": "(UTC-09:00) Alaska",
		"tz": -9,
		"hasDST": true
	},
	{
		"value": "UTC-09",
		"label": "(UTC-09:00) Coordinated Universal Time-09",
		"tz": -9,
		"hasDST": false
	},
	{
		"value": "Pacific Standard Time (Mexico)",
		"label": "(UTC-08:00) Baja California",
		"tz": -8,
		"hasDST": true
	},
	{
		"value": "UTC-08",
		"label": "(UTC-08:00) Coordinated Universal Time-08",
		"tz": -8,
		"hasDST": false
	},
	{
		"value": "Pacific Standard Time",
		"label": "(UTC-08:00) Pacific Time (US & Canada)",
		"tz": -8,
		"hasDST": true
	},
	{
		"value": "US Mountain Standard Time",
		"label": "(UTC-07:00) Arizona",
		"tz": -7,
		"hasDST": false
	},
	{
		"value": "Mountain Standard Time (Mexico)",
		"label": "(UTC-07:00) Chihuahua, La Paz, Mazatlan",
		"tz": -7,
		"hasDST": true
	},
	{
		"value": "Mountain Standard Time",
		"label": "(UTC-07:00) Mountain Time (US & Canada)",
		"tz": -7,
		"hasDST": true
	},
	{
		"value": "Central America Standard Time",
		"label": "(UTC-06:00) Central America",
		"tz": -6,
		"hasDST": false
	},
	{
		"value": "Central Standard Time",
		"label": "(UTC-06:00) Central Time (US & Canada)",
		"tz": -6,
		"hasDST": true
	},
	{
		"value": "Easter Island Standard Time",
		"label": "(UTC-06:00) Easter Island",
		"tz": -6,
		"hasDST": true
	},
	{
		"value": "Central Standard Time (Mexico)",
		"label": "(UTC-06:00) Guadalajara, Mexico City, Monterrey",
		"tz": -6,
		"hasDST": true
	},
	{
		"value": "Canada Central Standard Time",
		"label": "(UTC-06:00) Saskatchewan",
		"tz": -6,
		"hasDST": false
	},
	{
		"value": "SA Pacific Standard Time",
		"label": "(UTC-05:00) Bogota, Lima, Quito, Rio Branco",
		"tz": -5,
		"hasDST": false
	},
	{
		"value": "Eastern Standard Time (Mexico)",
		"label": "(UTC-05:00) Chetumal",
		"tz": -5,
		"hasDST": true
	},
	{
		"value": "Eastern Standard Time",
		"label": "(UTC-05:00) Eastern Time (US & Canada)",
		"tz": -5,
		"hasDST": true
	},
	{
		"value": "Haiti Standard Time",
		"label": "(UTC-05:00) Haiti",
		"tz": -5,
		"hasDST": true
	},
	{
		"value": "Cuba Standard Time",
		"label": "(UTC-05:00) Havana",
		"tz": -5,
		"hasDST": true
	},
	{
		"value": "US Eastern Standard Time",
		"label": "(UTC-05:00) Indiana (East)",
		"tz": -5,
		"hasDST": true
	},
	{
		"value": "Paraguay Standard Time",
		"label": "(UTC-04:00) Asuncion",
		"tz": -4,
		"hasDST": true
	},
	{
		"value": "Atlantic Standard Time",
		"label": "(UTC-04:00) Atlantic Time (Canada)",
		"tz": -4,
		"hasDST": true
	},
	{
		"value": "Venezuela Standard Time",
		"label": "(UTC-04:00) Caracas",
		"tz": -4,
		"hasDST": true
	},
	{
		"value": "Central Brazilian Standard Time",
		"label": "(UTC-04:00) Cuiaba",
		"tz": -4,
		"hasDST": true
	},
	{
		"value": "SA Western Standard Time",
		"label": "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan",
		"tz": -4,
		"hasDST": false
	},
	{
		"value": "Pacific SA Standard Time",
		"label": "(UTC-04:00) Santiago",
		"tz": -4,
		"hasDST": true
	},
	{
		"value": "Turks And Caicos Standard Time",
		"label": "(UTC-04:00) Turks and Caicos",
		"tz": -4,
		"hasDST": true
	},
	{
		"value": "Newfoundland Standard Time",
		"label": "(UTC-03:30) Newfoundland",
		"tz": -3,
		"hasDST": true
	},
	{
		"value": "Tocantins Standard Time",
		"label": "(UTC-03:00) Araguaina",
		"tz": -3,
		"hasDST": true
	},
	{
		"value": "E. South America Standard Time",
		"label": "(UTC-03:00) Brasilia",
		"tz": -3,
		"hasDST": true
	},
	{
		"value": "SA Eastern Standard Time",
		"label": "(UTC-03:00) Cayenne, Fortaleza",
		"tz": -3,
		"hasDST": false
	},
	{
		"value": "Argentina Standard Time",
		"label": "(UTC-03:00) City of Buenos Aires",
		"tz": -3,
		"hasDST": true
	},
	{
		"value": "Greenland Standard Time",
		"label": "(UTC-03:00) Greenland",
		"tz": -3,
		"hasDST": true
	},
	{
		"value": "Montevideo Standard Time",
		"label": "(UTC-03:00) Montevideo",
		"tz": -3,
		"hasDST": true
	},
	{
		"value": "Magallanes Standard Time",
		"label": "(UTC-03:00) Punta Arenas",
		"tz": -3,
		"hasDST": true
	},
	{
		"value": "Saint Pierre Standard Time",
		"label": "(UTC-03:00) Saint Pierre and Miquelon",
		"tz": -3,
		"hasDST": true
	},
	{
		"value": "Bahia Standard Time",
		"label": "(UTC-03:00) Salvador",
		"tz": -3,
		"hasDST": true
	},
	{
		"value": "UTC-02",
		"label": "(UTC-02:00) Coordinated Universal Time-02",
		"tz": -2,
		"hasDST": false
	},
	{
		"value": "Mid-Atlantic Standard Time",
		"label": "(UTC-02:00) Mid-Atlantic - Old",
		"tz": -2,
		"hasDST": true
	},
	{
		"value": "Azores Standard Time",
		"label": "(UTC-01:00) Azores",
		"tz": -1,
		"hasDST": true
	},
	{
		"value": "Cape Verde Standard Time",
		"label": "(UTC-01:00) Cabo Verde Is.",
		"tz": -1,
		"hasDST": false
	},
	{
		"value": "UTC",
		"label": "(UTC) Coordinated Universal Time",
		"tz": 0,
		"hasDST": false
	},
	{
		"value": "Morocco Standard Time",
		"label": "(UTC+00:00) Casablanca",
		"tz": 0,
		"hasDST": true
	},
	{
		"value": "GMT Standard Time",
		"label": "(UTC+00:00) Dublin, Edinburgh, Lisbon, London",
		"tz": 0,
		"hasDST": true
	},
	{
		"value": "Greenwich Standard Time",
		"label": "(UTC+00:00) Monrovia, Reykjavik",
		"tz": 0,
		"hasDST": false
	},
	{
		"value": "W. Europe Standard Time",
		"label": "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
		"tz": 1,
		"hasDST": true
	},
	{
		"value": "Central Europe Standard Time",
		"label": "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
		"tz": 1,
		"hasDST": true
	},
	{
		"value": "Romance Standard Time",
		"label": "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris",
		"tz": 1,
		"hasDST": true
	},
	{
		"value": "Central European Standard Time",
		"label": "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb",
		"tz": 1,
		"hasDST": true
	},
	{
		"value": "W. Central Africa Standard Time",
		"label": "(UTC+01:00) West Central Africa",
		"tz": 1,
		"hasDST": false
	},
	{
		"value": "Namibia Standard Time",
		"label": "(UTC+01:00) Windhoek",
		"tz": 1,
		"hasDST": true
	},
	{
		"value": "Jordan Standard Time",
		"label": "(UTC+02:00) Amman",
		"tz": 2,
		"hasDST": true
	},
	{
		"value": "GTB Standard Time",
		"label": "(UTC+02:00) Athens, Bucharest",
		"tz": 2,
		"hasDST": true
	},
	{
		"value": "Middle East Standard Time",
		"label": "(UTC+02:00) Beirut",
		"tz": 2,
		"hasDST": true
	},
	{
		"value": "Egypt Standard Time",
		"label": "(UTC+02:00) Cairo",
		"tz": 2,
		"hasDST": true
	},
	{
		"value": "E. Europe Standard Time",
		"label": "(UTC+02:00) Chisinau",
		"tz": 2,
		"hasDST": true
	},
	{
		"value": "Syria Standard Time",
		"label": "(UTC+02:00) Damascus",
		"tz": 2,
		"hasDST": true
	},
	{
		"value": "West Bank Standard Time",
		"label": "(UTC+02:00) Gaza, Hebron",
		"tz": 2,
		"hasDST": true
	},
	{
		"value": "South Africa Standard Time",
		"label": "(UTC+02:00) Harare, Pretoria",
		"tz": 2,
		"hasDST": false
	},
	{
		"value": "FLE Standard Time",
		"label": "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
		"tz": 2,
		"hasDST": true
	},
	{
		"value": "Israel Standard Time",
		"label": "(UTC+02:00) Jerusalem",
		"tz": 2,
		"hasDST": true
	},
	{
		"value": "Kaliningrad Standard Time",
		"label": "(UTC+02:00) Kaliningrad",
		"tz": 2,
		"hasDST": true
	},
	{
		"value": "Libya Standard Time",
		"label": "(UTC+02:00) Tripoli",
		"tz": 2,
		"hasDST": true
	},
	{
		"value": "Arabic Standard Time",
		"label": "(UTC+03:00) Baghdad",
		"tz": 3,
		"hasDST": true
	},
	{
		"value": "Turkey Standard Time",
		"label": "(UTC+03:00) Istanbul",
		"tz": 3,
		"hasDST": true
	},
	{
		"value": "Arab Standard Time",
		"label": "(UTC+03:00) Kuwait, Riyadh",
		"tz": 3,
		"hasDST": false
	},
	{
		"value": "Belarus Standard Time",
		"label": "(UTC+03:00) Minsk",
		"tz": 3,
		"hasDST": true
	},
	{
		"value": "Russian Standard Time",
		"label": "(UTC+03:00) Moscow, St. Petersburg, Volgograd",
		"tz": 3,
		"hasDST": true
	},
	{
		"value": "E. Africa Standard Time",
		"label": "(UTC+03:00) Nairobi",
		"tz": 3,
		"hasDST": false
	},
	{
		"value": "Iran Standard Time",
		"label": "(UTC+03:30) Tehran",
		"tz": 3,
		"hasDST": true
	},
	{
		"value": "Arabian Standard Time",
		"label": "(UTC+04:00) Abu Dhabi, Muscat",
		"tz": 4,
		"hasDST": false
	},
	{
		"value": "Astrakhan Standard Time",
		"label": "(UTC+04:00) Astrakhan, Ulyanovsk",
		"tz": 4,
		"hasDST": true
	},
	{
		"value": "Azerbaijan Standard Time",
		"label": "(UTC+04:00) Baku",
		"tz": 4,
		"hasDST": true
	},
	{
		"value": "Russia Time Zone 3",
		"label": "(UTC+04:00) Izhevsk, Samara",
		"tz": 4,
		"hasDST": true
	},
	{
		"value": "Mauritius Standard Time",
		"label": "(UTC+04:00) Port Louis",
		"tz": 4,
		"hasDST": true
	},
	{
		"value": "Saratov Standard Time",
		"label": "(UTC+04:00) Saratov",
		"tz": 4,
		"hasDST": true
	},
	{
		"value": "Georgian Standard Time",
		"label": "(UTC+04:00) Tbilisi",
		"tz": 4,
		"hasDST": false
	},
	{
		"value": "Caucasus Standard Time",
		"label": "(UTC+04:00) Yerevan",
		"tz": 4,
		"hasDST": true
	},
	{
		"value": "Afghanistan Standard Time",
		"label": "(UTC+04:30) Kabul",
		"tz": 4,
		"hasDST": false
	},
	{
		"value": "West Asia Standard Time",
		"label": "(UTC+05:00) Ashgabat, Tashkent",
		"tz": 5,
		"hasDST": false
	},
	{
		"value": "Ekaterinburg Standard Time",
		"label": "(UTC+05:00) Ekaterinburg",
		"tz": 5,
		"hasDST": true
	},
	{
		"value": "Pakistan Standard Time",
		"label": "(UTC+05:00) Islamabad, Karachi",
		"tz": 5,
		"hasDST": true
	},
	{
		"value": "India Standard Time",
		"label": "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
		"tz": 5.5,
		"hasDST": false
	},
	{
		"value": "Sri Lanka Standard Time",
		"label": "(UTC+05:30) Sri Jayawardenepura",
		"tz": 5,
		"hasDST": false
	},
	{
		"value": "Nepal Standard Time",
		"label": "(UTC+05:45) Kathmandu",
		"tz": 5,
		"hasDST": false
	},
	{
		"value": "Central Asia Standard Time",
		"label": "(UTC+06:00) Astana",
		"tz": 6,
		"hasDST": false
	},
	{
		"value": "Bangladesh Standard Time",
		"label": "(UTC+06:00) Dhaka",
		"tz": 6,
		"hasDST": true
	},
	{
		"value": "Omsk Standard Time",
		"label": "(UTC+06:00) Omsk",
		"tz": 6,
		"hasDST": true
	},
	{
		"value": "Myanmar Standard Time",
		"label": "(UTC+06:30) Yangon (Rangoon)",
		"tz": 6,
		"hasDST": false
	},
	{
		"value": "SE Asia Standard Time",
		"label": "(UTC+07:00) Bangkok, Hanoi, Jakarta",
		"tz": 7,
		"hasDST": false
	},
	{
		"value": "Altai Standard Time",
		"label": "(UTC+07:00) Barnaul, Gorno-Altaysk",
		"tz": 7,
		"hasDST": true
	},
	{
		"value": "W. Mongolia Standard Time",
		"label": "(UTC+07:00) Hovd",
		"tz": 7,
		"hasDST": true
	},
	{
		"value": "North Asia Standard Time",
		"label": "(UTC+07:00) Krasnoyarsk",
		"tz": 7,
		"hasDST": true
	},
	{
		"value": "N. Central Asia Standard Time",
		"label": "(UTC+07:00) Novosibirsk",
		"tz": 7,
		"hasDST": true
	},
	{
		"value": "Tomsk Standard Time",
		"label": "(UTC+07:00) Tomsk",
		"tz": 7,
		"hasDST": true
	},
	{
		"value": "China Standard Time",
		"label": "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
		"tz": 8,
		"hasDST": false
	},
	{
		"value": "North Asia East Standard Time",
		"label": "(UTC+08:00) Irkutsk",
		"tz": 8,
		"hasDST": true
	},
	{
		"value": "Singapore Standard Time",
		"label": "(UTC+08:00) Kuala Lumpur, Singapore",
		"tz": 8,
		"hasDST": false
	},
	{
		"value": "W. Australia Standard Time",
		"label": "(UTC+08:00) Perth",
		"tz": 8,
		"hasDST": true
	},
	{
		"value": "Taipei Standard Time",
		"label": "(UTC+08:00) Taipei",
		"tz": 8,
		"hasDST": false
	},
	{
		"value": "Ulaanbaatar Standard Time",
		"label": "(UTC+08:00) Ulaanbaatar",
		"tz": 8,
		"hasDST": true
	},
	{
		"value": "North Korea Standard Time",
		"label": "(UTC+08:30) Pyongyang",
		"tz": 8,
		"hasDST": true
	},
	{
		"value": "Aus Central W. Standard Time",
		"label": "(UTC+08:45) Eucla",
		"tz": 8,
		"hasDST": false
	},
	{
		"value": "Transbaikal Standard Time",
		"label": "(UTC+09:00) Chita",
		"tz": 9,
		"hasDST": true
	},
	{
		"value": "Tokyo Standard Time",
		"label": "(UTC+09:00) Osaka, Sapporo, Tokyo",
		"tz": 9,
		"hasDST": false
	},
	{
		"value": "Korea Standard Time",
		"label": "(UTC+09:00) Seoul",
		"tz": 9,
		"hasDST": false
	},
	{
		"value": "Yakutsk Standard Time",
		"label": "(UTC+09:00) Yakutsk",
		"tz": 9,
		"hasDST": true
	},
	{
		"value": "Cen. Australia Standard Time",
		"label": "(UTC+09:30) Adelaide",
		"tz": 9,
		"hasDST": true
	},
	{
		"value": "AUS Central Standard Time",
		"label": "(UTC+09:30) Darwin",
		"tz": 9,
		"hasDST": false
	},
	{
		"value": "E. Australia Standard Time",
		"label": "(UTC+10:00) Brisbane",
		"tz": 10,
		"hasDST": false
	},
	{
		"value": "AUS Eastern Standard Time",
		"label": "(UTC+10:00) Canberra, Melbourne, Sydney",
		"tz": 10,
		"hasDST": true
	},
	{
		"value": "West Pacific Standard Time",
		"label": "(UTC+10:00) Guam, Port Moresby",
		"tz": 10,
		"hasDST": false
	},
	{
		"value": "Tasmania Standard Time",
		"label": "(UTC+10:00) Hobart",
		"tz": 10,
		"hasDST": true
	},
	{
		"value": "Vladivostok Standard Time",
		"label": "(UTC+10:00) Vladivostok",
		"tz": 10,
		"hasDST": true
	},
	{
		"value": "Lord Howe Standard Time",
		"label": "(UTC+10:30) Lord Howe Island",
		"tz": 10,
		"hasDST": true
	},
	{
		"value": "Bougainville Standard Time",
		"label": "(UTC+11:00) Bougainville Island",
		"tz": 11,
		"hasDST": true
	},
	{
		"value": "Russia Time Zone 10",
		"label": "(UTC+11:00) Chokurdakh",
		"tz": 11,
		"hasDST": true
	},
	{
		"value": "Magadan Standard Time",
		"label": "(UTC+11:00) Magadan",
		"tz": 11,
		"hasDST": true
	},
	{
		"value": "Norfolk Standard Time",
		"label": "(UTC+11:00) Norfolk Island",
		"tz": 11,
		"hasDST": true
	},
	{
		"value": "Sakhalin Standard Time",
		"label": "(UTC+11:00) Sakhalin",
		"tz": 11,
		"hasDST": true
	},
	{
		"value": "Central Pacific Standard Time",
		"label": "(UTC+11:00) Solomon Is., New Caledonia",
		"tz": 11,
		"hasDST": false
	},
	{
		"value": "Russia Time Zone 11",
		"label": "(UTC+12:00) Anadyr, Petropavlovsk-Kamchatsky",
		"tz": 12,
		"hasDST": true
	},
	{
		"value": "New Zealand Standard Time",
		"label": "(UTC+12:00) Auckland, Wellington",
		"tz": 12,
		"hasDST": true
	},
	{
		"value": "UTC+12",
		"label": "(UTC+12:00) Coordinated Universal Time+12",
		"tz": 12,
		"hasDST": false
	},
	{
		"value": "Fiji Standard Time",
		"label": "(UTC+12:00) Fiji",
		"tz": 12,
		"hasDST": true
	},
	{
		"value": "Kamchatka Standard Time",
		"label": "(UTC+12:00) Petropavlovsk-Kamchatsky - Old",
		"tz": 12,
		"hasDST": true
	},
	{
		"value": "Chatham Islands Standard Time",
		"label": "(UTC+12:45) Chatham Islands",
		"tz": 12,
		"hasDST": true
	},
	{
		"value": "UTC+13",
		"label": "(UTC+13:00) Coordinated Universal Time+13",
		"tz": 13,
		"hasDST": false
	},
	{
		"value": "Tonga Standard Time",
		"label": "(UTC+13:00) Nuku'alofa",
		"tz": 13,
		"hasDST": true
	},
	{
		"value": "Samoa Standard Time",
		"label": "(UTC+13:00) Samoa",
		"tz": 13,
		"hasDST": true
	},
	{
		"value": "Line Islands Standard Time",
		"label": "(UTC+14:00) Kiritimati Island",
		"tz": 14,
		"hasDST": false
	}
];
export const hoursFormat = [
	{
		id: 1,
		value: 1,
		label: "24 Hours"
	},
	{
		id: 2,
		value: 2,
		label: "12 Hours"
	}
];
export const timeFormat = [
	{
		id: 1,
		value: 1,
		label: "HH:MM:SS"
	},
	{
		id: 2,
		value: 2,
		label: "HH:MM"
	}
];
export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// export const NumericTypes = ["tinyint", "smallint", "mediumint", "int", "bigint", "float", "double", "decimal"];
export const NumericTypes = ["uint", "int16", "short", "int32", "int", "int64", "long", "float", "double", "decimal"];

export const DateTypes = ["Date", "DateTime"];

export const dateFormats = [
	{
		id: 1,
		value: 1,
		label: "long(" + Date.getLongDate() + ")",
		type: "long"
	},
	{
		id: 2,
		value: 2,
		label: "short(MM/dd/yyyy)",
		type: "MMddyyyy"
	},
	{
		id: 3,
		value: 3,
		label: "short(dd/MM/yyyy)",
		type: "ddMMyyyy"
	}
];

export const USER_LOGOUT = "USER_LOGOUT"
