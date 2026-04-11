const fs = require('fs');
const content = fs.readFileSync('src/data/lawFirmsData.js', 'utf8');

// A quick string manipulation to inject new fields into each dummy firm block
const newContent = content.replace(/cases_handled: (\d+)/g, (match, p1, offset, string) => {
    // Generate a random website, contact_name, etc.
    const names = ["Anil Kumar", "Sanjay Singh", "Riya Sharma", "Pooja Gupta"];
    const contact = names[Math.floor(Math.random() * names.length)];
    return match + `,\n    firm_name: 'Firm Name',\n    total_lawyers: 15,\n    total_staff: 25,\n    website: 'https://www.example.com',\n    contact_name: '${contact}',\n    contact_email: 'contact@example.com',\n    contact_phone: '+91 9999999999',\n    contact_designation: 'Managing Partner',\n    achievements: 'Awarded Best Corporate Firm 2023'`;
});

// Since the name is variable, let's do a smarter replace.
let lines = content.split('\n');
let inFirmObject = false;
let firmName = "";
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("name: '")) {
        firmName = lines[i].split("'")[1];
    }
    if (lines[i].includes("cases_handled:")) {
        const contact = ["Anil Kumar", "Sanjay Singh", "Riya Sharma", "Pooja Gupta"][Math.floor(Math.random() * 4)];
        lines[i] = lines[i] + `,\n    firm_name: '${firmName}',\n    total_lawyers: Math.floor(Math.random() * 20) + 5,\n    total_staff: Math.floor(Math.random() * 30) + 10,\n    website: 'https://www.${firmName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}.com',\n    contact_name: '${contact}',\n    contact_email: 'contact@${firmName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}.com',\n    contact_phone: '+91 9999999999',\n    contact_designation: 'Managing Partner',\n    achievements: 'Ranked Top 10 by India Law Review'`;
    }
}
fs.writeFileSync('src/data/lawFirmsData.js', lines.join('\n'));
