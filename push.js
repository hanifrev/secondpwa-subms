const webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BAKlVxeyHPuUNRjcWx0wtKUnfUni7bfYamCjV7reHom0Vk1_hOAvW3IMxdXpomvk11bs3M11fs7M4Iv5gCXGCn8",
  privateKey: "XmdUZK_7JLTYNU2qjcRf52dBw3pREQNh8B5iGsBBnv0",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dRlUMGQdxUE:APA91bHL5VtLJIFqDS2CiKKKSvuPlwYhLyN7_gBC3lkb3hYxUxkchkTH8hNtmlcZe6190ZXMJlz66bLbPIt7acHoC2-kPA9Rp5U0fjtBOPrtterw6Q_yVSYq2qnhemNZ-urHtGvyxxed",
  keys: {
    p256dh:
      "BLlSfpmos0bsCJwLRJZB/JsoleTLsskUfUJsHbJ1CnKtWKinBJTfWxNPmCrm+49li3MQjShGciK/R9fYkGmWiow=",
    auth: "5CbNofCVioymLDetfmpBmw==",
  },
};
var payload = "Welcome to EFL Champhionship Portal";

var options = {
  gcmAPIKey: "<FCM Sender ID>",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
