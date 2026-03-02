CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    balance BIGINT DEFAULT 0,
    total_locked_coins BIGINT DEFAULT 0,
    vip_level INT DEFAULT 0,
    last_tap TIMESTAMP
);

CREATE TABLE tap_coins (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    coins_earned BIGINT,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unlock_at TIMESTAMP,
    is_withdrawn BOOLEAN DEFAULT FALSE
);

CREATE TABLE referrals (
    id BIGSERIAL PRIMARY KEY,
    referrer_id BIGINT REFERENCES users(id),
    referee_id BIGINT REFERENCES users(id),
    level INT,
    commission BIGINT
);

CREATE TABLE withdrawals (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    amount NUMERIC,
    status VARCHAR(50),
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE fraud_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    ip VARCHAR(50),
    device VARCHAR(100),
    risk_score NUMERIC,
    flagged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);