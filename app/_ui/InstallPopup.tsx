import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import AcceptButton from "@/app/_ui/components/acceptButton"

type InstallPopupProps = {
  visible: boolean
  onInstall: () => void
  onSkip: () => void
}

export default function InstallPopup({
  visible,
  onInstall,
  onSkip,
}: InstallPopupProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Card */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 120 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="
              relative z-50
              bg-white dark:bg-[#303030]
              rounded-t-4xl
              max-w-lg w-full
              px-8 pt-12 pb-32
              text-center
              shadow-2xl
            "
          >
            <Image
              src="/pwa.png"
              width={72}
              height={72}
              alt="Install App"
              className="mx-auto mb-6 pointer-events-none"
            />

            <h3 className="text-xl font-bold mb-4">
              نصب دادنوس
            </h3>

            <p className="text-xs/relaxed text-neutral-600 dark:text-neutral-300 mb-8">
              با نصب دادنوس، دسترسی سریع‌تر، تجربه روان‌تر و عملکرد بهتر خواهید داشت.
            </p>

            <div className="flex flex-col gap-3 items-center">
              <AcceptButton
                message="نصب برنامه"
                onAccept={onInstall}
              />

              <button
                onClick={onSkip}
                className="text-xs text-neutral-400 hover:text-neutral-300 transition"
              >
                فعلاً نه
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}