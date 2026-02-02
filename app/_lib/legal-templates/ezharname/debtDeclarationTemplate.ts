import { LegalTemplate } from '@/app/_ui/chat/legalTemplateForm'
import * as z from 'zod'

export const debtDeclarationTemplate: LegalTemplate = {
  title: 'اظهارنامه مطالبه وجه',
  description: 'برای مطالبه وجه و اعلام رسمی به طرف مقابل',
  fields: [
    { name: 'senderName', label: 'نام اظهارکننده', placeholder: 'مثلا: علی رضایی', type: 'text', validation: z.string().min(3, 'نام را وارد کنید') },
    { name: 'recipientName', label: 'نام مخاطب', placeholder: 'مثلا: شرکت الف', type: 'text', validation: z.string().min(3, 'نام مخاطب را وارد کنید') },
    { name: 'amount', label: 'مبلغ مورد مطالبه', placeholder: 'مثلا: ۵,۰۰۰,۰۰۰ تومان', type: 'text', validation: z.string().min(1, 'مبلغ را وارد کنید') },
    { name: 'dueDate', label: 'مهلت پرداخت', placeholder: 'مثلا: ۱۴۰۵/۰۲/۱۵', type: 'text', validation: z.string().min(3, 'مهلت پرداخت را وارد کنید') },
    { name: 'reason', label: 'دلیل مطالبه', placeholder: 'مثلا: عدم پرداخت صورت‌حساب شماره ...', type: 'textarea', validation: z.string().min(10, 'دلیل را وارد کنید') },
    { name: 'additionalNotes', label: 'یادداشت‌های تکمیلی', placeholder: 'سایر توضیحات', type: 'textarea', validation: z.string().optional() },
  ]
}
