import { LegalTemplate } from '@/app/_ui/chat/legalTemplateForm'
import * as z from 'zod'

export const generalDeclarationTemplate: LegalTemplate = {
  title: 'اظهارنامه عمومی',
  description: 'برای سایر امور حقوقی که نیاز به اظهارنامه دارد',
  fields: [
    { name: 'senderName', label: 'نام اظهارکننده', placeholder: 'مثلا: علی رضایی', type: 'text', validation: z.string().min(3, 'نام را وارد کنید') },
    { name: 'recipientName', label: 'نام مخاطب', placeholder: 'مثلا: شرکت الف', type: 'text', validation: z.string().min(3, 'نام مخاطب را وارد کنید') },
    { name: 'subject', label: 'موضوع اظهارنامه', placeholder: 'مثلا: اطلاع‌رسانی یا هشدار', type: 'text', validation: z.string().min(3, 'موضوع را وارد کنید') },
    { name: 'description', label: 'توضیحات', placeholder: 'متن اظهارنامه', type: 'textarea', validation: z.string().min(10, 'توضیحات را وارد کنید') },
    { name: 'additionalNotes', label: 'یادداشت‌های تکمیلی', placeholder: 'سایر توضیحات', type: 'textarea', validation: z.string().optional() },
  ]
}
