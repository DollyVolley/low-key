export function generateSeed(size: number) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let seed = "";
    for (let i = 9; i < size; i++) {
        seed += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return seed;
}
