import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Resend lazily to prevent crash if key is missing on startup
  let resend: Resend | null = null;
  const getResend = () => {
    if (!resend) {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        throw new Error('RESEND_API_KEY environment variable is missing');
      }
      resend = new Resend(apiKey);
    }
    return resend;
  };

  // API Routes
  app.post("/api/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: "Email invalide" });
    }

    try {
      const client = getResend();
      
      // Sending a welcome email
      const { data, error } = await client.emails.send({
        from: 'Aurelion <onboarding@resend.dev>', // Note: In production you'd use your verified domain
        to: [email],
        subject: 'Bienvenue chez Aurelion',
        html: `
          <div style="font-family: serif; color: #1a1a1a; padding: 40px; border: 1px solid #c5a059;">
            <h1 style="color: #c5a059; text-transform: uppercase; letter-spacing: 0.2em;">Bienvenue dans l'Odyssée</h1>
            <p style="font-style: italic; font-size: 1.2em;">Merci de vous être inscrit à la newsletter de la Maison Aurelion.</p>
            <p>Vous recevrez désormais en avant-première nos nouvelles collections et les récits de notre atelier parisien.</p>
            <div style="margin-top: 40px; border-top: 1px solid #eee; pt: 20px;">
              <p style="font-size: 0.8em; color: #666;">© 2024 Maison Aurelion Paris</p>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return res.status(500).json({ error: "Erreur lors de l'envoi du mail" });
      }

      res.status(200).json({ message: "Inscription réussie", id: data?.id });
    } catch (err: any) {
      console.error("Subscription error:", err);
      res.status(500).json({ error: err.message || "Erreur serveur" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
