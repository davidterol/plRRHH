import type {
  CustomComponent,
  ServerSideEditViewProps,
  // EntityDescriptionComponent,
} from "payload"
import { SetStepNav } from "@payloadcms/ui"
import { notFound, redirect } from "next/navigation"

export const CustomTab: React.FC<ServerSideEditViewProps> = async (props) => {
  const { initPageResult } = props
  if (!initPageResult) {
    notFound()
  }

  const {
    permissions: { canAccessAdmin },
    docID,
    req: { payload },
  } = initPageResult

  const user = await payload.findByID({
    collection: "users",
    id: docID as string,
  })

  return (
    <>
      <SetStepNav
        nav={[
          {
            label: "Users",
          },
          {
            label: user ? user.email : "No User",
          },
          {
            label: "Custom Default Tab manuel",
          },
        ]}
      />
      <div
        style={{
          marginTop: "calc(var(--base) * 2)",
          paddingLeft: "var(--gutter-h)",
          paddingRight: "var(--gutter-h)",
        }}
      >
        <h1>Custom Default View</h1>
        <p>
          This custom Default view was added through one of the following
          Payload configs:
        </p>
        <ul>
          <li>
            <code>components.views.Edit.Default</code>
            <p>
              {
                "This allows you to override only the default edit view specifically, but "
              }
              <b>
                <em>not</em>
              </b>
              {
                " any nested views like versions, etc. The document header will render above this component."
              }
            </p>
          </li>
          <li>
            <code>components.views.Edit.Default.Component</code>
            <p>
              This is the most granular override, allowing you to override only
              the Default component, or any of its other properties like path
              and label.
            </p>
          </li>
        </ul>
      </div>

      {JSON.stringify(Object.keys(props))}
    </>
  )
}
//
// export const TabPill = async () => {
//   return <div className="bg-red-400 px-12 text-red-600">TabPilll</div>
// }
//
// export const EditComponent: EntityDescriptionComponent = async (props) => {
//   // console.log(Object.keys(props))
//   return (
//     <>
//       <div>Description Component</div>
//     </>
//   )
// }

export const MasqueradeField: React.FC<CustomComponent> = () => null
