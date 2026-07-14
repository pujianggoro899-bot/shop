"use client";

import { useState } from "react";
import { Mail, Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setSubscribed(true);
    setLoading(false);
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-gray-900 to-gray-800">
          <CardContent className="p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="text-white">
                <Mail className="mb-4 h-10 w-10 text-red-400" />
                <h2 className="text-2xl font-bold md:text-3xl">Dapatkan Info & Promo Terbaru</h2>
                <p className="mt-3 text-gray-300">
                  Berlangganan newsletter kami dan dapatkan info promo, tips otomotif, dan penawaran spesial langsung di email Anda.
                </p>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">✓ Tips mingguan</span>
                  <span className="flex items-center gap-1">✓ Promo eksklusif</span>
                  <span className="flex items-center gap-1">✓ Gratis</span>
                </div>
              </div>
              <div>
                {subscribed ? (
                  <div className="flex flex-col items-center rounded-xl bg-green-500/10 p-6 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
                      <Check className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-lg font-semibold text-white">Berhasil Berlangganan!</p>
                    <p className="mt-1 text-sm text-gray-300">
                      Terima kasih! Kami akan mengirimkan update terbaru ke <strong>{email}</strong>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Masukkan email Anda"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-600 bg-gray-800 py-3 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        "Mendaftarkan..."
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Berlangganan
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-gray-500">
                      Dengan mendaftar, Anda menyetujui Kebijakan Privasi kami. Kami tidak akan mengirim spam.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
