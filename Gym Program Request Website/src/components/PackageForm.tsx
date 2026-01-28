import { useState } from 'react';
import { Check } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function PackageForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    availability: '',
    goals: '',
    preferredTime: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Send form data to server
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b3f9f454/submit-consultation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit consultation request');
      }

      console.log('Form submitted successfully:', result);
      setSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          experience: '',
          availability: '',
          goals: '',
          preferredTime: ''
        });
      }, 5000);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="relative p-8 min-h-[500px]">
        {/* Retro overlay with dot pattern */}
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            backgroundImage: 'radial-gradient(circle, rgba(192, 192, 192, 0.3) 1px, transparent 1px)',
            backgroundSize: '4px 4px',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {/* Classic Windows Dialog Box */}
          <div 
            className="relative"
            style={{
              animation: 'popupBounce 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }}
          >
            {/* Dialog Window */}
            <div className="bg-[#c0c0c0] w-[90vw] max-w-[500px]" 
              style={{ 
                border: '2px outset #ffffff',
                boxShadow: '4px 4px 0px rgba(0,0,0,0.5)'
              }}>
              
              {/* Title Bar */}
              <div className="px-2 py-1 flex items-center justify-between"
                style={{ 
                  background: 'linear-gradient(to bottom, #1e5aa8, #13478a)',
                  borderBottom: '2px solid #0d3461'
                }}>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white flex items-center justify-center text-[10px] font-bold"
                    style={{ border: '1px solid #808080' }}>
                    ✓
                  </div>
                  <span className="text-xs text-white font-bold">CONSULTATION_REQUEST.EXE</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-[#c0c0c0] flex items-center justify-center text-[8px] font-bold"
                    style={{ border: '1px outset #fff' }}>_</div>
                  <div className="w-4 h-4 bg-[#c0c0c0] flex items-center justify-center text-[8px] font-bold"
                    style={{ border: '1px outset #fff' }}>□</div>
                  <div className="w-4 h-4 bg-[#c0c0c0] flex items-center justify-center text-[8px] font-bold"
                    style={{ border: '1px outset #fff' }}>×</div>
                </div>
              </div>

              {/* Dialog Content */}
              <div className="p-6">
                <div className="flex gap-4 items-start mb-6">
                  {/* Large icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#00cc00] rounded-sm flex items-center justify-center"
                      style={{ 
                        border: '3px ridge #00ff00',
                        boxShadow: '2px 2px 0px rgba(0,0,0,0.3)'
                      }}>
                      <Check className="w-10 h-10 text-white" strokeWidth={4} />
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-lg font-bold mb-3 text-[#000080]">
                      Request Successfully Submitted!
                    </h3>
                    <p className="text-sm mb-2 leading-relaxed">
                      Your consultation request has been received and processed.
                    </p>
                    <div className="mt-4 p-3 bg-white" style={{ border: '2px inset #808080' }}>
                      <div className="text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[#cc0000]">●</span>
                          <span className="font-bold">STATUS:</span>
                          <span className="text-[#00cc00]">CONFIRMED</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#cc0000]">●</span>
                          <span className="font-bold">RESPONSE_TIME:</span>
                          <span>24 HOURS</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#cc0000]">●</span>
                          <span className="font-bold">PRIORITY:</span>
                          <span>HIGH</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar animation */}
                <div className="mb-4">
                  <div className="text-xs mb-1 font-bold text-[#000080]">PROCESSING...</div>
                  <div className="h-6 bg-white" style={{ border: '2px inset #808080' }}>
                    <div 
                      className="h-full"
                      style={{ 
                        width: '100%',
                        background: 'repeating-linear-gradient(90deg, #2e5f9e 0px, #2e5f9e 20px, #1e4a7a 20px, #1e4a7a 40px)',
                        animation: 'progressSlide 2s linear infinite'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Button */}
                <div className="flex justify-center">
                  <button
                    className="px-8 py-2 font-bold text-sm min-w-[120px]"
                    style={{ 
                      background: 'linear-gradient(to bottom, #e0e0e0, #c0c0c0)',
                      border: '2px outset #ffffff',
                      boxShadow: '1px 1px 0px rgba(0,0,0,0.5)'
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.border = '2px inset #808080';
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.border = '2px outset #ffffff';
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes popupBounce {
            0% {
              transform: scale(0.3) translateY(-100px);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
            }
            100% {
              transform: scale(1) translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes progressSlide {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 40px 0;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <div className="p-4 mb-4 bg-[#ffcccc]" style={{ border: '2px solid #cc0000' }}>
          <div className="flex items-start gap-2">
            <span className="text-[#cc0000] font-bold text-lg">⚠</span>
            <div>
              <div className="font-bold text-[#cc0000] text-xs mb-1">ERROR:</div>
              <div className="text-sm">{error}</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12">
          <label className="block text-xs font-bold mb-1 tracking-wider text-[#000080]">
            [FULL_NAME] *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white font-mono text-sm"
            style={{ border: '2px inset #808080' }}
            placeholder="JOHN_DOE"
          />
        </div>

        <div className="col-span-12 md:col-span-7">
          <label className="block text-xs font-bold mb-1 tracking-wider text-[#000080]">
            [EMAIL] *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white font-mono text-sm"
            style={{ border: '2px inset #808080' }}
            placeholder="JOHN@EXAMPLE.COM"
          />
        </div>

        <div className="col-span-12 md:col-span-5">
          <label className="block text-xs font-bold mb-1 tracking-wider text-[#000080]">
            [PHONE]
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 bg-white font-mono text-sm"
            style={{ border: '2px inset #808080' }}
            placeholder="555-123-4567"
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block text-xs font-bold mb-1 tracking-wider text-[#000080]">
            [TRAINING_EXPERIENCE] *
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white font-mono text-sm appearance-none cursor-pointer"
            style={{
              border: '2px inset #808080',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000080' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center'
            }}
          >
            <option value="">SELECT_LEVEL</option>
            <option value="beginner">BEGINNER (0-1 YRS)</option>
            <option value="intermediate">INTERMEDIATE (1-3 YRS)</option>
            <option value="advanced">ADVANCED (3+ YRS)</option>
            <option value="athlete">COMPETITIVE_ATHLETE</option>
          </select>
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block text-xs font-bold mb-1 tracking-wider text-[#000080]">
            [WEEKLY_AVAILABILITY] *
          </label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white font-mono text-sm appearance-none cursor-pointer"
            style={{
              border: '2px inset #808080',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000080' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center'
            }}
          >
            <option value="">SELECT_FREQUENCY</option>
            <option value="1-2">1-2 DAYS/WEEK</option>
            <option value="2-3">2-3 DAYS/WEEK</option>
            <option value="3-4">3-4 DAYS/WEEK</option>
            <option value="4-5">4-5 DAYS/WEEK</option>
            <option value="5-6">5-6 DAYS/WEEK</option>
            <option value="6+">6+ DAYS/WEEK</option>
            <option value="other">OTHER</option>
          </select>
        </div>

        <div className="col-span-12">
          <label className="block text-xs font-bold mb-1 tracking-wider text-[#000080]">
            [PREFERRED_MEETING_TIME]
          </label>
          <select
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full p-3 bg-white font-mono text-sm appearance-none cursor-pointer"
            style={{
              border: '2px inset #808080',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23000080' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center'
            }}
          >
            <option value="">SELECT_TIME</option>
            <option value="morning">MORNING (06:00-12:00)</option>
            <option value="afternoon">AFTERNOON (12:00-17:00)</option>
            <option value="evening">EVENING (17:00-21:00)</option>
            <option value="flexible">FLEXIBLE</option>
          </select>
        </div>

        <div className="col-span-12">
          <label className="block text-xs font-bold mb-1 tracking-wider text-[#000080]">
            [YOUR_GOALS] *
          </label>
          <textarea
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-3 resize-none bg-white font-mono text-sm leading-relaxed"
            style={{ border: '2px inset #808080' }}
            placeholder="DESCRIBE_YOUR_FITNESS_GOALS..."
          />
        </div>

        <div className="col-span-12">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-bold py-4 px-6 text-sm tracking-wider text-white transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ 
              background: 'linear-gradient(to bottom, #3a70b8, #2a5a94)',
              border: '3px outset #2e5f9e',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
            onMouseDown={(e) => {
              if (!isSubmitting) e.currentTarget.style.border = '3px inset #2e5f9e';
            }}
            onMouseUp={(e) => {
              if (!isSubmitting) e.currentTarget.style.border = '3px outset #2e5f9e';
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) e.currentTarget.style.border = '3px outset #2e5f9e';
            }}
          >
            {isSubmitting ? '⌛ PROCESSING...' : '→ SUBMIT_CONSULTATION_REQUEST'}
          </button>
        </div>

        <div className="col-span-12">
          <p className="text-xs text-center pt-3 font-bold text-[#cc0000]" 
            style={{ borderTop: '1px dotted #808080' }}>
            * REQUIRED_FIELDS
          </p>
        </div>
      </div>
    </form>
  );
}