const APP_ENVIRONMENT = "developement";

let SERVER_BASE_URL: string;

if (APP_ENVIRONMENT == "developement") {
  SERVER_BASE_URL = "http://localhost:4000";
} else {
  SERVER_BASE_URL = "https://domain.com";
}

export { SERVER_BASE_URL };
