var app = {};

app.channels = ["61", "62", "63", "64", "65",
    "66", "67", "68", "69"];
app.dateFormat = "YYYY-MM-DD";

app.crawler = {};

app.crawler.options = {
    maxConnections: 1,
    rateLimits: 1000
};

app.crawler.dada = {};
app.crawler.dada.uri = "http://www.da.net.tw/catv/channel.php?d=2";
app.crawler.dada.method = "POST";
app.crawler.dada.formGen = (channelNum, date) => ({ no: parseInt(channelNum), epg_date: date });
app.crawler.dada.retrieve = ($) => {
    var results = [];
    $("table tr").each(function(index, row) {
        if (index == 0) return;
        var children = $(row).children();
        results.push({
            playDate: $(children[0]).text(),
            playTime: $(children[1]).text(),
            movieName: $(children[2]).text()
        });
    });
    return results;
};

export default app;
