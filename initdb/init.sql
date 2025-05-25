-- initdb/init.sql
CREATE TABLE weather_requests (
    id SERIAL PRIMARY KEY,
    city TEXT UNIQUE,
    data JSONB,
    updated_at TIMESTAMP DEFAULT NOW()
);