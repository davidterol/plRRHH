import type { AdminViewProps } from 'payload'
import React from 'react'
import { DefaultTemplate, MinimalTemplate } from "@payloadcms/next/templates"

// import Collec

export const CustomPage: React.FC<AdminViewProps> = () => {
  return (
    <DefaultTemplate>
    <div>
      <h1>RRHH VIEW</h1>
      <button>
        <a href='../admin/collections/employees'>
          Test
        </a>
      </button>
      <br />
      <p>This is a completely standalone view.</p>
    </div>
    </DefaultTemplate>
  )
}


// import React, { Fragment } from 'react'

// import { AdminViewComponent } from 'payload'

// const CustomPage: AdminViewComponent => {
//   return (
//     <Fragment>
//       <div
//         style={{
//           marginTop: 'calc(var(--base) * 2)',
//           paddingLeft: 'var(--gutter-h)',
//           paddingRight: 'var(--gutter-h)',
//         }}
//       >
//         <h1>Custom Dashboard View</h1>
//         <p>This custom view was added through the Payload config:</p>
//         <ul>
//           <li>
//             <code>components.views.Dashboard</code>
//           </li>
//         </ul>
//       </div>
//     </Fragment>
//   )
// }

// export default CustomPage
