import * as fs from 'fs-extra';
import * as _ from 'lodash';
import * as puppeteer from 'puppeteer';

export class ConvertHtmlToImage {
  static async createScreenShot(htmlFilePath: string, outputPath: string, width: number, height: number, replaceValues?: { [id: string]: string }) {
    let htmlContents = await this.loadHtml(htmlFilePath);
    if (replaceValues) {
      _.forEach(replaceValues, (value, key) => {
        htmlContents = htmlContents.replace(key, value);
      });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({ width, height });
    page.setContent(htmlContents);
    await page.screenshot({ path: outputPath, fullPage: true });
    await browser.close();
  }

  private static async loadHtml(path: string): Promise<string> {
    return fs.readFileSync(path).toString();
  }
}
