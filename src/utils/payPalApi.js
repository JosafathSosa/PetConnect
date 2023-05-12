let baseUrl = "https://pi-m.www.sandbox.paypal.com/";
let base = require("base-64");

let clientId =
  "AZKtaRvE_7fokyipfaFuJThuX8PChUxpfUPGVn9e87JB-N06pnPb8154EaRDvjkqiYdpGm5TGUCKu19u";
let secretKey =
  "EK_Z-JSh59osgWtqVadIkPwyuKV8AiB_m2q3x0fVq4080fWYbyedzGGiMiPcleAXEu1HGpJ8ITx5zIAM";

export const generateToken = () => {
  var headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append(
    "Authorization",
    "Basic " + base64.encode(`${clientId}:${secretKey}`)
  );
  var requestOptions = {
    method: "POST",
    headers: headers,
    body: "grant_type=client_credentials",
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + "/v1/oauth2/token", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log("result" + result));
    resolve(result);
  }).catch((error) => console.log(error));
};
