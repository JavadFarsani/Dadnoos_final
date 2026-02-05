'use client'

import { useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"

import { AnimatePresence, motion } from "framer-motion"
import { ReceiptText, Loader2 } from "lucide-react"

import BackButton from "@/app/_ui/back-button"
import { cn } from "@/app/_lib/utils"
import { apiService, PaymentRecord } from "@/app/_lib/services/api"

import * as texts from '@/app/_text/common.js'

const PAYMENT_STATUS_MAP: Record<
  string,
  { label: string; className: string }
> = {
  SUCCEEDED: { label: 'موفق', className: 'bg-emerald-100 text-emerald-700' },
  PENDING: { label: 'در انتظار', className: 'bg-amber-100 text-amber-700' },
  FAILED: { label: 'ناموفق', className: 'bg-red-100 text-red-700' },
  REFUNDED: { label: 'بازپرداخت شده', className: 'bg-neutral-200 text-neutral-700' },
}

const formatHistoryDate = (value: string) => {
  try {
    return new Date(value).toLocaleString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return value
  }
}

const formatAmount = (value: number) =>
  `${new Intl.NumberFormat('fa-IR').format(Math.max(0, Math.round(value)))} تومان`

export default function PaymentsPage() {

  const [payments, setPayments] = useState<PaymentRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setLoading(true)
        const res = await apiService.getPayments()
        setPayments(res.payments ?? [])
        setError(null)
      } catch (e) {
        setError('دریافت تاریخچه تراکنش‌ها ناموفق بود.')
      } finally {
        setLoading(false)
      }
    }

    loadPayments()
  }, [])

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="payments-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .25 }}
          className="flex flex-col items-center px-4 pb-12 pt-4 md:pt-8 mt-safe md:min-h-screen"
        >
          {/* Back */}
          <div className="absolute top-2 left-2 md:top-8 md:left-10">
            <BackButton />
          </div>

          {/* Logo */}
          <div className="absolute size-12 md:size-16 p-2 top-2.5 right-1 md:top-8 md:right-10">
            <Link href="/" className="w-8 aspect-square">
              <Image
                className="size-full"
                src="/logo.png"
                alt={`${texts.websiteName} logo`}
                width={180}
                height={38}
                priority
              />
            </Link>
          </div>

          <h1 className="text-2xl md:text-6xl font-black mb-5">
            تاریخچه تراکنش‌ها
          </h1>

          {/* Content */}
          <div className="relative w-full max-w-3xl mt-6 md:mt-28">
            <div className="bg-neutral-700/10 dark:bg-neutral-700/50 backdrop-blur-2xl rounded-3xl p-6 space-y-4">

              <div className="flex items-center gap-2 text-neutral-800 dark:text-neutral-100">
                <ReceiptText className="size-5 text-[#9b956d]" />
                <h2 className="text-lg font-bold">لیست پرداخت‌ها</h2>
                {loading && <Loader2 className="size-4 animate-spin text-neutral-500" />}
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              {!loading && !error && payments.length === 0 && (
                <p className="text-sm text-neutral-500">
                  تاکنون تراکنشی ثبت نشده است.
                </p>
              )}

              {!loading && payments.length > 0 && (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {payments.map(payment => {
                    const statusInfo =
                      PAYMENT_STATUS_MAP[payment.status] ||
                      PAYMENT_STATUS_MAP.SUCCEEDED

                    return (
                      <div
                        key={payment.id}
                        className="rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/80 dark:bg-neutral-900/40 p-4 space-y-2"
                      >
                        <div className="flex justify-between text-sm font-semibold">
                          <span>{payment.plan_title ?? 'پلن اختصاصی'}</span>
                          <span>{formatAmount(payment.net_amount)}</span>
                        </div>

                        <div className="flex flex-wrap gap-3 text-[11px] text-neutral-500">
                          <span>{formatHistoryDate(payment.created_at)}</span>

                          {payment.discount_code && (
                            <span className="rounded-full bg-neutral-200/70 px-2 py-0.5">
                              کد تخفیف: {payment.discount_code}
                            </span>
                          )}

                          {payment.upgrade_from_subscription_id && (
                            <span className="rounded-full bg-emerald-100/70 text-emerald-700 px-2 py-0.5">
                              ارتقا پلن
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-[11px]">
                          <span
                            className={cn(
                              'px-3 py-1 rounded-full font-semibold',
                              statusInfo.className
                            )}
                          >
                            {statusInfo.label}
                          </span>

                          <span className="text-neutral-500">
                            مبلغ ناخالص: {formatAmount(payment.gross_amount)}
                            {payment.discount_amount > 0 && (
                              <> • تخفیف: {formatAmount(payment.discount_amount)}</>
                            )}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}