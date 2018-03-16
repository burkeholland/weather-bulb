# weather-bulb

A Serverless timer functions which sets the color of an LIFX bulb based on the outside temperature

## Setup Instructions

Deploy it straight to Azure without cloning or installing anything. Easily your best option.
<br><br>
[![Deploy to Azure](https://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

## Run Locally

Requires the [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?wt.mc_id=weatherbulb-github-buhollan).

Clone the repo. Add in a `local.settings.json` file. In that file you will need to specify the following format/keys...

```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "YOUR-STORAGE-KEY",
    "LIFX_TOKEN": "YOUR-LIFX-TOKEN",
    "DS_API": "https://api.darksky.net/forecast",
    "DS_SECRET": "YOUR-DARKSKY-SECRET",
    "LAT": "YOUR-LATITUDE",
    "LNG": "YOUR-LONGITUDE"
  }
}
```

