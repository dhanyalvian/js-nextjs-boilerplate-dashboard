//- src/components/core/page/form.tsx

const PageForm = ({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-2xl font-semibold">{title}</div>
        <div className="text-muted-foreground text-sm font-normal">
          {description}
        </div>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  )
}

export {
  PageForm,
}
