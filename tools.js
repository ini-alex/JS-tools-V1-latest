import qrcode from 'qrcode-terminal';
import { exec } from 'child_process';
import readline from 'readline';
import axios from 'axios';
import chalk from 'chalk';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.green.bold('[ JS TOOLS V1 ]\n  ┗─⧼') + chalk.yellow.bold(' ᴄᴏᴍᴍᴀɴᴅ ') + chalk.green.bold('⧽━⪼ ')
});
console.clear()
console.log(chalk.green.bold(` ==================================================\n\n`),
chalk.yellow.bold(`     Welcome to JS Tools V1 - Created by Alex\n\n`),
chalk.green.bold(`==================================================\n`),
chalk.yellow.bold(`

Hai dev keren! Selamat datang di JS Tools V1.
This toolkit dibuat dengan penuh semangat oleh Alex,  
buat bantuin lu ngoding lebih cepat, rapi, dan gak ribet.

> Versi pertama ini masih sederhana, tapi jangan salah —
  di balik script ini ada potensi buat jadi legenda.
> Ketik help untuk lihat semua fitur

Jangan lupa:
- Keep exploring
- Jangan takut ngulik
- Dan selalu backup file sebelum ngoding ngaco

Thanks udah make tools ini.
Stay sharp. Stay creative. And happy coding!

- Alex (Developer)
`));
rl.prompt();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

rl.on('line', (line) => {
  const input = line.trim();
  const args = input.split(' ');
  const command = args[0];
  const params = args.slice(1);
  const text = args.join(' ');
  switch (command) {
    case 'tambah':
      var a = Number(params[0]);
      var b = Number(params[1]);
      if (isNaN(a) || isNaN(b)) {
        console.log('Masukan dua angka yang valid!');
      } else {
        console.log(`Hasil: ${a} + ${b} = ${a + b}`);
      }
      break;

case "get":
	let tek = args.startsWith("https://");
	if(!args && !tek) { return console.log(chalk.red.bold("Masukkan tautan yang valid!"));
	}
	let resp = axios.get(tek);
	try {
	console.log(chalk.green.bold("\nhasil:\n"), resp.data);
	} catch (e) {
	console.error(e);
	}
break;
case 'qr': {
  if (!text) {
    console.log('Masukin teks atau link yang mau dijadiin QR!');
    break;
  }

  qrcode.generate(text, { small: true });
  break;
}

case "pantun": case "random-pantun":
async function getPantun() {
  const apiUrl = 'https://api-skyzopedia-3.vercel.app/ai/openai?apikey=skyzo&text=Generate+pantun+random+jangan+sama!';

  try {
    let response = await axios.get(apiUrl);
    let pantun = response.data.result; // Ambil pantun dari field 'result' dalam response
    console.log(chalk.green.bold('\nPantun Random:\n'), chalk.bgGreen.white.bold(pantun));
  } catch (error) {
    console.error('Error fetching pantun:', error);
  }
}

getPantun();
break;

case 'ai_mode': case "ai":
  console.log(chalk.yellow.bold('[AI MODE] Halo, ada yang bisa saya bantu'));

  let isRunning = true;

  async function askQuestion() {
    rl.question(chalk.yellow.bold('\n\nketik "stop" untuk berhenti: '), async (question) => {
      if (question.toLowerCase() === 'stop') {
        console.log(chalk.blue('[INFO] AI Mode dihentikan.'));
        isRunning = false;
	rl.prompt()
        return;
      }

      console.log(chalk.blue('[INFO] Menunggu respon...'));

      try {
        let response = await axios.get(`https://api-skyzopedia-3.vercel.app/ai/openai?apikey=skyzo&text=mulai+sekarang+namamu+JS+assistant%2C+yang+merancangmu+adalah+LXA+developer.+pertanyaan+ku+sekarang+${encodeURIComponent(question)}`);
        
        // Mengambil hasil dari field `result`
        if (response.data?.result) {
          console.log(chalk.green.bold('\n[ AI ]\n ') + response.data.result);
        } else {
          console.log(chalk.red('[ERROR] Gagal menerima respons dari AI.'));
        }

      } catch (err) {
        console.log(chalk.red('[ERROR] Gagal komunikasi dengan API: ' + err.message));
      }

      if (isRunning) {
        askQuestion(); // Terus tanya sampai user ketik "stop"
      }
    });
  }

  askQuestion();
  break;

case 'install_panel':
  console.log(chalk.yellow.bold('[INSTALL PANEL] Pterodactyl Installer'));

  rl.question('Domain (contoh: panel.example.com): ', (domain) => {
    rl.question('Email (untuk SSL & Notifikasi): ', (email) => {
      rl.question('Apakah kamu ingin auto-install panel ini? (yes/no): ', (confirm) => {
        if (confirm.toLowerCase() !== 'yes') {
          console.log(chalk.blue('[INFO] Install dibatalkan.'));
          rl.close();
          return;
        }

        console.log(chalk.yellow.bold('[INFO] Menginstall panel dari GitHub...'));

        const command = `
          curl -Lo installer.sh https://github.com/pterodactyl-installer/pterodactyl-installer/releases/latest/download/installer.sh &&
          chmod +x installer.sh &&
          bash installer.sh --panel --email ${email} --hostname ${domain}
        `;

        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(chalk.red('[ERROR] Gagal install panel: ' + error.message));
            rl.close();
            return;
          }
          if (stderr) console.error(chalk.red('[STDERR] ' + stderr));
          console.log(chalk.green('[DONE] Panel berhasil diinstall!'));
          console.log(stdout);
          rl.close();
        });
      });
    });
  });
  break;


   case 'kali':
      var c = Number(params[0]);
      var d = Number(params[1]);
      if (isNaN(c) || isNaN(d)) {
        console.log('Masukan dua angka yang valid!');
      } else {
        console.log(`Hasil: ${c} * ${d} = ${c * d}`);
      }
      break;

   case 'kurang':
      const e = Number(params[0]);
      const f = Number(params[1]);
      if (isNaN(e) || isNaN(f)) {
        console.log('Masukan dua angka yang valid!');
      } else {
        console.log(`Hasil: ${e} - ${f} = ${e - f}`);
      }
      break;

   case 'bagi':
      const g = Number(params[0]);
      const h = Number(params[1]);
      if (isNaN(g) || isNaN(h)) {
        console.log('Masukan dua angka yang valid!');
      } else {
        console.log(`Hasil: ${g} / ${h} = ${g / h}`);
      }
      break

	case 'locomotive':
exec('sl', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(stdout);
});
	break;

    case 'halo':
      console.log('Halo juga bre!');
      break;

    case 'tutup': case 'close':
	setTimeout(() => {
      console.log(chalk.red.bold("Closing script..."));
      console.log(chalk.bgRed.white.bold('Script Closed, see you again!'));
	}, 2000);
      rl.close();
      return;

    default:
      console.log(`Command "${command}" gak dikenal.`);
      break;
	case 'install_dependencies':
  console.log(chalk.yellow.bold('[INFO] Installing dependencies...'));
  exec('npm install', (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red(`[ERROR] Gagal install: ${error.message}`));
      return;
    }
    console.log(chalk.green('[DONE] Dependencies installed successfully:\n' + stdout));
  });
  break;
case 'help':
  console.log(chalk.bgYellow.white.bold(' List all fitur '));
  console.log(chalk.yellow.bold(`
1. tambah, kali, kurang, bagi	 => Operasi hitung
2. install                   	 => Install module npm
3. close                     	 => Keluarin tools
4. install_panel		 => Installer panel pterodactyl
5. ai				 => Assisten AI(Gpt)
6. pantun			 => Pantun random(fun)
`));
  break;
case 'install':
  const packageName = args[1];
  if (!packageName) {
    console.error(chalk.red('[ERROR] Package name is required.'));
    return;
  }
  console.log(chalk.yellow.bold(`[INFO] Installing ${packageName}...`));
  exec(`npm install ${packageName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red(`[ERROR] Gagal install ${packageName}: ${error.message}`));
      return;
    }
    if (stderr) {
      console.error(chalk.red(`[STDERR] ${stderr}`));
      return;
    }
    console.log(chalk.green(`[DONE] Successfully installed ${packageName}:\n` + stdout));
  });
  break;
}  
  
rl.prompt(); // nunggu input lagi
});
