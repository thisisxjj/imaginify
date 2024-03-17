import React from 'react'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Header from '@/components/shared/page-header/Header'
import TransformationForm from '@/components/shared/form/TransformationForm'
import { transformationTypes } from '@/constant'
import { getUserById } from '@/lib/actions/user.action'

const AddPTransformationTypePage = async ({
  params: { type },
}: SearchParamProps) => {
  const { userId } = auth()
  const transformation = transformationTypes[type]

  if (!userId) redirect('/sign-in')

  const user = await getUserById(userId)

  if (!user) redirect('/sign-in')

  return (
    <>
      <Header title={transformation.title} subTitle={transformation.subTitle} />
      <section className="mt-10">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={type}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddPTransformationTypePage
