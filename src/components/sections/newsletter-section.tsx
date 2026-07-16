"use client";

import { useState } from "react";
import { Mail, Check, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubscribed(true);
    setLoading(false);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-carbon-900 to-red-900/10" />
      <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full bg-red-600/10 blur-3xl -translate-x-1/2" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600/20 to-red-600/5 border border-red-600/20">
            <Mail className="h-7 w-7 text-red-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            Dapatkan Info & <span className="text-red-500">Promo</span> Terbaru
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Tips otomotif mingguan, promo eksklusif, dan penawaran spesial langsung ke email Anda.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-3 rounded-2xl bg-green-500/10 border border-green-500/20 px-8 py-5">
              <Check className="h-6 w-6 text-green-400" />
              <div className="text-left">
                <p className="font-bold text-white">Berhasil Berlangganan! 🎉</p>
                <p className="text-sm text-gray-400">Kami akan kirim update ke <strong className="text-green-400">{email}</strong></p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-carbon-800 border border-carbon-500 py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-500 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600/50 transition-all"
                    required
                  />
                </div>
                <Button type="submit" disabled={loading} className="px-6 py-3.5">
                  {loading ? "..." : <><Send className="h-4 w-4" /> Daftar</>}
                </Button>
              </div>
              <p className="mt-3 text-xs text-gray-600">Gratis. Tidak ada spam. Berhenti kapan saja.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
