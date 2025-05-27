const bcrypt = require("bcrypt");

const inputPassword = "virat123"; // Password user entered at login
const storedHash = "$2b$10$rT.vNjGpebjvQsOGTBJ7XeSiqeL7PnkCUDVuMpQ6iK/inuXN.mrki"; // Your stored hash from MongoDB

bcrypt.compare(inputPassword, storedHash, (err, isMatch) => {
    console.log("🔍 Password Match Test:", isMatch ? "✅ Match" : "❌ No Match");
});
