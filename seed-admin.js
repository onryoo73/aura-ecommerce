import bcrypt from "bcryptjs";

// Generate hash for "Admin123!"
const password = "Admin123!";
const hash = bcrypt.hashSync(password, 10);

console.log("Admin user seed data:");
console.log(`Email: admin@aura.com`);
console.log(`Password: ${password}`);
console.log(`Password hash: ${hash}`);
console.log("");
console.log("SQL insert statement:");
console.log(`INSERT INTO users (email, name, password, is_admin) VALUES ('admin@aura.com', 'Admin User', '${hash}', true) ON CONFLICT (email) DO NOTHING;`);
