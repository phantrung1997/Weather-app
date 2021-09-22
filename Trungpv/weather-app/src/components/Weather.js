import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: "16px",
    margin: theme.spacing(1),
    width: "50%",
    borderRadius: 50,
    border: "1px solid gray",
    marginTop: "20px",
    lineHeight: "20px",
    height: "50px",
    outline: "none",
  },
  input: {
    padding: "10px 0 9px",
  },
}));

export default function Weather() {
  const classes = useStyles();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState([]);
 
  const search = (e) => {
    if (e.key === "Enter") {
      const url = `${process.env.REACT_APP_API_BASE}forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${address}&days=3&aqi=no&alerts=no `;
      axios.get(url)
        .then((res) => {
       
          setCity(res.data);
        })
        .catch((err) => {
          alert("Vui Lòng nhập đúng địa chỉ");
        })
        .finally(() => {
          setAddress("");
        });
    }
  };
  return (
    <div>
      <h1>Edsolabs 3-Day Forecast</h1>
      <FormControl className={classes.margin}>
        <Input
          className={classes.input}
          id="input-with-icon-adornment"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder="Nhập thành phố muốn xem"
          onKeyPress={search}
          variant="outlined"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>

      {typeof city.location != "undefined" ? (
        <div>
          <div className="addresscity">
            <h2>
              Today's Weather in {city.location.name}, {city.location.country}
            </h2>
            <div className="address_info">
              <div className="icon_weather">
                <img
                  src={city.current.condition.icon}
                  alt=""
                  className="tempIcon"
                ></img>
                <div>
                  <p>{city.current.condition.text}</p>
                  <p>{city.current.temp_c} °c</p>
                </div>
              </div>
              <div className="other">
                <p>Wind: {city.current.wind_kph} kph</p>
                <p>Precip: {city.current.precip_mm} mm</p>
                <p>Pressure: {city.current.pressure_mb} mb</p>
              </div>
            </div>
          </div>
          <h3>Next 3 day forecast</h3>
          <div className="weather3day">
            {city.forecast.forecastday.map((items) => {
              return (
                <div key={items.date_epoch} className="box">
                  <p className="day">{moment(`${items.date}`).format(`ddd`)}</p>
                  <p className="time">
                    {moment(`${items.date}`).format(`DD/MM`)}
                  </p>
                  <img src={items.day.condition.icon} alt=""></img>
                  <p>{items.day.avgtemp_c} °c</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
