import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, User, Building2, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { supabase } from '@/lib/supabase';
import type { ContactInput } from '@/types';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState<ContactInput>({ name: '', email: '', institution: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        institution: (form.institution ?? '').trim() || null,
        message: form.message.trim(),
      });
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', institution: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="absolute left-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-violetx-500/8 blur-[120px]" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Get in Touch"
            title="Start a"
            highlight="conversation"
            subtitle="Interested in collaborating, reviewing the research, or piloting the system? Send a message and we'll get back to you."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field icon={User} label="Name" required>
                  <input
                    type="text" required value={form.name} onChange={update('name')}
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-cyber-400/50 focus:bg-cyber-400/5"
                  />
                </Field>
                <Field icon={Mail} label="Email" required>
                  <input
                    type="email" required value={form.email} onChange={update('email')}
                    placeholder="you@institution.edu"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-cyber-400/50 focus:bg-cyber-400/5"
                  />
                </Field>
              </div>
              <div className="mt-5">
                <Field icon={Building2} label="Institution">
                  <input
                    type="text" value={form.institution ?? ''} onChange={update('institution')}
                    placeholder="University or organization (optional)"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-cyber-400/50 focus:bg-cyber-400/5"
                  />
                </Field>
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">Message</label>
                <textarea
                  required value={form.message} onChange={update('message')} rows={5}
                  placeholder="Tell us about your interest in the project..."
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-cyber-400/50 focus:bg-cyber-400/5"
                />
              </div>

              <button
                type="submit" disabled={status === 'loading'}
                className="btn-glow mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyber-400 to-violetx-500 px-6 py-3.5 text-sm font-semibold text-ink-950 disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
                ) : (
                  <><Send className="h-4 w-4" /> Send Message</>
                )}
              </button>

              {status === 'success' && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-signal-green/30 bg-signal-green/10 px-4 py-3 text-sm text-signal-green">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Your message has been received. We'll be in touch soon.
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-signal-red/30 bg-signal-red/10 px-4 py-3 text-sm text-signal-red">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </div>
              )}
            </form>
          </Reveal>

          {/* Map placeholder + info */}
          <Reveal delay={120} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              <div className="glass relative flex-1 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="relative flex h-full min-h-[220px] flex-col items-center justify-center p-6 text-center">
                  <MapPin className="h-10 w-10 text-cyber-300" />
                  <p className="mt-3 text-sm font-medium text-white">Research Lab Location</p>
                  <p className="mt-1 text-xs text-slate-400">Department of Electrical Engineering</p>
                  <p className="text-xs text-slate-500">Innovation Campus, Building 4, Floor 3</p>
                  <div className="mt-4 flex items-center gap-1.5 rounded-full border border-cyber-400/20 bg-cyber-400/5 px-3 py-1 text-[11px] text-cyber-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyber-400 animate-blink" /> Map placeholder
                  </div>
                </div>
              </div>
              <div className="glass rounded-2xl p-5">
                <div className="space-y-3 text-sm">
                  <a href="mailto:research@intellipower.ai" className="flex items-center gap-3 text-slate-300 transition-colors hover:text-cyber-200">
                    <Mail className="h-4 w-4 text-cyber-300" /> research@intellipower.ai
                  </a>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Building2 className="h-4 w-4 text-cyber-300" /> Mon–Fri, 9:00–17:00
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ icon: Icon, label, required, children }: {
  icon: typeof User; label: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-400">
        <Icon className="h-3.5 w-3.5 text-slate-500" />
        {label}{required && <span className="text-signal-red">*</span>}
      </label>
      {children}
    </div>
  );
}
