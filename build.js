import {
    Document, Packer, Paragraph, TextRun,
    BorderStyle, Table, TableRow, TableCell, WidthType,
    ExternalHyperlink, TabStopType, TabStopPosition
} from "docx";
import fs from "fs";

const ACCENT = "8B4513"; // warm earth-tone (Kaamulan-inspired)
const DARK = "222222";
const GRAY = "555555";

const FONT = "Calibri";

function sectionTitle(text) {
    return new Paragraph({
        spacing: { before: 180, after: 60 },
        border: { bottom: { color: ACCENT, space: 2, style: BorderStyle.SINGLE, size: 8 } },
        children: [
            new TextRun({ text: text.toUpperCase(), bold: true, color: ACCENT, size: 21, font: FONT }),
        ],
    });
}

function bullet(text) {
    return new Paragraph({
        bullet: { level: 0 },
        spacing: { after: 40 },
        children: [new TextRun({ text, size: 20, font: FONT, color: DARK })],
    });
}

function jobHeader(title, period) {
    return new Paragraph({
        spacing: { before: 120, after: 20 },
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
            new TextRun({ text: title, bold: true, size: 22, font: FONT, color: DARK }),
            new TextRun({ text: `\t${period}`, italics: true, size: 20, font: FONT, color: GRAY }),
        ],
    });
}

function companyLine(text) {
    return new Paragraph({
        spacing: { after: 20 },
        children: [new TextRun({ text, italics: true, size: 20, font: FONT, color: ACCENT })],
    });
}

function techLine(text) {
    return new Paragraph({
        spacing: { after: 40 },
        children: [
            new TextRun({ text: "Technologies: ", bold: true, size: 19, font: FONT, color: GRAY }),
            new TextRun({ text, size: 19, font: FONT, color: GRAY }),
        ],
    });
}

function skillGroup(label, items) {
    return [
        new Paragraph({
            spacing: { before: 100, after: 20 },
            children: [new TextRun({ text: label, bold: true, size: 19, font: FONT, color: DARK })],
        }),
        new Paragraph({
            spacing: { after: 20 },
            children: [new TextRun({ text: items.join("  •  "), size: 19, font: FONT, color: GRAY })],
        }),
    ];
}

function specLine(text) {
    return new Paragraph({
        spacing: { after: 30 },
        children: [
            new TextRun({ text: "▹ ", bold: true, color: ACCENT, size: 20, font: FONT }),
            new TextRun({ text, size: 20, font: FONT, color: DARK }),
        ],
    });
}

const doc = new Document({
    sections: [
        {
            properties: {
                page: {
                    size: { width: 12240, height: 15840 }, // US Letter
                    margin: { top: 450, bottom: 450, left: 540, right: 540 },
                },
            },
            children: [
                // ── Header: Name + Title ──
                new Paragraph({
                    spacing: { after: 40 },
                    children: [
                        new TextRun({ text: "KLYDE JOSEPH YABO", bold: true, size: 40, font: FONT, color: DARK }),
                    ],
                }),


                // ── Contact line ──
                new Paragraph({
                    border: { bottom: { color: ACCENT, space: 6, style: BorderStyle.SINGLE, size: 12 } },
                    spacing: { after: 200 },
                    children: [
                        new TextRun({ text: "klydejosephy@gmail.com   |   +63 945 592 7782   |   ", size: 18, font: FONT, color: GRAY }),
                        new ExternalHyperlink({
                            link: "https://github.com/klaayd39",
                            children: [new TextRun({ text: "github.com/klaayd39", size: 18, font: FONT, color: ACCENT, underline: {} })],
                        }),
                        new TextRun({ text: "   |   ", size: 18, font: FONT, color: GRAY }),
                        new ExternalHyperlink({
                            link: "https://klydeyabo.vercel.app/",
                            children: [new TextRun({ text: "klydeyabo.vercel.app", size: 18, font: FONT, color: ACCENT, underline: {} })],
                        }),
                        new TextRun({ text: "   |   Malaybalay City, Philippines", size: 18, font: FONT, color: GRAY }),
                    ],
                }),

                // ── Two column layout using a borderless table ──
                new Table({
                    width: { size: 11000, type: WidthType.DXA },
                    columnWidths: [6600, 4400],
                    borders: {
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    },
                    rows: [
                        new TableRow({
                            children: [
                                // LEFT COLUMN
                                new TableCell({
                                    width: { size: 6600, type: WidthType.DXA },
                                    margins: { right: 260 },
                                    children: [
                                        sectionTitle("Summary"),
                                        new Paragraph({
                                            spacing: { after: 100 },
                                            children: [new TextRun({
                                                text: "Software Automation Developer specializing in Python, JavaScript, REST APIs, Playwright, WebSockets, and broadcast automation. Experienced in building real-time monitoring systems, AI-powered dashboards, workflow automation tools, and custom control systems for live broadcast environments. Passionate about automation, software engineering, and solving complex operational problems.",
                                                size: 20, font: FONT, color: DARK,
                                            })],
                                        }),

                                        sectionTitle("Education"),
                                        new Paragraph({
                                            spacing: { after: 20 },
                                            children: [new TextRun({ text: "Bukidnon State University", bold: true, size: 20, font: FONT, color: DARK })],
                                        }),
                                        new Paragraph({
                                            spacing: { after: 40 },
                                            children: [new TextRun({ text: "Bachelor of Science in Information Technology (2020 – 2024)", size: 19, font: FONT, color: GRAY })],
                                        }),

                                        sectionTitle("Experience"),
                                        jobHeader("IT Intern – Cash Unit (OJT)", ""),
                                        companyLine("Department of Education, Malaybalay City"),
                                        bullet("Assisted in computer troubleshooting, data encoding, and loan and voucher processing."),
                                        
                                        jobHeader("IT/Technician", "2025 – Present"),
                                        companyLine("Bombo Radyo Malaybalay"),
                                        techLine("Python, JavaScript, React, REST APIs, Playwright, WebSockets, OSC, Git, Linux"),
                                        bullet("Built news-headline-crawler, an automated news headline crawler that gathers the latest news from various sources to build a centralized real-time intelligence board."),
                                        bullet("Engineered the Bombo Radyo News Intelligence Hub, a full-stack platform aggregating 50+ live feeds and pushing breaking news alerts directly to Discord using webhooks."),
                                        bullet("Developed Nautel AUI Monitor, a real-time transmitter health dashboard with custom telemetry alerts, enabling 24/7 unattended monitoring and reducing equipment downtime."),
                                        bullet("Developed Media Rename Automation, a PowerShell utility for batch-renaming video files using strict regex pattern matching, saving hours of manual data entry."),
                                        bullet("Programmed X32 Remote Toggle using OSC protocols for Behringer X32 mixers, achieving sub-50ms state synchronization and eliminating manual hardware switching."),
                                        bullet("Developed OBS automation tools (Media Automator & OBS Scene Autosort) that reduced repetitive production setup time by approximately 70% and improved workflow consistency during live broadcasts."),
                                        bullet("Developed a Drama Report Generator using Raduga in VirtualBox, automating broadcast log and performance report generation and reducing manual data entry by approximately 90%, improving reporting efficiency and accuracy."),


                                        jobHeader("IT Support & Hardware Technician", "Freelance"),
                                        companyLine("General IT Services"),
                                        techLine("Hardware Diagnostics, Network Configuration, Technical Documentation, Video Editing"),
                                        bullet("Performed diagnostic troubleshooting, component upgrades, and repair services."),
                                        bullet("Installed operating systems, software packages, and system drivers."),
                                        bullet("Configured network routing and peripheral devices, improving workspace productivity for small offices."),
                                    ],
                                }),

                                // RIGHT COLUMN
                                new TableCell({
                                    width: { size: 4400, type: WidthType.DXA },
                                    margins: { left: 260 },
                                    children: [
                                        sectionTitle("Skills"),
                                        ...skillGroup("Frontend", ["React", "JavaScript", "HTML5", "CSS3", "Vite", "Responsive Design"]),
                                        ...skillGroup("Backend & Automation", ["Python", "Node.js", "Playwright", "OSC Protocol", "WebSockets", "API Design"]),
                                        ...skillGroup("Database & Cloud", ["Supabase", "PostgreSQL", "REST APIs", "Firebase App Hosting", "Git/GitHub"]),
                                        ...skillGroup("Broadcast Systems & Tools", ["OBS Studio", "Nautel Telemetry", "X32 Control", "Linux Systems", "Video Editing"]),

                                        sectionTitle("Specializations"),
                                        specLine("Stream & Broadcast Automation"),
                                        specLine("Real-time Monitoring Systems"),
                                        specLine("OSC / WebSocket Integration"),
                                        specLine("Telemetry & Alerting"),
                                        specLine("AI-powered Intelligence Tools"),
                                        specLine("Custom Scripting & REST APIs"),

                                        sectionTitle("Achievements"),
                                        new Paragraph({
                                            spacing: { after: 100 },
                                            children: [new TextRun({ text: "College of Technologies Athlete of the Year 2024 – Bukidnon State University", bold: true, size: 20, font: FONT, color: DARK })],
                                        }),

                                        sectionTitle("Reference"),
                                        new Paragraph({
                                            children: [new TextRun({ text: "Available upon request", size: 20, font: FONT, color: GRAY })],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buf) => {
    fs.writeFileSync("./public/Klyde_Joseph_Yabo_Resume.docx", buf);
    console.log("done");
});
