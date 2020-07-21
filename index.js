const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { GoogleSpreadsheet } = require('google-spreadsheet');

app.use(bodyParser.json());

const PORT = 3001

const doc = new GoogleSpreadsheet('12K70LVK1TSos8dSkyT4r5xlPe7Bh1y_tgFzg3W1n2wI');

async function getSpreadsheet() {
  await doc.useServiceAccountAuth(require('./credentials.json'));
  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);

  const sheet = doc.sheetsByIndex[0]
  const rows = await sheet.getRows(); 
  console.log(rows)

  const count = await sheet.cellStats.loaded;
  console.log(count);
}

// TODO add rows

// TODO edit rows

// TODO delete rows


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

getSpreadsheet();