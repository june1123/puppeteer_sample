import * as fs from 'fs-extra';
import { ConvertHtmlToImage } from './ConvertHtmlToImage';

async function main() {
  fs.mkdirsSync('./output');
  const values = {
    $settlement_month: '5월',
    $limit_tax_date: new Date().toISOString(),
    $fee: '3,000,000',
    $vat: '300,000',
    $total: '3,300,000',
  };
  await ConvertHtmlToImage.createScreenShot('./resource/sample.html', './output/output.png', 610, 480, values);
}

main();
