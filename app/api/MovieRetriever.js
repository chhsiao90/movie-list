import Crawler from "Crawler";
import app from "../config/app";

const {uri, formGen, retrieve, method} = app.crawler.dada;

let crawler = new Crawler(app.crawler.options);

export function retrieveMovies(channelNum, date) {
    return new Promise((resolve, reject) => {
        const form = formGen(channelNum, date);
        const callback = function(error, result, $) {
            if (error) {
                reject(error);
            }
            else {
                resolve(retrieve($));
            }
        };
        crawler.queue({
            uri,
            method,
            callback,
            form 
        });
    });
};
