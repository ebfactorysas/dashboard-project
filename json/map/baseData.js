
baseData = [
	{
		"json_featuretype" : "Sheet1",
		"Product_Name" : "publication1",
		"Publication_Date" : "20171201",
		"Product_Type" : "Publications",
		"Department" : "SCL",
		"Material_Type" : "MaterialA",
		"Download_Date" : "20171202",
		"Metric" : "Downloads",
		"Source" : "Source_A",
		"z" : 17,
		"code3" : "COL"
	},
	{
		"json_featuretype" : "Sheet1",
		"Product_Name" : "publication1",
		"Publication_Date" : "20181125",
		"Product_Type" : "Publications",
		"Department" : "SCL",
		"Material_Type" : "MaterialA",
		"Download_Date" : "20181126",
		"Metric" : "Downloads",
		"Source" : "Source_A",
		"z" : 17,
		"code3" : "COL"
	},
];	



var departments = ["SCL","ENE","CAN"];

var metrics ={
	"Publications":["All Downloads","2018 Downloads"],
	"MOOCs":["All Registrations","2018 Registrations"],
	"Datasets":["All Downloads","2018 Downloads"],
	"Code":["All Pageviews","2018 Pageviews"],
	"Subscribers":["All Subscribers"]
}

var MaterialTypes = ["Material_A", "Material_B", "Material_C"];

var SourceTypes = ["Google", "Publications", "Facebook", "MOOCs", "INTAL", "RES", "Blogs", "Landing", "Other", "Unknown"];
	// var SourceTypes = ["Source_A", "Source_B", "Source_C"];

// Create a list of day and month names.
var shortMonths = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
];
  // var weekdays = [ "Sunday", "Monday", "Tuesday",
  //     "Wednesday", "Thursday", "Friday",
  //     "Saturday"
  // ];


countryCodes = [
	"AFG",
	"ALB",
	"DZA",
	"ASM", // "ASM",
	"AND",
	"AGO",
	"AIA",
	"ATA",
	"ATG",
	"ARG",
	"ARM",
	"ABW",
	"AUS",
	"AUT",
	"AZE",
	"BHS",
	"BHR",
	"BGD",
	"BRB",
	"BLR",
	"BEL",
	"BLZ",
	"BEN",
	"BMU",
	"BTN",
	"BOL",
	"BIH",
	"BWA",
	"BVT",
	"BRA",
	"IOT",
	"BRN",
	"BGR",
	"BFA",
	"BDI",
	"KHM",
	"CMR",
	"CAN",
	"CPV",
	"CYM",
	"CAF",
	"TCD",
	"CHL",
	"CHN",
	"CXR",
	"CCK",
	"COL",
	"COM",
	"COG",
	"COK",
	"CRI",
	"CIV",
	"HRV",
	"CUB",
	"CYP",
	"CZE",
	"DNK",
	"DJI",
	"DMA",
	"DOM",
	"TLS",
	"ECU",
	"EGY",
	"SLV",
	"GNQ",
	"ERI",
	"EST",
	"ETH",
	"FLK",
	"FRO",
	"FJI",
	"FIN",
	"FRA",
	"FXX",
	"GUF",
	"PYF",
	"ATF",
	"GAB",
	"GMB",
	"GEO",
	"DEU",
	"GHA",
	"GIB",
	"GRC",
	"GRL",
	"GRD",
	"GLP",
	"GUM",
	"GTM",
	"GIN",
	"GNB",
	"GUY",
	"HTI",
	"HMD",
	"HND",
	"HKG",
	"HUN",
	"ISL",
	"IND",
	"IDN",
	"IRN",
	"IRQ",
	"IRL",
	"ISR",
	"ITA",
	"JAM",
	"JPN",
	"JOR",
	"KAZ",
	"KEN",
	"KIR",
	"PRK",
	"KOR",
	"KWT",
	"KGZ",
	"LAO",
	"LVA",
	"LBN",
	"LSO",
	"LBR",
	"LBY",
	"LIE",
	"LTU",
	"LUX",
	"MAC",
	"MKD",
	"MDG",
	"MWI",
	"MYS",
	"MDV",
	"MLI",
	"MLT",
	"MHL",
	"MTQ",
	"MRT",
	"MUS",
	"MYT",
	"MEX",
	"FSM",
	"MDA",
	"MCO",
	"MNG",
	"MSR",
	"MAR",
	"MOZ",
	"MMR",
	"NAM",
	"NRU",
	"NPL",
	"NLD",
	"ANT",
	"NCL",
	"NZL",
	"NIC",
	"NER",
	"NGA",
	"NIU",
	"NFK",
	"MNP",
	"NOR",
	"OMN",
	"PAK",
	"PLW",
	"PAN",
	"PNG",
	"PRY",
	"PER",
	"PHL",
	"PCN",
	"POL",
	"PRT",
	"PRI",
	"QAT",
	"REU",
	"ROU",
	"RUS",
	"RWA",
	"KNA",
	"LCA",
	"VCT",
	"WSM", // "WSM",
	"SMR",
	"STP",
	"SAU",
	"SEN",
	"SRB",
	"SYC",
	"SLE",
	"SGP",
	"SVK",
	"SVN",
	"SLB",
	"SOM",
	"ZAF",
	"ESP",
	"LKA",
	"SHN",
	"SPM",
	"SDN",
	"SUR",
	"SJM",
	"SWZ",
	"SWE",
	"CHE",
	"SYR",
	"TWN",
	"TJK",
	"TZA",
	"THA",
	"TGO",
	"TKL",
	"TON", // "TON",
	"TTO",
	"TUN",
	"TUR",
	"TKM",
	"TCA",
	"TUV",
	"UGA",
	"UKR",
	"ARE",
	"GBR",
	"USA",
	"UMI",
	"URY",
	"UZB",
	"VUT",
	"VAT",
	"VEN",
	"VNM",
	"VGB",
	"VIR",
	"WLF",
	"ESH",
	"YEM",
	"YUG",
	"ZAR",
	"ZMB",
	"ZWE"
];



lacCountries = [
	"NIC",
	"COL",
	"JAM",
	"HND",
	"ARG",
	"URY",
	"BOL",
	"CRI",
	"GTM",
	"PAN",
	"DOM",
	"BHS",
	"HTI",
	"BRA",
	"BRB",
	"PER",
	"VEN",
	"PRY",
	"CHL",
	"SLV",
	"ECU",
	"GUY",
	"TTO",
	"MEX",
	"BLZ",
	"SUR"
];