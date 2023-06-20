import fs from 'fs';

export async function before(m) {
  if (m && m.text) {
    const message = m.text.toLowerCase();

    // Cargar el archivo JSON de palabras prohibidas
    const wordRestrictions = JSON.parse(fs.readFileSync('word_restrict.json', 'utf-8'));

    // Obtener el grupo al que pertenece el mensaje
    const group = m.chat;

    // Verificar si el grupo tiene palabras prohibidas
    if (wordRestrictions[group] && wordRestrictions[group].words) {
      const prohibitedWords = wordRestrictions[group].words;

      // Verificar si el mensaje contiene palabras prohibidas
      for (const word of prohibitedWords) {
        const regex = new RegExp(`\\b${word}\\b`, 'g'); // Expresión regular para coincidencia exacta de la palabra prohibida
        if (regex.test(message)) {
          await m.delete().catch(console.log);
          console.log(`Mensaje eliminado por contener la palabra prohibida "${word}" en el grupo ${group}`);
          break;
        }
      }
    }
  }
}
