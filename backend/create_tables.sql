-- SQLite
CREATE TABLE stations (
    "longitude"	NUMERIC NOT NULL,
    "latitude"	NUMERIC NOT NULL,
    "id"	INTEGER NOT NULL UNIQUE,
    "wl_max"	NUMERIC,
    "wl_min"	NUMERIC,
    "established"	TEXT NOT NULL,
    "date_removed"	INTEGER,
    "noaa_chart_num"	INTEGER,
    "mean_range"	NUMERIC,
    "name"  TEXT,
    "units" TEXT,
    "datums_url"    TEXT,
    "tidepred_url"  TEXT,
    "expand" TEXT,
    PRIMARY KEY("id")
)

CREATE TABLE datums (
    "date_time"	TEXT NOT NULL,
    "station_id"	INTEGER NOT NULL,
    "is_high"	INTEGER,
    "hat"	NUMERIC,
    "mhhw"	NUMERIC,
    "mhw"	NUMERIC,
    "dtl"	NUMERIC,
    "mtl"	NUMERIC,
    "msl"	NUMERIC,
    "mlw"	NUMERIC,
    "mllw"	NUMERIC,
    "lat"	NUMERIC,
    "gt"	NUMERIC,
    "mn"	NUMERIC,
    "dhq"	NUMERIC,
    "dlq"	NUMERIC,
    "hwi"	NUMERIC,
    "lwi"	NUMERIC,
    "max"	NUMERIC,
    "max_date_time"	TEXT,
    "min"	NUMERIC,
    "min_date_time"	TEXT,
    "analysis_preiod"	TEXT,
    "url"	TEXT,
    "date_recieved"	TEXT,
    "units"	TEXT,
    FOREIGN KEY("station_id") REFERENCES "stations",
    PRIMARY KEY("date_time")
)