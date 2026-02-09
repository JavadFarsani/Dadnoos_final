'use client'

import { cn } from '@/app/_lib/utils'

import Popup from '@/app/_ui/components/popup'
import { Button } from '@/app/_ui/components/button'
import { Mic, Forward, BrainCircuit, Play } from 'lucide-react'

import { useVoiceSettings } from '@/app/_lib/hooks/useVoiceSettings'


interface VoiceSettingsPanelProps {
  isOpen: boolean
  onClose: any
}

function ToggleRow({
  label,
  description,
  active,
  onToggle,
  disabled,
  icon: Icon,
}: {
  label: string
  description: string
  active: boolean
  disabled: boolean
  onToggle: () => void
  icon: any
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        'w-full flex items-center gap-3 rounded-3xl p-3 text-right disabled:opacity-25 cursor-pointer',
        active
          ? 'bg-black text-white dark:bg-white dark:text-black'
          : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500'
      )}
    >
      <div className={cn(
        'flex items-center justify-center rounded-2xl p-2',
        active ? 'bg-neutral-200/25 dark:bg-black/15' : 'bg-neutral-200 dark:bg-neutral-800'
      )}>
        <Icon className="size-5" />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-sm font-semibold">{label}</span>
        <span
          className={cn(
            "text-[10px] ",
            active
              ? 'text-neutral-400 dark:text-neutral-600'
              : 'text-neutral-600 dark:text-neutral-400'
          )}
        >
          {description}
        </span>
      </div>
      <div
        dir='ltr'
        className={cn(
          'w-11 h-7 rounded-full flex items-center px-0.5',
          active
            ? 'bg-white text-black dark:bg-black dark:text-white border-transparent'
            : 'bg-neutral-200 dark:bg-neutral-800'
        )}
      >
        <div
          className={cn(
            'size-5 rounded-full transition-transform duration-200',
            active ? 'translate-x-4.5 bg-black dark:bg-white' : 'translate-x-0.5 bg-neutral-500 dark:bg-neutral-500'
          )}
        />
      </div>
    </button>
  )
}

export function VoiceSettingsPanel({ isOpen, onClose }: VoiceSettingsPanelProps) {
  const {
    voiceEnabled,
    autoSendVoice,
    autoPlayResponses,
    voiceLiveEnabled,
    toggleVoiceEnabled,
    toggleAutoSendVoice,
    toggleAutoPlayResponses,
    toggleVoiceLiveEnabled,
  } = useVoiceSettings()

  return (
    <Popup visible={isOpen} onClose={onClose}>
      <div className="space-y-4" dir="rtl">
        <div className='p-2'>
          <h2 className="text-lg font-semibold">تنظیمات گفتگوی صوتی</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-300 mt-1">
            تعیین کنید چطور صدایتان ضبط شود و پاسخ‌ها چگونه پخش شوند.
          </p>
        </div>

        <div className="space-y-3">
          <ToggleRow
            label="فعال‌سازی حالت صوتی"
            description="امکان ضبط پیام و دریافت پاسخ صوتی"
            active={voiceEnabled}
            disabled={false}
            onToggle={toggleVoiceEnabled}
            icon={Mic}
          />

          <ToggleRow
            label="ارسال خودکار بعد از تبدیل"
            description="پس از تبدیل گفتار به متن، پیام بدون تأیید ارسال شود"
            active={voiceEnabled && autoSendVoice}
            disabled={!voiceEnabled}
            onToggle={toggleAutoSendVoice}
            icon={Forward}
          />

          <ToggleRow
            label="پخش خودکار پاسخ‌ها"
            description="پاسخ مدل به صورت صوتی پخش شود"
            active={voiceEnabled && autoPlayResponses}
            disabled={!voiceEnabled}
            onToggle={toggleAutoPlayResponses}
            icon={Play}
          />

          <ToggleRow
            label="مکالمه‌ی زنده (بتا)"
            description="مکالمه‌ی زنده مثل تماس تلفنی"
            active={voiceEnabled && voiceLiveEnabled}
            disabled={!voiceEnabled}
            onToggle={toggleVoiceLiveEnabled}
            icon={BrainCircuit}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>
            بستن
          </Button>
        </div>
      </div>
    </Popup>
  )
}
