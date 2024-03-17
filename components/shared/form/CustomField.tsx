import React from 'react'
import { z } from 'zod'
import { Control, ControllerRenderProps } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form'

import { formSchema } from './TransformationForm'

type CustomFieldProps = {
  control: Control<z.infer<typeof formSchema>> | undefined
  render: (props: { field: CustomFieldType }) => React.ReactNode
  name: keyof z.infer<typeof formSchema>
  formLabel?: string
  className?: string
}

type CustomFieldType = ControllerRenderProps<
  {
    title: string
    publicId: string
    aspectRatio?: string | undefined
    color?: string | undefined
    prompt?: string | undefined
  },
  'title' | 'aspectRatio' | 'color' | 'prompt' | 'publicId'
>

const CustomField = ({
  control,
  render,
  name,
  formLabel,
  className,
}: CustomFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{formLabel}</FormLabel>
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default CustomField
