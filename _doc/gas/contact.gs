const ADMIN_EMAIL = "YOUR_ADMIN_EMAIL"; // お問合せ送信先
const ALERT_EMAIL = "YOUR_ALERT_EMAIL"; // アラート送信先
const ALERT_THRESHOLD = 90;
const SEND_MAIL = true;

function doPost(e) {
  if (e.parameter.website) return jsonResponse({ result: "ok" });

  const loadedAt = Number(e.parameter.loadedAt || 0);
  if (loadedAt && Date.now() - loadedAt < 3000)
    return jsonResponse({ result: "ok" });

  const name = e.parameter.name || "";
  const company = e.parameter.company || "";
  const email = e.parameter.email || "";
  const tel = e.parameter.tel || "";
  const category = e.parameter.category || "";
  const message = e.parameter.message || "";

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // appendRow 前に今日の累計を取得
  const prevTotal = getTodayMailTotal(sheet);

  let mailCount = 0;

  if (SEND_MAIL) {
    try {
      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: `ミエフソーお問合せフォーム【お問い合わせ】${name} 様`,
        body: [
          `お名前：${name}`,
          `会社名：${company}`,
          `メールアドレス：${email}`,
          `電話番号：${tel}`,
          `お問い合わせ種別：${category}`,
          "",
          "【お問い合わせ内容】",
          message,
        ].join("\n"),
      });
      mailCount++;
    } catch (e) {}
  }

  if (SEND_MAIL && email) {
    try {
      MailApp.sendEmail({
        to: email,
        subject: "お問い合わせを受け付けました【株式会社ミエフソー】",
        body: [
          `${name} 様`,
          "",
          "この度はお問い合わせいただきありがとうございます。",
          "内容を確認の上、担当者よりご連絡いたします。",
          `お名前：${name}`,
          `会社名：${company}`,
          `メールアドレス：${email}`,
          `電話番号：${tel}`,
          `お問い合わせ種別：${category}`,
          "",
          "---",
          "【お問い合わせ内容】",
          message,
          "---",
          "株式会社ミエフソー",
          "TEL: 0598-28-4970",
        ].join("\n"),
      });
      mailCount++;
    } catch (e) {}
  }

  const todayTotal = prevTotal + mailCount;

  // H・I列を含めてスプレッドシートに記録
  sheet.appendRow([
    new Date(),
    name,
    company,
    email,
    tel,
    category,
    message,
    todayTotal, // H: 本日の累計
    mailCount, // I: 今回の送信数
  ]);

  // 閾値を跨いだ瞬間のみアラート送信
  if (prevTotal <= ALERT_THRESHOLD && todayTotal > ALERT_THRESHOLD) {
    try {
      MailApp.sendEmail({
        to: ALERT_EMAIL,
        subject:
          "【警告】ミエフソーお問合せフォームの本日のメール送信数が上限に近づいています",
        body: [
          `本日の累計メール送信数が ${todayTotal} 件になりました。`,
          `（上限の目安：${ALERT_THRESHOLD} 件）`,
          "",
          "送信制限（100件/日）に達するとメール送信ができなくなります。",
          "状況を確認してください。",
        ].join("\n"),
      });
    } catch (e) {}
  }

  return jsonResponse({ result: "success" });
}

function getTodayMailTotal(sheet) {
  const todayStr = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd");
  const lastRow = sheet.getLastRow();
  if (lastRow < 1) return 0;

  const data = sheet.getRange(1, 1, lastRow, 9).getValues();
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    try {
      const rowDate = Utilities.formatDate(
        new Date(data[i][0]),
        "Asia/Tokyo",
        "yyyy/MM/dd",
      );
      if (rowDate === todayStr) {
        total += Number(data[i][8]) || 0; // I列（index 8）
      }
    } catch (e) {
      // 日付でない行（ヘッダー等）はスキップ
    }
  }
  return total;
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
