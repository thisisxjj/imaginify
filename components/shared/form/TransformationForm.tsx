'use client'

import { z } from 'zod'
import { useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomField from './CustomField'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  aspectRatioOptions,
  defaultValues,
  transformationTypes,
} from '@/constant'
import { AspectRatioKey, debounce, deepMergeObjects } from '@/lib/utils'

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
})

const TransformationForm = ({
  action,
  data = null,
  type,
  userId,
  creditBalance,
  config = null,
}: TransformationFormProps) => {
  const [isPending, startTransition] = useTransition()
  const transformationType = transformationTypes[type]
  const [image, setImage] = useState(data)
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTransforming, setIsTransforming] = useState(false)
  const [transformationConfig, setTransformationConfig] = useState(config)

  const initialValues =
    data && action === 'Update'
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const onSelectFieldHandler = (
    value: AspectRatioKey,
    onChangeField: (value: string) => void
  ) => {
    const imageSize = aspectRatioOptions[value]

    setImage((preState: any) => ({
      ...preState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }))

    setNewTransformation(transformationType.config)

    return onChangeField(value)
  }

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChange: (value: string) => void
  ) => {
    debounce(() => {
      setNewTransformation((preState: any) => ({
        ...preState,
        [type]: {
          ...preState?.[type],
          [fieldName === 'prompt' ? 'prompt' : 'to']: value,
        },
      }))

      return onChange(value)
    }, 1000)
  }

  // TODO: return to update credits
  const onTransformHandler = () => {
    setIsTransforming(true)

    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    )

    setNewTransformation(null)

    startTransition(() => {
      // await updateCredits(userId, creditFee)
      setIsTransforming(false)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
        />
        {type === 'fill' && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => (
              <Select
                onValueChange={(value: AspectRatioKey) =>
                  onSelectFieldHandler(value, field.onChange)
                }
              >
                <SelectTrigger className="select-field">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem className="select-item" key={key} value={key}>
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}
        {(type === 'remove' || type === 'recolor') && (
          <div className="prompt-field">
            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                type === 'remove' ? 'Object to remove' : 'Object to recolor'
              }
              className="w-full"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="input-field"
                  onChange={(e) =>
                    onInputChangeHandler(
                      'prompt',
                      e.target.value,
                      type,
                      field.onChange
                    )
                  }
                />
              )}
            />
            {type === 'recolor' && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    className="input-field"
                    value={field.value}
                    onChange={(e) =>
                      onInputChangeHandler(
                        'color',
                        e.target.value,
                        type,
                        field.onChange
                      )
                    }
                  />
                )}
              />
            )}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            className="submit-button capitalize"
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? 'Transforming...' : 'Apply transformation'}
          </Button>
          <Button type="submit" className="submit-button capitalize">
            {isSubmitting ? 'Submitting...' : 'Save Image'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransformationForm
