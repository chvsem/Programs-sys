import { useState } from 'react';
import { PackageForm } from './components/PackageForm';
import { MacWindow } from './components/MacWindow';

export default function App() {
  return (
    <div className="min-h-screen bg-[#c0c0c0] p-4 md:p-8 font-mono">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #a0a0a0 1px, transparent 1px),
            linear-gradient(to bottom, #a0a0a0 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header - Grid Style */}
        <div className="mb-4 bg-white" style={{ border: '4px ridge #808080' }}>
          <div className="px-4 py-2 flex items-center gap-2" 
            style={{ 
              background: 'linear-gradient(to bottom, #1e5aa8, #13478a)',
              borderBottom: '2px solid #0d3461'
            }}>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" style={{ border: '1px solid #d04b42' }}></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" style={{ border: '1px solid #d9a020' }}></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" style={{ border: '1px solid #1fa831' }}></div>
            </div>
            <span className="text-xs text-white font-bold">SYSTEM</span>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-8">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 leading-none"
                  style={{ 
                    color: '#000080',
                    textShadow: '2px 2px 0px #c0c0c0'
                  }}>
                  PROGRAMS.SYS
                </h1>
                
                {/* Added system info below title */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="px-2 py-1 bg-[#000080] text-white font-bold">FILE_INFO</div>
                    <div className="flex-1 h-px bg-[#808080]"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-[#e0e0e0]" style={{ border: '1px inset #808080' }}>
                      <span className="text-[#808080]">SIZE:</span> <span className="font-bold">2048KB</span>
                    </div>
                    <div className="p-2 bg-[#e0e0e0]" style={{ border: '1px inset #808080' }}>
                      <span className="text-[#808080]">TYPE:</span> <span className="font-bold">SYSTEM</span>
                    </div>
                    <div className="p-2 bg-[#e0e0e0]" style={{ border: '1px inset #808080' }}>
                      <span className="text-[#808080]">MODIFIED:</span> <span className="font-bold">01/16/26</span>
                    </div>
                    <div className="p-2 bg-[#e0e0e0]" style={{ border: '1px inset #808080' }}>
                      <span className="text-[#808080]">ATTR:</span> <span className="font-bold text-[#cc0000]">R/W</span>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="text-[#000080] font-bold">LOADING_CONSULTATION_MODULE</span>
                      <span className="text-[#00cc00]">[OK]</span>
                    </div>
                    <div className="h-4 bg-white" style={{ border: '2px inset #808080' }}>
                      <div 
                        className="h-full"
                        style={{ 
                          width: '100%',
                          background: 'repeating-linear-gradient(90deg, #2e5f9e 0px, #2e5f9e 10px, #1e4a7a 10px, #1e4a7a 20px)',
                          border: '1px solid #000080'
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 pl-4" style={{ borderLeft: '2px groove #808080' }}>
                <div className="text-xs space-y-1 p-2 bg-[#ffffcc]" style={{ border: '1px solid #808080' }}>
                  <div><span className="text-[#cc0000]">●</span> VERSION: 2.0</div>
                  <div><span className="text-[#cc0000]">●</span> TYPE: CONSULTATION</div>
                  <div><span className="text-[#00cc00]">●</span> STATUS: ACTIVE</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Main Content Grid */}
        <div className="bg-white" style={{ border: '4px ridge #808080' }}>
          <div className="grid md:grid-cols-12 divide-y md:divide-y-0 divide-[#808080]">
            {/* Left Column - Info */}
            <div className="md:col-span-5 p-6 space-y-4" style={{ borderRight: '2px groove #808080' }}>
              <div style={{ border: '2px solid #000080' }}>
                <div className="px-3 py-2 text-sm font-bold text-white"
                  style={{ 
                    background: 'linear-gradient(to bottom, #2e5f9e, #1e4a7a)',
                    borderBottom: '2px solid #000080'
                  }}>
                  [PACKAGE_DETAILS]
                </div>
                <div className="p-4 space-y-3 text-sm" style={{ background: '#f0f0f0' }}>
                  <div className="grid grid-cols-12 gap-2 items-start">
                    <div className="col-span-2 text-right font-bold text-[#cc0000]">01.</div>
                    <div className="col-span-10 pl-2" style={{ borderLeft: '3px solid #2e5f9e' }}>
                      Personalized training program tailored to your schedule
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-start">
                    <div className="col-span-2 text-right font-bold text-[#cc0000]">02.</div>
                    <div className="col-span-10 pl-2" style={{ borderLeft: '3px solid #2e5f9e' }}>
                      One-on-one consultation to assess your goals
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-start">
                    <div className="col-span-2 text-right font-bold text-[#cc0000]">03.</div>
                    <div className="col-span-10 pl-2" style={{ borderLeft: '3px solid #2e5f9e' }}>
                      Flexible workout plans that adapt to your lifestyle
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-start">
                    <div className="col-span-2 text-right font-bold text-[#cc0000]">04.</div>
                    <div className="col-span-10 pl-2" style={{ borderLeft: '3px solid #2e5f9e' }}>
                      Ongoing support and program adjustments
                    </div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 items-start">
                    <div className="col-span-2 text-right font-bold text-[#cc0000]">05.</div>
                    <div className="col-span-10 pl-2" style={{ borderLeft: '3px solid #2e5f9e' }}>
                      Nutrition guidance integrated with training
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ border: '2px outset #808080' }}>
                <div className="px-3 py-2 text-sm font-bold"
                  style={{ 
                    background: 'linear-gradient(to bottom, #e0e0e0, #b0b0b0)',
                    borderBottom: '2px groove #808080'
                  }}>
                  [PROCESS_FLOW]
                </div>
                <div className="p-4 space-y-0 text-sm bg-[#d4d0c8]">
                  <div className="pb-3 mb-3" style={{ borderBottom: '1px dashed #808080' }}>
                    <div className="font-bold mb-1 text-[#000080]">STEP_01 → SUBMIT_REQUEST</div>
                    <div className="text-xs pl-4">
                      Fill out the form with your details
                    </div>
                  </div>
                  <div className="pb-3 mb-3" style={{ borderBottom: '1px dashed #808080' }}>
                    <div className="font-bold mb-1 text-[#000080]">STEP_02 → SCHEDULE_MEETING</div>
                    <div className="text-xs pl-4">
                      We'll contact you to arrange consultation
                    </div>
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-[#000080]">STEP_03 → GET_YOUR_PROGRAM</div>
                    <div className="text-xs pl-4">
                      Receive a custom plan, set up a meeting and get started
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#ffffcc]" style={{ border: '2px solid #cc9900' }}>
                <div className="text-xs font-bold mb-2 pb-2 text-[#cc0000]" style={{ borderBottom: '1px dotted #cc9900' }}>
                  [!] NOTICE:
                </div>
                <p className="text-xs leading-relaxed">
                  All programs are built from scratch based on your individual needs, experience level, available equipment, and time constraints.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="md:col-span-7 p-6 bg-[#e8e8e8]">
              <div className="mb-4 bg-white" style={{ border: '2px solid #000080' }}>
                <div className="px-3 py-2 text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(to bottom, #2e5f9e, #1e4a7a)' }}>
                  [CONSULTATION_REQUEST_FORM]
                </div>
              </div>
              <PackageForm />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4">
          <div className="px-6 py-3 text-center text-white"
            style={{ 
              background: 'linear-gradient(to bottom, #2e5f9e, #1e4a7a)',
              border: '4px ridge #808080'
            }}>
            <p className="text-xs font-bold tracking-wider">
              © 2026 PROGRAMS.SYS // ALL_RIGHTS_RESERVED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
