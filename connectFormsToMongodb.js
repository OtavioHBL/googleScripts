const clusterName = "<InsertYourClusterName>";
const collectionName = "<InsertYourCollectionName>";
const mongoEndpoint = "<insertYourMongoURL>/endpoint/data/v1/action/insertOne";
const apikey = "<InsertYourMongoApiKey>";

function onFormSubmitNew(e) {
  var form = FormApp.getActiveForm();
  var formResponses = form.getResponses();
  var latestResponse = formResponses[formResponses.length - 1];
  var itemResponses = latestResponse.getItemResponses();

  const document = {};

  // This loop gets the answer from each question on forms
  // Adapt to match you forms questions
  itemResponses.forEach(function (value, i) {
    if (i === 0) {
      document.name = value.getResponse();
    }
    if (i === 1) {
      document.product = value.getResponse();
    }
    if (i === 2) {
      document.amount = value.getResponse();
    }
  });

  const payload = {
    document: document,
    collection: "<collection>",
    database: collectionName,
    dataSource: clusterName,
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    headers: { "api-key": apikey },
  };

  const response = UrlFetchApp.fetch(mongoEndpoint, options);
}
