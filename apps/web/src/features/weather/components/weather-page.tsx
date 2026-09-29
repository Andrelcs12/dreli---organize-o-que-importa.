"use client";
import { CloudSun, LoaderCircle, MapPin } from "lucide-react";
import { useState } from "react";

type Weather = {
  current: { temperature_2m: number; weather_code: number };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
  };
};
function description(code: number) {
  if (code <= 1) return "Céu limpo";
  if (code <= 3) return "Parcialmente nublado";
  if (code <= 48) return "Neblina";
  if (code <= 67) return "Chuva";
  return "Tempo instável";
}
export function WeatherPage() {
  const [weather, setWeather] = useState<Weather>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  async function locate() {
    if (!navigator.geolocation) {
      setError("Seu navegador não oferece geolocalização.");
      return;
    }
    setError(undefined);
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const url = new URL("https://api.open-meteo.com/v1/forecast");
          url.search = new URLSearchParams({
            latitude: String(coords.latitude),
            longitude: String(coords.longitude),
            current: "temperature_2m,weather_code",
            daily:
              "temperature_2m_max,temperature_2m_min,precipitation_probability_max",
            hourly: "temperature_2m,precipitation_probability",
            forecast_days: "1",
            timezone: "auto",
          }).toString();
          const response = await fetch(url);
          if (!response.ok) throw new Error();
          setWeather(await response.json());
        } catch {
          setError("Não foi possível carregar o clima agora.");
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        setError(
          "A localização é necessária para mostrar o clima da sua região.",
        );
        setIsLoading(false);
      },
      { timeout: 10_000 },
    );
  }
  if (!weather)
    return (
      <section className="context-page context-empty">
        <CloudSun aria-hidden="true" />
        <p className="context-eyebrow">Clima</p>
        <h2>O que você precisa saber agora.</h2>
        <p>Use sua localização atual para uma previsão curta e relevante.</p>
        <button onClick={locate} type="button">
          {isLoading ? <LoaderCircle className="animate-spin" /> : <MapPin />}
          Usar minha localização
        </button>
        {error ? <span role="alert">{error}</span> : null}
      </section>
    );
  const now = new Date();
  const hours = weather.hourly.time
    .map((time, index) => ({
      chance: weather.hourly.precipitation_probability[index],
      temperature: weather.hourly.temperature_2m[index],
      time,
    }))
    .filter((hour) => new Date(hour.time) >= now)
    .slice(0, 6);
  return (
    <section className="context-page">
      <p className="context-eyebrow">Clima local</p>
      <h2>
        {Math.round(weather.current.temperature_2m)}° ·{" "}
        {description(weather.current.weather_code)}
      </h2>
      <p className="context-description">
        Máx. {Math.round(weather.daily.temperature_2m_max[0])}° · Mín.{" "}
        {Math.round(weather.daily.temperature_2m_min[0])}° · até{" "}
        {weather.daily.precipitation_probability_max[0]}% de chuva hoje.
      </p>
      <div className="weather-hours">
        {hours.map((hour) => (
          <span key={hour.time}>
            <small>
              {new Date(hour.time).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
            <b>{Math.round(hour.temperature)}°</b>
            <i>{hour.chance}% chuva</i>
          </span>
        ))}
      </div>
      <button className="context-text-button" onClick={locate} type="button">
        Atualizar localização
      </button>
    </section>
  );
}
