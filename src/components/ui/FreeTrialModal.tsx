import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from './dialog';
import { Input } from './input';
import { Button } from './button';
import { AlertTriangle, Send } from 'lucide-react';

export function FreeTrialModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', gmail: '' });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (!sessionStorage.getItem('freeTrialModalShown')) {
      setTimeout(() => setOpen(true), 800);
      sessionStorage.setItem('freeTrialModalShown', 'true');
    }
  }, []);

  const validate = () => {
    const errs: { name?: string; phone?: string } = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    return errs;
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    // WhatsApp logic (same as Book Appointment)
    const whatsappMessage = `*Free Hearing Aid Trial Request*\n\nName: ${form.name}\nPhone: ${form.phone}\nGmail: ${form.gmail || 'Not provided'}\n\nPlease contact this person for a free trial.`;
    const whatsappNumber = '918590310265'; // Use your clinic's WhatsApp number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => setOpen(false), 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md w-full bg-[#01184a] text-white border-none p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 text-center">Get a free hearing aid trial</h2>
        <p className="text-white/80 text-center mb-4 sm:mb-6 text-xs sm:text-sm">Fill in your details and our team will contact you for a free trial appointment.</p>
        {success ? (
          <div className="text-center py-6 sm:py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#e11d48]/20 text-[#e11d48] rounded-full mb-3 sm:mb-4">
              <Send className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="text-base sm:text-lg font-semibold text-[#e11d48] mb-1 sm:mb-2">Request Sent!</div>
            <div className="text-white/90 text-xs sm:text-sm">We have forwarded your request to WhatsApp. Our team will contact you soon.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="ft-name" className="block text-xs sm:text-sm font-semibold text-white mb-1">Name *</label>
              <Input
                id="ft-name"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your name"
                className={errors.name ? 'border-[#e11d48] bg-[#e11d48]/10 text-white placeholder-white/60 text-sm sm:text-base' : 'bg-[#01184a] text-white placeholder-white/60 border-white/30 text-sm sm:text-base'}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-[#e11d48] flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> {errors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="ft-phone" className="block text-xs sm:text-sm font-semibold text-white mb-1">Phone *</label>
              <Input
                id="ft-phone"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                className={errors.phone ? 'border-[#e11d48] bg-[#e11d48]/10 text-white placeholder-white/60 text-sm sm:text-base' : 'bg-[#01184a] text-white placeholder-white/60 border-white/30 text-sm sm:text-base'}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-[#e11d48] flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4" /> {errors.phone}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="ft-gmail" className="block text-xs sm:text-sm font-semibold text-white mb-1">Gmail (optional)</label>
              <Input
                id="ft-gmail"
                value={form.gmail}
                onChange={(e) => handleChange('gmail', e.target.value)}
                placeholder="Enter your Gmail address"
                type="email"
                className="bg-[#01184a] text-white placeholder-white/60 border-white/30 text-sm sm:text-base"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#e11d48] hover:bg-[#b91c36] text-white font-bold rounded-xl py-2 sm:py-3 mt-1 sm:mt-2 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Request Free Trial
                </>
              )}
            </Button>
            <div className="pb-2 sm:pb-0" />
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
} 